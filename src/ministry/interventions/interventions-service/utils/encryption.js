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
exports.decrypt = (key, encoded) => {
  const BUFFER_SECRET = Buffer.from(key, "hex");
  const cipher = crypto.createDecipheriv("aes-256-ecb", BUFFER_SECRET, "");
  let msg = cipher.update(encoded, "hex", "utf8");
  msg += cipher.final("utf8");

  return msg;
};
