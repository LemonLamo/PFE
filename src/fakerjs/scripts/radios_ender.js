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
        `https://localhost/api/radios`,
        { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt}}
    );

    const radios = response.data;

    for(let i=radios.length-1; i >= 0; i--){
        let data = new FormData();
        let count = custom_random([1, 2, 3]);
        for(let j=0; j<count; j++)
            data.append('radios', fs.createReadStream(`./radios/${custom_random([1,2,3,4,5])}.png`));
        data.append('observations', faker.lorem.sentence());
        
        await axios.post(
            `https://localhost/api/radios/${radios[i].id}`,
            data,
            { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt, 'Content-Type': `multipart/form-data; boundary=${data._boundary}`}}
        );
    }
    
}