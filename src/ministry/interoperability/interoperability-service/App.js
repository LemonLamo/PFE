const express = require('express');

const app = express();
const cron = require('node-cron');
const cors = require("cors");
const axios = require('axios');
const RabbitConnection = require("./util/amqplib");
const {Encrypt, Decrypt} = require('./util/encryption');
const bodyParser = require("body-parser");
const fs = require('fs');
require('dotenv').config()
RabbitConnection.connect();
 
const generateTargetReports = () =>{
	//console.log("cronned successfully");
	RabbitConnection.sendMsg('handicap',{NIN:'000000',code_handicap:'12',date:'15/10/2024',remarque:'retard mental heavy',doctor:'house'})
//	axios.get('http://localhost:3000/handicap').then((res)=>{ console.log(res.data)});
}

app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(4000);


app.post('/handicap', (req, res) => {
  time++;
  fs.writeFileSync('log',req.headers)
 // const {code} = req.coded
  console.log(req.body);
  res.statusCode = 200;
  //res.send('Cant find that file, sorry!');
  res.send(Decrypt(req.body['coded']));
})

RabbitConnection.on('handicap',async (data) =>{
	let temp  = data
	//console.log(JSON.stringify(temp));
	const coded = Encrypt(JSON.stringify(temp));
	
	//console.log(JSON.stringify({code: coded}));

	console.log('https://intern/handicap');
	axios.post('https://intern/handicap',{coded}).then((res)=>{ console.log(res.data)}).catch((error) => {
    // en cas d’échec de la requête
    console.log(error);
  });
	//axios.post('https://httpbin.org/post',{coded}).then((res)=>{ console.log(res.data)});
})


generateTargetReports();
cron.schedule('* * * * *', generateTargetReports)