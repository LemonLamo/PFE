const { fakerFR: faker } = require('@faker-js/faker');
const axios = require('axios');
const https = require('https')
const { custom_random, random_valid_jwt } = require('./utils')
const agent = new https.Agent({ rejectUnauthorized: false})

exports.fillup = async () => {
    const session = random_valid_jwt();
    const response = await axios.get(
        `https://localhost/api/hospitalisations`,
        { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt }}
    );

    const hospitalisations = response.data;
    let i = hospitalisations.length - 1;
    while(i >= 0){
        let sortie = {
            mode_sortie: "Sortie",
            date_sortie: faker.date.future({years:1, refDate: hospitalisations[i].date_entree})
        }
        try{
            await axios.post(
                `https://localhost/api/hospitalisations/${hospitalisations[i].id}/sortie`,
                sortie,
                { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt}}
            );
            i--;
        }catch(e){
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    
}