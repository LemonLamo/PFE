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
            motif: "Intervention"
        }

        await axios.post(
            `https://localhost/api/auth/authorisations`,
            auth_request,
            { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt } }
        );


        try{
            const intervention = {
                patient: patient,
                date: faker.date.past({years: 5}).toString(),
                code_intervention: custom_random(['03120Z0', '03120Z1', '08N23ZZ']),
                remarques: faker.lorem.sentences({min:0, max:3}),
                protocole_operatoire: faker.lorem.sentences()
            }
            await axios.post(
                `https://localhost/api/interventions`,
                intervention,
                { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt}}
            );
            console.log(`Added intervention to (${patient})`)
            i++;
        }catch(e){
            console.log(e.response.data)
            console.log(`Failed to add intervention to (${patient})`)
        }
    }
}
