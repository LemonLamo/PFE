const axios = require('axios');
const {Encrypt, Decrypt} = require('./encryption');

const MAX = 5;

exports.CheckHandicapped = async (data, route) => {
	try{
		const coded = Encrypt(JSON.stringify(data));
		let response = await axios.get(route,{
			params: {
				code: coded
			}
		});
		console.log(data);
		if(response.data.success === true){
			return true;
		}else if(response.data.success === false){
			return false
		}
	}catch(err){
		console.log(err);
		throw('couldnt connect to it')
	}
}

exports.SendData = async (data, route) => {
	let attempt = 1;
	const coded = Encrypt(JSON.stringify(data));
	//console.log(route);
	while(attempt <= MAX){
		try{
			const response = await axios.post(route,{coded});
			//console.log(response);
			if(response.data.success == true){
				return true;
			}else{
				throw('meh');
			}
		}catch(err){
			console.log('[MINISTER]: couldnt connect to ministry retrying  '+ err);
			attempt++;
		}
	}
	return false;
}