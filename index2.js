const {createReadStream, createWriteStream} = require('fs');

const r = createReadStream('ok.png');
const w = createWriteStream('ok2.png');

r.pipe(w);
r.on('end', () => console.log('Ready'));