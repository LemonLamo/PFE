const { fakerFR: faker } = require('@faker-js/faker');
const axios = require('axios');
const https = require('https')
const fs = require('fs')
const { custom_random, random_valid_jwt } = require('./utils')
const agent = new https.Agent({ rejectUnauthorized: false})
const FormData = require('form-data');

exports.fillup = async () => {
    const response = await axios.get(
        `https://localhost/api/radios`,
        {httpsAgent: agent, headers: {"Authorization": "Bearer " + random_valid_jwt()}}
    );

    const radios = response.data;

    for(let i=radios.length-1; i > 10; i--){
        let data = new FormData();
        data.append('radios', fs.createReadStream('./scripts/100010364027390000.jpg'));
        data.append('observations', faker.lorem.sentence());
        
        await axios.post(
            `https://localhost/api/radios/${radios[i].id}`,
            data,
            {httpsAgent: agent, headers: {"Authorization": "Bearer " + random_valid_jwt(), 'Content-Type': `multipart/form-data; boundary=${data._boundary}`}}
        );
    }
    
}