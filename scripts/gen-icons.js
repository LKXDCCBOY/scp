/**
 * 生成 icon.png (256x256 RGBA) — 不依赖任何第三方库
 * 科学计算器品牌色渐变图标
 */
const fs = require('fs')
const zlib = require('zlib')
const path = require('path')

const SIZE = 512
const outPath = path.resolve(__dirname, '..', 'public', 'icon.png')
const outPath256 = path.resolve(__dirname, '..', 'build', 'icon.png')
fs.mkdirSync(path.dirname(outPath256), { recursive: true })

function makePixels(w, h) {
  const buf = Buffer.alloc(w * h * 4)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      // 对角渐变背景：深蓝 #0a0a0f -> 紫蓝 #1a1a2e
      const t = (x + y) / (w + h)
      const r0 = 10, g0 = 10, b0 = 15
      const r1 = 26, g1 = 26, b1 = 46
      let r = Math.round(r0 + (r1 - r0) * t)
      let g = Math.round(g0 + (g1 - g0) * t)
      let b = Math.round(b0 + (b1 - b0) * t)
      // 左上光晕 (蓝)
      const d1 = Math.hypot(x - w * 0.27, y - h * 0.25) / w
      const g1v = Math.max(0, 1 - d1 * 3.2)
      r += Math.round(79 * g1v * 0.55)
      g += Math.round(140 * g1v * 0.55)
      b += Math.round(255 * g1v * 0.55)
      // 右下光晕 (紫)
      const d2 = Math.hypot(x - w * 0.74, y - h * 0.78) / w
      const g2v = Math.max(0, 1 - d2 * 3.0)
      r += Math.round(124 * g2v * 0.55)
      g += Math.round(92 * g2v * 0.55)
      b += Math.round(255 * g2v * 0.55)
      // 圆角遮罩 (radius 96/512)
      const rad = 0.1875 * w
      let alpha = 255
      const rx = x < rad ? rad : x > w - rad - 1 ? w - rad - 1 : x
      const ry = y < rad ? rad : y > h - rad - 1 ? h - rad - 1 : y
      const dd = Math.hypot(x - rx, y - ry)
      if (dd > rad) alpha = 0
      else if (dd > rad - 2) alpha = Math.round(255 * (1 - (dd - (rad - 2)) / 2))
      // 中央矩形：模拟计算器屏幕
      const scrX0 = w * 0.16, scrY0 = h * 0.12, scrX1 = w * 0.84, scrY1 = h * 0.88
      if (x >= scrX0 && x < scrX1 && y >= scrY0 && y < scrY1 && alpha) {
        r = Math.min(255, Math.round(r * 0.55 + 20 * 0.45))
        g = Math.min(255, Math.round(g * 0.55 + 20 * 0.45))
        b = Math.min(255, Math.round(b * 0.55 + 30 * 0.45))
      }
      // 顶部屏幕条
      const sY0 = h * 0.18, sY1 = h * 0.35, sX0 = w * 0.21, sX1 = w * 0.79
      if (x >= sX0 && x < sX1 && y >= sY0 && y < sY1 && alpha) {
        r = Math.round(r * 0.6); g = Math.round(g * 0.6); b = Math.round(b * 0.6)
      }
      // 右上角 "831.76" 文字区 - 用白色像素点模拟显示 (简单点阵)
      const dispTextPixels = []
      // 装饰点：白色小方块做数字 8 3 1 . 7 6
      const col = Math.floor((x - w * 0.42) / (w * 0.032))
      const row = Math.floor((y - h * 0.22) / (h * 0.032))
      const digitMask = [
        // 8 segments: all 6
        ['a','b','c','d','e','f','g'],
        // 3
        ['a','b','c','d','g'],
        // 1
        ['b','c'],
        // 7
        ['a','b','c'],
        // 6
        ['a','c','d','e','f','g']
      ]
      const segs = new Map([
        ['a',[[1,0],[2,0]]],
        ['b',[[3,1],[3,2]]],
        ['c',[[3,4],[3,5]]],
        ['d',[[1,6],[2,6]]],
        ['e',[[0,4],[0,5]]],
        ['f',[[0,1],[0,2]]],
        ['g',[[1,3],[2,3]]]
      ])
      if (y >= h*0.22 && y < h*0.32 && x >= w*0.42 && x < w*0.8) {
        const digits = [0,1,2,3,4] // 8 3 1 7 6
        const digitWidth = w*0.032*4
        const which = Math.floor((x - w*0.42) / digitWidth)
        const lx = (x - w*0.42 - which*digitWidth) / (w*0.032)
        const ly = (y - h*0.22) / (h*0.016)
        if (digits[which] != null && ly >= 0 && ly < 8 && lx >= 0 && lx < 4) {
          const mask = digitMask[digits[which]]
          let on = false
          for (const s of mask) {
            for (const [sx, sy] of segs.get(s) || []) {
              if (Math.floor(lx)===sx && Math.floor(ly)===sy) on=true
            }
          }
          if (on) { r = 255; g = 255; b = 255 }
        }
        // 小数点
        const dotPos = 2 * digitWidth + digitWidth*0.8
        if (Math.abs(x - (w*0.42 + dotPos)) < w*0.014 && Math.abs(y - (h*0.22 + h*0.08)) < h*0.012) {
          r=255;g=255;b=255
        }
      }
      // 等号蓝色块（底部中央 accent）
      if (x >= w*0.58 && x < w*0.84 && y >= h*0.74 && y < h*0.86 && alpha) {
        r = Math.min(255, r + 80); g = Math.min(255, g + 140); b = 255
      }
      buf[i+0] = Math.min(255, Math.max(0, r))
      buf[i+1] = Math.min(255, Math.max(0, g))
      buf[i+2] = Math.min(255, Math.max(0, b))
      buf[i+3] = alpha
    }
  }
  return buf
}

function crc32(buf) {
  let c, crc = 0 ^ (-1)
  const table = []
  for (let n = 0; n < 256; n++) {
    c = n
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1)
    table[n] = c
  }
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ (-1)) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0)
  const typBuf = Buffer.from(type, 'ascii')
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typBuf, data])), 0)
  return Buffer.concat([len, typBuf, data, crcBuf])
}

function encodePNG(width, height, pixels) {
  const sig = Buffer.from([137,80,78,71,13,10,26,10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width,0)
  ihdr.writeUInt32BE(height,4)
  ihdr[8]=8; ihdr[9]=6; ihdr[10]=0; ihdr[11]=0; ihdr[12]=0
  // filter byte per scanline
  const raw = Buffer.alloc(height * (1 + width * 4))
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0
    pixels.copy(raw, y*(1+width*4)+1, y*width*4, y*width*4 + width*4)
  }
  const idat = zlib.deflateSync(raw, { level: 9 })
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))])
}

function scaleDown(src, srcSize, dstSize) {
  const dst = Buffer.alloc(dstSize*dstSize*4)
  const scale = srcSize / dstSize
  for (let y = 0; y < dstSize; y++) {
    for (let x = 0; x < dstSize; x++) {
      const sx0 = Math.floor(x*scale), sy0 = Math.floor(y*scale)
      const sx1 = Math.min(srcSize-1, Math.floor((x+1)*scale-1))
      const sy1 = Math.min(srcSize-1, Math.floor((y+1)*scale-1))
      let r=0,g=0,b=0,a=0,n=0
      for (let sy=sy0; sy<=sy1; sy++) for (let sx=sx0; sx<=sx1; sx++) {
        const i = (sy*srcSize + sx)*4
        r += src[i]; g += src[i+1]; b += src[i+2]; a += src[i+3]; n++
      }
      const di = (y*dstSize + x)*4
      dst[di]=Math.round(r/n); dst[di+1]=Math.round(g/n); dst[di+2]=Math.round(b/n); dst[di+3]=Math.round(a/n)
    }
  }
  return dst
}

const px512 = makePixels(SIZE, SIZE)
const px256 = scaleDown(px512, SIZE, 256)

fs.writeFileSync(outPath, encodePNG(SIZE, SIZE, px512))
fs.writeFileSync(outPath256, encodePNG(256, 256, px256))
// 同时复制到 android 资源路径（若目录存在）
const androidRes = path.resolve(__dirname, '..', 'android', 'app', 'src', 'main', 'res')
if (fs.existsSync(androidRes)) {
  for (const [folder, size] of [
    ['mipmap-mdpi', 48], ['mipmap-hdpi', 72], ['mipmap-xhdpi', 96],
    ['mipmap-xxhdpi', 144], ['mipmap-xxxhdpi', 192],
    ['drawable-mdpi', 48], ['drawable-hdpi', 72], ['drawable-xhdpi', 96],
    ['drawable-xxhdpi', 144], ['drawable-xxxhdpi', 192]
  ]) {
    const dir = path.join(androidRes, folder)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'ic_launcher.png'), encodePNG(size, size, scaleDown(px512, SIZE, size)))
    fs.writeFileSync(path.join(dir, 'splash.png'), encodePNG(size, size, scaleDown(px512, SIZE, size)))
  }
  // Android 13+ 自适应图标前景
  const v24 = path.join(androidRes, 'mipmap-anydpi-v26')
  fs.mkdirSync(v24, { recursive: true })
  const fg = path.join(androidRes, 'mipmap-anydpi-v26', 'ic_launcher.xml')
  const bg = path.join(androidRes, 'mipmap-anydpi-v26', 'ic_launcher_round.xml')
  const ic = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
  <background android:drawable="@android:color/black"/>
  <foreground android:drawable="@mipmap/ic_launcher"/>
</adaptive-icon>`
  fs.writeFileSync(fg, ic)
  fs.writeFileSync(bg, ic)
}

// --- 生成标准 Windows .ico（多尺寸 16/32/48/64/128/256）---
// 使用 32-bit BGRA + XOR mask + BITMAPINFOHEADER (V5)
function encodeICO(sizes, rgbaGetter) {
  const entries = [] // {size, width, height, data}
  let dataOffset = 6 + 16 * sizes.length // ICONDIR + ICONDIRENTRY x n
  for (const size of sizes) {
    const px = rgbaGetter(size) // RGBA
    // 为 <=256 的尺寸：宽高字节 0 表示 256
    const wByte = size >= 256 ? 0 : size
    const hByte = size >= 256 ? 0 : size
    const w = size, h = size
    const stride = Math.floor((w * 4 + 3) / 4) * 4 // 32-bit 对齐（实际 BGRA 每行 4 字节对齐已满足）
    const xorStride = Math.floor((w + 31) / 32) * 4
    // AND mask 高度 = 2*h （顶部是 XOR 之后再 AND，bottom-up 顺序；但现代系统 32-bit BGRA 用 alpha 决定透明，AND 全 0 即可）
    const dibSize = 40 /*BITMAPINFOHEADER*/ + (w * 4) * (2 * h) /* 颜色表 + XOR mask (DIB uses h*2 with AND mask embedded) */
    // 更正：使用简单方案：32-bit DIB + 真 AND mask（按字节）
    const xorBytes = w * h * 4 // BGRA bottom-up
    const andBytes = xorStride * h // AND mask（1bit 透明）
    const bih = Buffer.alloc(40)
    bih.writeUInt32LE(40, 0)       // biSize
    bih.writeInt32LE(w, 4)          // biWidth
    bih.writeInt32LE(h * 2, 8)      // biHeight = h(XOR) + h(AND)
    bih.writeUInt16LE(1, 12)        // biPlanes
    bih.writeUInt16LE(32, 14)       // biBitCount
    bih.writeUInt32LE(0, 16)        // biCompression = BI_RGB
    bih.writeUInt32LE(xorBytes + andBytes, 20) // biSizeImage
    bih.writeInt32LE(0, 24); bih.writeInt32LE(0, 28)
    bih.writeUInt32LE(0, 32); bih.writeUInt32LE(0, 36)
    const xor = Buffer.alloc(xorBytes)
    const andMask = Buffer.alloc(andBytes, 0)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const src = ((h - 1 - y) * w + x) * 4  // bottom-up
        const dst = (y * w + x) * 4
        xor[dst + 0] = px[src + 2] // B
        xor[dst + 1] = px[src + 1] // G
        xor[dst + 2] = px[src + 0] // R
        xor[dst + 3] = px[src + 3] // A
        if (px[src + 3] < 128) {
          // 设置 AND mask 对应位为 1（透明）
          const bitIdx = y * w + x
          const byteIdx = Math.floor(bitIdx / 8)
          const shift = 7 - (bitIdx % 8)
          andMask[byteIdx] |= (1 << shift)
        }
      }
    }
    const imageData = Buffer.concat([bih, xor, andMask])
    const entry = { wByte, hByte, size, data: imageData, offset: dataOffset }
    entries.push(entry)
    dataOffset += imageData.length
  }
  // ICONDIR
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type=1 (ICO)
  header.writeUInt16LE(entries.length, 4)
  // ICONDIRENTRY × n
  const dirs = Buffer.alloc(16 * entries.length)
  entries.forEach((e, idx) => {
    const o = idx * 16
    dirs[o + 0] = e.wByte
    dirs[o + 1] = e.hByte
    dirs[o + 2] = 0   // colorCount
    dirs[o + 3] = 0   // reserved
    dirs.writeUInt16LE(1, o + 4)
    dirs.writeUInt16LE(32, o + 6)
    dirs.writeUInt32LE(e.data.length, o + 8)
    dirs.writeUInt32LE(e.offset, o + 12)
  })
  const dataBuf = Buffer.concat(entries.map(e => e.data))
  return Buffer.concat([header, dirs, dataBuf])
}

const icoSizes = [16, 32, 48, 64, 128, 256]
const icoBuf = encodeICO(icoSizes, (s) => scaleDown(px512, SIZE, s))
const icoOut = path.resolve(__dirname, '..', 'build', 'icon.ico')
fs.mkdirSync(path.dirname(icoOut), { recursive: true })
fs.writeFileSync(icoOut, icoBuf)

console.log('OK icon generated:')
console.log('  PNG (512):', outPath)
console.log('  PNG (256):', outPath256)
console.log('  ICO  (16/32/48/64/128/256):', icoOut, `(${icoBuf.length} bytes)`)
