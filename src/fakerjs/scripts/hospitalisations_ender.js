const { fakerFR: faker } = require('@faker-js/faker');
const axios = require('axios');
const https = require('https')
const { custom_random, random_valid_jwt } = require('./utils')
const agent = new https.Agent({ rejectUnauthorized: false})

exports.fillup = async () => {
    const response = await axios.get(
        `https://localhost/api/hospitalisations`,
        {httpsAgent: agent, headers: {"Authorization": "Bearer " + random_valid_jwt()}}
    );

    const hospitalisations = response.data;

    for(let i=hospitalisations.length-1; i > 10; i--){
        let sortie = {
            mode_sortie: "Sortie",
            date_sortie: faker.date.future({years:1, refDate: hospitalisations[i].date_entree})
        }
        await axios.post(
            `https://localhost/api/hospitalisations/${hospitalisations[i].id}/sortie`,
            sortie,
            {httpsAgent: agent, headers: {"Authorization": "Bearer " + random_valid_jwt()}}
        );
    }
    
}