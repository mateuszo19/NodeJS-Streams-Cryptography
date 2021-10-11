const {createReadStream, createWriteStream} = require('fs');
const {pipeline} = require('stream').promises;
const {createGzip} = require('zlib');
const {createCipher } = require('crypto');
const {promisify} = require('util');
const scrypt = promisify(require('crypto').scrypt);
const ENCRYPTION_SALT = 'sdfgdhd565aq34twergdshtw43q5t4hn7rt6e5w7y4q36tr21T345';



(async () => {

    const [,,openPath,savePath,pswd] = process.argv;
//Tworzymy klucz "mieszając" faktyczny klucz z solą
    const key = await scrypt(pswd, ENCRYPTION_SALT, 24);
//Otwarcie pliku -> zaszyfrowanie pliku -> kompresja -> zapisanie pliku
    await pipeline(
        createReadStream(openPath),
        //createDecipher(algorytm którym deszydrujemy,klucz)
        createCipher('aes-192-cbc', key),
        createGzip(),
        createWriteStream(savePath),
    );
    console.log('Done!')
})();
