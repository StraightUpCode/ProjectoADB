const crypto = require('crypto')
const algoritmo = 'aes-192-cbc'
const salt = 'projecto'
const password = 'aylmao'

const key = crypto.scryptSync(password, salt, 24)
const iv = Buffer.alloc(16, 0)
const getCipher = () => crypto.createCipheriv(algoritmo, key, iv)
const getDecipher = () => crypto.createDecipheriv(algoritmo, key, iv)

const encriptar = (password) => {
    const cipher = getCipher()
    let encrypt = cipher.update(password, 'utf8', 'hex')
    encrypt += cipher.final('hex')
    return encrypt
}

const desencriptar = (encryptedPassword) => {
    const decipher = getDecipher()
    let decrypt = decipher.update(encryptedPassword, 'hex', 'utf8')
    decrypt += decipher.final('utf8')
    return decrypt
}

module.exports = {
    encriptar, 
    desencriptar
}