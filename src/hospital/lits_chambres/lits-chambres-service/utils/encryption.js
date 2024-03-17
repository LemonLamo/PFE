const crypto = require('crypto');
const BUFFER_SECRET = Buffer.from(process.env.ENCRYPTION_SECRET, 'hex');

exports.encrypt = (password) => {
    const cipher = crypto.createCipheriv('aes-256-ecb', BUFFER_SECRET, '')
    let encoded = cipher.update(password, 'utf8', 'hex')
    encoded += cipher.final('hex')

    return encoded;
}
exports.decrypt = (encoded) => {
    const cipher = crypto.createDecipheriv('aes-256-ecb', BUFFER_SECRET, '')
    let decoded = cipher.update(encoded, 'hex', 'utf8')
    decoded += cipher.final('utf8')

    return decoded;
}