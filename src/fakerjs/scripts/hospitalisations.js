const { fakerFR: faker } = require('@faker-js/faker');
const axios = require('axios');
const https = require('https')
const { custom_random, random_valid_jwt } = require('./utils')
const agent = new https.Agent({ rejectUnauthorized: false})

exports.fillup = async (NUMBER_OF_RECORDS, patients) => {
    let i=0;
    while (i < NUMBER_OF_RECORDS){
        const session = random_valid_jwt();
        const patient = custom_random(patients);

        const auth_request = {
            medecin: session.NIN,
            patient: patient,
            motif: "Hospitalisation"
        }

        try{
            await axios.post(
                `https://localhost/api/auth/authorisations`,
                auth_request,
                { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt } }
            );
            
            const hospitalisation = {
                patient: patient,
                date_entree: faker.date.past({years: 5}).toString(),
                mode_entree: custom_random(['Hospitalisation complète', 'Hospitalisation partielle', 'Hôpital du jour']),
                motif_hospitalisation: faker.lorem.sentences({max: 1}),
                chambre: custom_random(['F1', 'F2', 'F3', 'F4']),
                lit: custom_random(['1', '2', '3', '4', '5', '6']),
                resume_hospitalisation: faker.lorem.sentences({max: 1}),
            }
            await axios.post(
                `https://localhost/api/hospitalisations`,
                hospitalisation,
                { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt}}
            );
            console.log(`Added hospitalisation to (${patient})`)
            i++;
        }catch(e){
            console.log(`Failed to add hospitalisation to (${patient})`)
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}