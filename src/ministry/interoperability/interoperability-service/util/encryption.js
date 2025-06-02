const {
  scryptSync,
  scrypt,
  randomFill,
  createCipheriv,
  createDecipheriv
} = require('crypto');
require('dotenv').config()


exports.encryptionsetup = (data, code)=>{
	const algorithm = 'aes-192-cbc';
	const password = 'pride is a damesell in distress, try as she can not to confess';
//	const key = scryptSync(password, 'sandyshoresfromfallout', 24);
//	const decipher = createDecipheriv(algorithm, key, iv);
//	console.log(key.toString('hex'));
	const key = '0d1355f3930bac56fffb365a503f0b68d813c89c207baf38'
	const iv = '1c372cb29529d74e8080d4f760a63968';
	console.log(process.env.IV);
	const ivbuf = Buffer.from(process.env.IV,'hex');
	const keybuf = Buffer.from(process.env.KEY,'hex');
	console.log(keybuf.toString('hex'));
	console.log(ivbuf.toString('hex'));
	
	const cipher = createCipheriv(algorithm, keybuf, ivbuf);
	let encrypted = cipher.update('i guess it works', 'utf8', 'hex');
    encrypted += cipher.final('hex');
	console.log(encrypted);
	const decipher = createDecipheriv(algorithm, keybuf, ivbuf);
	let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	console.log(decrypted);
/*	randomFill(buf, (err, buf) => {
		if (err) throw err;
	//	console.log(buf);
	//	console.log(buf.toString('hex'));
		const buff = Buffer.from(iv,'hex');
		console.log(buff);
	});*/

	/*scrypt(password, 'salt', 24, (err, key) => {
		if (err) throw err;
  // Then, we'll generate a random initialization vector
		randomFill(new Uint8Array(16), (err, iv) => {
			if (err) throw err;

    // Once we have the key and iv, we can create and use the cipher...
			const cipher = createCipheriv(algorithm, key, iv);
			console.log(key);
			console.log(iv);
			let encrypted = '';
			cipher.setEncoding('hex');

			cipher.on('data', (chunk) => encrypted += chunk);
			cipher.on('end', () => console.log(encrypted));

			cipher.write(data);
			cipher.end();
		});
	});*/
	//console.log(encrypted);
}

exports.Encrypt = (data)=>{
	const algorithm = 'aes-192-cbc';
	const ivbuf = Buffer.from(process.env.IV,'hex');
	const keybuf = Buffer.from(process.env.KEY,'hex');
	const cipher = createCipheriv(process.env.ALGORITHM, keybuf, ivbuf);
	let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
	console.log(process.env.MINISTER_INTERN+'/handicap');
	return encrypted;
}

exports.Decrypt = (data)=>{
	const algorithm = 'aes-192-cbc';
	const ivbuf = Buffer.from(process.env.IV,'hex');
	const keybuf = Buffer.from(process.env.KEY,'hex');
	const decipher = createDecipheriv(process.env.ALGORITHM, keybuf, ivbuf);
	let dencrypted = decipher.update(data, 'hex', 'utf8');
    dencrypted += decipher.final('utf8');
	return dencrypted;
}
