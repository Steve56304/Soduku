// Run after `npm run build`: fill sw.js with the list of built files to cache
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const dir = path.join(__dirname, 'build');
const files = [];
(function walk(d) {
    for (const f of fs.readdirSync(d)) {
        const p = path.join(d, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else files.push(path.relative(dir, p).split(path.sep).join('/'));
    }
})(dir);
const list = ['./', ...files.filter(f => f !== 'sw.js' && !f.endsWith('.map') && f !== 'asset-manifest.json').map(f => './' + f)];
const hash = crypto.createHash('sha1').update(list.join()).digest('hex').slice(0, 10);
const swPath = path.join(dir, 'sw.js');
const sw = fs.readFileSync(swPath, 'utf8')
    .replace('__VERSION__', hash)
    .replace('__PRECACHE__', JSON.stringify(list, null, 4));
fs.writeFileSync(swPath, sw);
console.log(`sw.js: ${list.length} files, version ${hash}`);
