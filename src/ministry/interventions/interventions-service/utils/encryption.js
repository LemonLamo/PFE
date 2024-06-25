const crypto = require('crypto');

exports.generate_key = () => {
  const key = crypto.randomBytes(32);
  return key.toString('base64');
}

exports.encrypt = (key, msg) => {
  const decodedKey = Buffer.from(key, 'base64');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', decodedKey, iv);
  let encrypted = cipher.update(msg, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return `${iv.toString('base64')}:${encrypted}`;
}

exports.decrypt = (key, encoded) => {
  const decodedKey = Buffer.from(key, 'base64');
  const [iv, encrypted] = encoded.split(':').map(part => Buffer.from(part, 'base64'));
  const decipher = crypto.createDecipheriv('aes-256-cbc', decodedKey, iv);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
