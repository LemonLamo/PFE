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
        const session = random_valid_jwt();
        try{
            const patient = {
                NIN: "1000"+Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(''),
                nom: custom_random(LAST_NAMES),
                prenom: custom_random(FIRST_NAMES),
                date_de_naissance: faker.date.birthdate(),
                lieu_de_naissance: custom_random(WILAYAS),
                sexe: custom_random(["Male", "Female"]),
                situation_familiale: custom_random(["Célébataire", "Marrié(e)", "Divorcé(e)", "Veuf(e)"]),
                email: faker.internet.email(),
                telephone: "0"+Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join(''),
                adresse: faker.location.streetAddress(),
                commune: faker.location.city(),
                code_postale: faker.number.int({min: 10000, max: 58000}),
                wilaya: custom_random(WILAYAS),
                groupage: custom_random(["B+", "A+", "O+", "O-"]),
                taille: faker.number.int({min:150, max: 196}),
                poids: faker.number.int({min:40, max: 96}),
                donneur_organe: false,
                NIN_pere: "1000"+Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(''),
                NIN_mere: "1000"+Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(''),
                maladies_chroniques: "[]",
                allergies: "[]",
                antecedents_medicaux: "[]",
                antecedents_familiaux: "[]",
            }
            
            const data = new FormData();
            Object.keys(patient).forEach((key) => data.append(key, patient[key].toString()));
            data.append('avatar', fs.createReadStream(`./profile_pictures/${custom_random([1,2,3,4,5,6,7,8,9,10])}.jpg`));
            
            await axios.post(
                `https://localhost/api/patients`,
                data,
                { httpsAgent: agent, headers: { "Authorization": "Bearer " + session.jwt, 'Content-Type': `multipart/form-data; boundary=${data._boundary}`}}
            );
            console.log(`Added ${patient.nom} ${patient.prenom} (${patient.NIN})`)
            patients.push(patient.NIN);
            i++;
        }catch(e){
            console.log(`Failed to add patient`)
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    return patients;
}


const LAST_NAMES = [
    "Ahmed", "Ali", "Aït", "Amara", "Belkacem", "Benamor", "Benali", "Bensalah", "Bouaziz", "Cherif",
    "Djemai", "Fekir", "Haddad", "Hariri", "Kassab", "Madani", "Mansouri", "Mebarki", "Merabet", "Saadi",
    "Saad", "Salah", "Ait", "Chibani", "Chergui", "Daoud", "Debbouze", "Djelloul", "Hamdani", "Ibn",
    "Kacem", "Khaled", "Lahmar", "Mahmoud", "Nacer", "Omar", "Ouadah", "Rabhi", "Rahal", "Saoud",
    "Seddiqi", "Sekkat", "Selim", "Tahar", "Toumi", "Yahia", "Zaid", "Zemouli", "Zinedine", "Adel",
    "Aziz", "Badis", "Benaissa", "Benmoussa", "Benzema", "Chergui", "Djaballah", "Draoui", "Ech-Chergui", "Gharbi",
    "Guendouz", "Hadjar", "Halouani", "Hamida", "Ibrahim", "Kadour", "Karim", "Khelifa", "Khelil", "Kouider",
    "Larbi", "Lounis", "Maiza", "Mekki", "Meziane", "Mohamed", "Mokhtar", "Moussa", "Mouloud", "Mourad",
    "Moussaoui", "Mustapha", "Nadir", "Nasri", "Nour", "Ouchene", "Rachid", "Salah", "Samir", "Slimane",
    "Tarek", "Wahid", "Yacine", "Yahiaoui", "Youssef", "Zakaria", "Zemmouri", "Zerrouki", "Ziad", "Zohir"
];

const FIRST_NAMES = [
    "Ahmed", "Ali", "Amar", "Amina", "Anis", "Bachir", "Bilal", "Brahim", "Chafik", "Cherif",
    "Djamila", "Djawad", "Fadila", "Farid", "Fatima", "Fouad", "Habib", "Hakim", "Halima", "Hassan",
    "Hicham", "Houda", "Ilyas", "Imane", "Issam", "Jalal", "Jamel", "Karim", "Khaled", "Khalil",
    "Lamya", "Lina", "Lotfi", "Lyes", "Malek", "Marouane", "Mehdi", "Mohamed", "Mounir", "Mustapha",
    "Nabil", "Nada", "Nadia", "Nadir", "Naima", "Nasser", "Nawel", "Nesrine", "Omar", "Oussama",
    "Rabia", "Rachid", "Rafik", "Rania", "Reda", "Riadh", "Rim", "Riyad", "Saad", "Sabri",
    "Sabrina", "Samir", "Samira", "Sara", "Siham", "Sofiane", "Sonia", "Soraya", "Souad", "Tahar",
    "Tarik", "Walid", "Wassim", "Yacine", "Yahia", "Yamina", "Yanis", "Yasser", "Yasmine", "Younes",
    "Youssef", "Zahir", "Zakia", "Zayd", "Zaynab", "Zineb", "Zohra", "Zoubida", "Abdelkader", "Adel",
    "Ahlam", "Aicha", "Akram", "Amine", "Asma", "Aziz", "Chahinez", "Chiraz", "Dalila", "Dina"
];

const WILAYAS = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
    "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", "Sétif", "Saïda",
    "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla",
    "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
    "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar",
    "Ouled Djellal", "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Menia"
];
