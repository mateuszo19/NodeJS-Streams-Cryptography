const {createReadStream, createWriteStream} = require('fs');
const {pipeline} = require('stream').promises;
const {createGunzip} = require('zlib');
const {createDecipher} = require('crypto');
const {promisify} = require('util');
const scrypt = promisify(require('crypto').scrypt);
const ENCRYPTION_SALT = 'sdfgdhd565aq34twergdshtw43q5t4hn7rt6e5w7y4q36tr21T345';



(async () => {

    const [,,openPath,savePath,pswd] = process.argv;

    const key = await scrypt(pswd, ENCRYPTION_SALT, 24);
//Otwarcie pliku -> dekompresja -> odszyfrowanie pliku -> zapisanie pliku
    await pipeline(
        createReadStream(openPath),
        //createDecipher(algorytm którym szydrujemy,klucz)
        createGunzip(),
        createDecipher('aes-192-cbc', key),
        createWriteStream(savePath),
    );
    console.log('Done!')
})();
