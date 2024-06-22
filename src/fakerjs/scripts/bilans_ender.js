const { fakerFR: faker } = require('@faker-js/faker');
const axios = require('axios');
const https = require('https')
const fs = require('fs')
const { custom_random, random_valid_jwt } = require('./utils')
const agent = new https.Agent({ rejectUnauthorized: false})
const FormData = require('form-data');

exports.fillup = async () => {
    const session = random_valid_jwt();
    const response = await axios.get(
        `https://localhost/api/bilans`,
        { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt }}
    );

    const bilans = response.data;

    let i = bilans.length - 1;
    while(i >= 0){
        let data = new FormData();
        let count = custom_random([1, 2, 3]);
        for(let j=0; j<count; j++)
            data.append('bilans', fs.createReadStream(`./bilans/${custom_random([1,2,3])}.pdf`));
        data.append('observations', faker.lorem.sentence());
        
        try{
            await axios.post(
                `https://localhost/api/bilans/${bilans[i].id}`,
                data,
                { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt, 'Content-Type': `multipart/form-data; boundary=${data._boundary}`}}
            );
            i--;
        }catch(e){
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    
}