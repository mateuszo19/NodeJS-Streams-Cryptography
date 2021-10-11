const {createReadStream, createWriteStream} = require('fs');

const r = createReadStream('ok.png');
const w = createWriteStream('ok2.png');

r.on('data', data => w.write(data));
r.on('end', () => {
    w.close();
    console.log('Ready!');
})