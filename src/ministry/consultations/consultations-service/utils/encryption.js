const crypto = require("crypto");

exports.generate_key = () => {
  return crypto.randomBytes(32);
};
exports.encrypt = (key, msg) => {
  const BUFFER_SECRET = Buffer.from(key, "hex");
  const cipher = crypto.createCipheriv("aes-256-ecb", BUFFER_SECRET, "");
  let encoded = cipher.update(msg, "utf8", "hex");
  encoded += cipher.final("hex");

  return encoded;
};
exports.decrypt = (encoded) => {
  const cipher = crypto.createDecipheriv("aes-256-ecb", BUFFER_SECRET, "");
  let decoded = cipher.update(encoded, "hex", "utf8");
  decoded += cipher.final("utf8");

  return decoded;
};
