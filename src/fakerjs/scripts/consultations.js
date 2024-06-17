const { fakerFR: faker } = require('@faker-js/faker');
const axios = require('axios');
const https = require('https')
const { custom_random, random_valid_jwt, random_examens_cliniques, random_prescriptions, random_radios, random_bilans } = require('./utils')
const agent = new https.Agent({ rejectUnauthorized: false})

exports.fillup = async (NUMBER_OF_RECORDS, patients) => {
    let i=0;
    while (i < NUMBER_OF_RECORDS){
        const session = random_valid_jwt();
        const patient = custom_random(patients);

        const auth_request = {
            medecin: session.NIN,
            patient: patient,
            motif: "Consultation"
        }

        await axios.post(
            `https://localhost/api/auth/authorisations`,
            auth_request,
            { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt } }
        );

        const date = faker.date.past({years: 10});
        try{
            const consultation = {
                bilans: random_bilans(),
                date: date.toString(),
                diagnostique: faker.lorem.word(5),
                diagnostique_details: "",
                examens_cliniques: random_examens_cliniques(),
                interventions: [],
                motif: custom_random(["Symptôme", "Plainte"]),
                patient: patient,
                prescriptions: random_prescriptions(),
                radios: random_radios(),
                resume: faker.lorem.sentences(),
                symptomes: faker.lorem.sentences(1),
                prochaine_consultation: custom_random([undefined, faker.date.future({refDate: date}).toString()]),
                duree_arret_de_travail: custom_random([undefined, undefined, undefined, 7, 15]),
                type: custom_random(["Evaluation de nouveau patient", "Suivi periodique (non urgent)", "Viste de soins (urgent)"]),
            }
            await axios.post(
                `https://localhost/api/consultations`,
                consultation,
                { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt}}
            );
            console.log(`Added consultation to (${patient})`)
            i++;
        }catch(e){
            console.log(e.response.data)
            console.log(`Failed to add consultation to (${patient})`)
        }
    }
}
