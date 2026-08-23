const fs = require('fs')
const path = require('path')
const exePath = path.resolve(__dirname, '..', 'release2', 'win-unpacked', 'ScientificCalculator.exe')
const exe = fs.readFileSync(exePath)

// 搜索 PE 资源段里的 Group Icon 头：0x00 0x00 0x01 0x00
let found = false
const results = []
for (let i = 0; i < exe.length - 4; i++) {
  if (exe[i] === 0 && exe[i+1] === 0 && exe[i+2] === 1 && exe[i+3] === 0) {
    const count = exe.readUInt16LE(i+4)
    if (count >= 2 && count <= 20) {
      const sizes = []
      let ok = true
      for (let k = 0; k < count; k++) {
        const eo = i + 6 + k * 16
        if (eo + 16 > exe.length) { ok = false; break }
        const w = exe[eo] || 256, h = exe[eo+1] || 256
        sizes.push(w + 'x' + h)
        const bytesInRes = exe.readUInt32LE(eo + 8)
        if (bytesInRes > 20 * 1024 * 1024) { ok = false; break }
      }
      if (ok && sizes.length === count) {
        results.push({ count, sizes, offset: i })
        if (count >= 3) found = true
      }
    }
  }
}
if (results.length) {
  console.log('Found', results.length, 'group icon resources:')
  results.slice(0, 3).forEach(r => console.log('  count=' + r.count + '  sizes=[' + r.sizes.join(', ') + ']'))
  if (found) console.log('OK: Multi-size icons (>=3 entries) detected — custom icon IS embedded!')
  else console.log('WARN: Only low-count icons found')
} else {
  console.log('WARN: No icon group found')
}
const pn = 'ScientificCalculator'
const idx = exe.indexOf(pn)
console.log(idx >= 0 ? 'OK: VERSIONINFO contains ' + pn : 'WARN: VERSIONINFO missing productName')
const zipS = fs.statSync(path.resolve(__dirname, '..', 'release2', 'ScientificCalculator-1.0.0-x64.zip')).size
const exeS = fs.statSync(exePath).size
console.log('Zip:', (zipS / 1e6).toFixed(2), 'MB')
console.log('Exe:', (exeS / 1e6).toFixed(2), 'MB')
