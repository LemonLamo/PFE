const express = require('express');

const app = express();
const cron = require('node-cron');
const cors = require("cors");
const axios = require('axios');
const RabbitConnection = require("./util/amqplib");
const {Encrypt, Decrypt} = require('./util/encryption');
const {CheckHandicapped, SendData} = require('./util/util');
const bodyParser = require("body-parser");
const fs = require('fs');
require('dotenv').config()
RabbitConnection.connect();
 
const generateTargetReports = () =>{
	//console.log("cronned successfully");
	RabbitConnection.sendMsg('handicap',{NIN:'000000',code_handicap:'12',date:'15/10/2024',remarque:'retard mental heavy',doctor:'house'})
//	axios.get('http://localhost:3000/handicap').then((res)=>{ console.log(res.data)});
}

const RegularCheck = () =>{
	RabbitConnection.sendMsg('RegularCheck', {Check: 'all'});
}

let time = 0;

app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(4000);


app.post('/handicap', (req, res) => {
  time++;
  fs.writeFileSync('log',req.headers)
  res.statusCode = 200;
  //res.send('Cant find that file, sorry!');
  console.log(Decrypt(req.body.coded));
  res.send({success: true});
})

app.get('/CheckHandicap', (req, res) => {
  
 // const {code} = req.coded
  console.log(req.query.code );
  res.statusCode = 200;
  //res.send('Cant find that file, sorry!');
  res.send({success: false});
})

RabbitConnection.on('handicap',async (data) =>{
	try{
		const result = await CheckHandicapped({NIN: data.NIN, Code: data.code_handicap}, 'http://localhost:4000/CheckHandicap')
		if(result == false){
			const IsSent = await SendData(data, 'http://localhost:4000/handicap');
			if(IsSent){
				RabbitConnection.sendMsg('Interoperability', {NIN: data.NIN,code_handicap:data.code_handicap,ministry:'Solidarity'});
			}
		}
		const result2 = await CheckHandicapped({NIN: data.NIN, Code: data.code_handicap}, 'http://localhost:4000/CheckHandicap');
		if(result2 == false){
			const IsSent = await SendData(data, 'http://localhost:4000/handicap');
			if(IsSent){
				RabbitConnection.sendMsg('Interoperability', {NIN: data.NIN,code_handicap:data.code_handicap,ministry: 'Travail'});
			}
		}
	}catch(err){
		console.log(err);
	}
	//axios.post('https://httpbin.org/post',{coded}).then((res)=>{ console.log(res.data)});
})


generateTargetReports();
cron.schedule('0 0 * * *', RegularCheck)
//cron.schedule('* * * * *', generateTargetReports)