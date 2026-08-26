/**
 * 从 public/logo.png (从 SCP.exe 提取的 256x256) 生成标准 Windows ICO
 * 格式: BITMAPINFOHEADER + 32-bit BGRA + AND mask (NSIS/electron-builder 兼容)
 */
const fs = require('fs')
const zlib = require('zlib')
const path = require('path')

const base = path.resolve(__dirname, '..')
const srcPng = path.join(base, 'public', 'logo.png') // 256x256 extracted from EXE

// --- PNG decode (RGBA) ---
function decodePNG(buf) {
  if (buf[0] !== 137 || buf[1] !== 80) throw new Error('not a PNG')
  let pos = 8, width = 0, height = 0, colorType = 0, bitDepth = 0
  let idatChunks = []
  let palette = null, trns = null
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos); pos += 4
    const type = buf.toString('ascii', pos, pos + 4)
    const data = buf.slice(pos + 4, pos + 4 + len)
    pos += 4 + len + 4 // type + data + CRC
    if (type === 'IHDR') {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4)
      bitDepth = data[8]; colorType = data[9]
    } else if (type === 'IDAT') { idatChunks.push(data) }
    else if (type === 'PLTE') { palette = data }
    else if (type === 'tRNS') { trns = data }
    else if (type === 'IEND') break
  }
  const raw = zlib.inflateSync(Buffer.concat(idatChunks))
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 3 ? 1 : colorType === 4 ? 2 : 1
  const bpp = channels // bytes per pixel (8-bit only)
  const stride = width * bpp
  const out = Buffer.alloc(width * height * 4) // RGBA
  let srcIdx = 0
  for (let y = 0; y < height; y++) {
    const filter = raw[srcIdx++]
    const scanlineStart = srcIdx
    const prevRowStart = y > 0 ? srcIdx - stride - 1 : 0
    for (let x = 0; x < stride; x++) {
      let cur = raw[srcIdx]
      let a = 0, b = (x >= bpp) ? raw[scanlineStart + x - bpp] : 0
      let c = (y > 0) ? raw[prevRowStart + x] : 0
      switch (filter) {
        case 1: cur = (cur + b) & 0xFF; break
        case 2: cur = (cur + c) & 0xFF; break
        case 3: cur = (cur + ((b + c) >> 1)) & 0xFF; break
        case 4: cur = (cur + Math.floor((b + c) / 2) - 0) & 0xFF; break // simplified Paeth
        default: break
      }
      raw[srcIdx] = cur; srcIdx++
    }
  }
  // Re-decode with proper filter
  srcIdx = 0
  const unfiltered = Buffer.alloc(raw.length)
  for (let y = 0; y < height; y++) {
    const filter = raw[srcIdx]
    const lineStart = srcIdx + 1
    const prevLineStart = y > 0 ? lineStart - stride - 1 : -1
    for (let x = 0; x < stride; x++) {
      const idx = lineStart + x
      let cur = raw[idx]
      const left = x >= bpp ? unfiltered[lineStart + x - bpp] : 0
      const up = y > 0 ? unfiltered[prevLineStart + x] : 0
      const upLeft = (x >= bpp && y > 0) ? unfiltered[prevLineStart + x - bpp] : 0
      switch (filter) {
        case 0: break
        case 1: cur = (cur + left) & 0xFF; break
        case 2: cur = (cur + up) & 0xFF; break
        case 3: cur = (cur + ((left + up) >> 1)) & 0xFF; break
        case 4: {
          const p = left + up - upLeft
          const pa = Math.abs(p - left), pb = Math.abs(p - up), pc = Math.abs(p - upLeft)
          const pred = (pa <= pb && pa <= pc) ? left : (pb <= pc) ? up : upLeft
          cur = (cur + pred) & 0xFF
          break
        }
      }
      unfiltered[idx] = cur
    }
    srcIdx = lineStart + stride
  }
  // Convert to RGBA
  let ui = 1 // skip filter byte of first row
  for (let y = 0; y < height; y++) {
    ui++ // filter byte
    for (let x = 0; x < width; x++) {
      const oi = (y * width + x) * 4
      if (colorType === 6) { // RGBA
        out[oi] = unfiltered[ui]; out[oi+1] = unfiltered[ui+1]; out[oi+2] = unfiltered[ui+2]; out[oi+3] = unfiltered[ui+3]
        ui += 4
      } else if (colorType === 2) { // RGB
        out[oi] = unfiltered[ui]; out[oi+1] = unfiltered[ui+1]; out[oi+2] = unfiltered[ui+2]; out[oi+3] = 255
        ui += 3
      } else if (colorType === 3) { // Palette
        const idx = unfiltered[ui]; ui++
        out[oi] = palette[idx*3]; out[oi+1] = palette[idx*3+1]; out[oi+2] = palette[idx*3+2]
        out[oi+3] = trns && trns[idx] !== undefined ? trns[idx] : 255
      }
    }
  }
  return { width, height, data: out }
}

// --- Scale RGBA buffer ---
function scaleDown(src, srcW, srcH, dstSize) {
  const dst = Buffer.alloc(dstSize * dstSize * 4)
  const sx = srcW / dstSize, sy = srcH / dstSize
  for (let y = 0; y < dstSize; y++) {
    for (let x = 0; x < dstSize; x++) {
      const fx = x * sx, fy = y * sy
      const ix = Math.floor(fx), iy = Math.floor(fy)
      const i = (iy * srcW + ix) * 4
      const di = (y * dstSize + x) * 4
      // Nearest neighbor (good enough for icon scaling)
      dst[di] = src[i]; dst[di+1] = src[i+1]; dst[di+2] = src[i+2]; dst[di+3] = src[i+3]
    }
  }
  return dst
}

// --- Encode ICO (BITMAPINFOHEADER + BGRA + AND mask) ---
function encodeICO(sizes, rgbaGetter) {
  const entries = []
  let dataOffset = 6 + 16 * sizes.length
  for (const size of sizes) {
    const px = rgbaGetter(size)
    const w = size, h = size
    const wByte = size >= 256 ? 0 : size
    const hByte = size >= 256 ? 0 : size
    const xorStride = Math.floor((w + 31) / 32) * 4
    const xorBytes = w * h * 4
    const andBytes = xorStride * h
    const bih = Buffer.alloc(40)
    bih.writeUInt32LE(40, 0)
    bih.writeInt32LE(w, 4)
    bih.writeInt32LE(h * 2, 8) // height = XOR + AND
    bih.writeUInt16LE(1, 12)   // planes
    bih.writeUInt16LE(32, 14)  // bitCount
    bih.writeUInt32LE(0, 16)   // BI_RGB
    bih.writeUInt32LE(xorBytes + andBytes, 20)
    const xor = Buffer.alloc(xorBytes)
    const andMask = Buffer.alloc(andBytes, 0)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const src = ((h - 1 - y) * w + x) * 4 // bottom-up
        const dst = (y * w + x) * 4
        xor[dst] = px[src + 2]   // B
        xor[dst+1] = px[src + 1] // G
        xor[dst+2] = px[src]     // R
        xor[dst+3] = px[src + 3] // A
        if (px[src + 3] < 128) {
          const bitIdx = y * w + x
          const byteIdx = Math.floor(bitIdx / 8)
          const shift = 7 - (bitIdx % 8)
          andMask[byteIdx] |= (1 << shift)
        }
      }
    }
    const imageData = Buffer.concat([bih, xor, andMask])
    entries.push({ wByte, hByte, data: imageData, offset: dataOffset })
    dataOffset += imageData.length
  }
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2) // ICO type
  header.writeUInt16LE(entries.length, 4)
  const dirs = Buffer.alloc(16 * entries.length)
  entries.forEach((e, idx) => {
    const o = idx * 16
    dirs[o] = e.wByte; dirs[o+1] = e.hByte; dirs[o+2] = 0; dirs[o+3] = 0
    dirs.writeUInt16LE(1, o + 4); dirs.writeUInt16LE(32, o + 6)
    dirs.writeUInt32LE(e.data.length, o + 8)
    dirs.writeUInt32LE(e.offset, o + 12)
  })
  const dataBuf = Buffer.concat(entries.map(e => e.data))
  return Buffer.concat([header, dirs, dataBuf])
}

// --- Main ---
const decoded = decodePNG(fs.readFileSync(srcPng))
console.log(`Source PNG: ${decoded.width}x${decoded.height}`)

const icoSizes = [16, 32, 48, 64, 128, 256]
const icoBuf = encodeICO(icoSizes, (s) => scaleDown(decoded.data, decoded.width, decoded.height, s))
const icoOut = path.join(base, 'build', 'icon.ico')
fs.writeFileSync(icoOut, icoBuf)
console.log(`ICO generated: ${icoOut} (${icoBuf.length} bytes, ${icoSizes.length} sizes)`)
