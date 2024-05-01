const { fakerFR: faker } = require('@faker-js/faker');
const axios = require('axios');
const https = require('https')
const fs = require('fs')
const { custom_random, random_valid_jwt } = require('./utils')
const agent = new https.Agent({ rejectUnauthorized: false})
const FormData = require('form-data');

exports.fillup = async (NUMBER_OF_RECORDS) => {
    let i=0;
    const patients = []
    while (i < NUMBER_OF_RECORDS){
        try{
            const patient = {
                NIN: "1000"+Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(''),
                nom: faker.person.lastName(),
                prenom: faker.person.firstName(),
                date_de_naissance: faker.date.birthdate(),
                lieu_de_naissance: faker.location.city(),
                sexe: custom_random(["Male", "Female"]),
                situation_familiale: custom_random(["Célébataire", "Marrié(e)", "Divorcé(e)", "Veuf(e)"]),
                email: faker.internet.email(),
                telephone: "0"+Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join(''),
                adresse: faker.location.streetAddress(),
                commune: faker.location.city(),
                code_postale: faker.number.int({min: 10000, max: 58000}),
                wilaya: faker.location.city(),
                groupage: custom_random(["B+", "A+", "O+", "O-"]),
                taille: faker.number.int({min:150, max: 196}),
                poids: faker.number.int({min:40, max: 96}),
                donneur_organe: false,
                NIN_pere: "1000"+Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(''),
                NIN_mere: "1000"+Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(''),
            }
            
            const data = new FormData();
            Object.keys(patient).forEach((key) => data.append(key, patient[key].toString()));
            data.append("avatar", fs.createReadStream('./scripts/100010364027390000.jpg'));
            
            await axios.post(
                `https://localhost/api/patients`,
                data,
                {httpsAgent: agent, headers: {"Authorization": "Bearer " + random_valid_jwt(), 'Content-Type': `multipart/form-data; boundary=${data._boundary}`}}
            );
            console.log(`Added ${patient.nom} ${patient.prenom} (${patient.NIN})`)
            patients.push(patient.NIN);
            i++;
        }catch(e){
            console.error(e)
        }
    }
    return patients;
}