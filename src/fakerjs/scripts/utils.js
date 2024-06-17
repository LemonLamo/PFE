const { fakerFR: faker } = require('@faker-js/faker');

const JWT_TOKENS = [
  {NIN:'100010364027390000', jwt:'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJOSU4iOiIxMDAwMTAzNjQwMjczOTAwMDAiLCJub20iOiJCUkFISU0iLCJwcmVub20iOiJBYmRlcnJhemFrIiwic3BlY2lhbGl0ZSI6IkNoaXJ1Z2llIEfDqW7DqXJhbGUiLCJob3BpdGFsIjoiQ0hVIE11c3RhcGhhIiwic2VydmljZSI6IkNoaXJ1Z2llIEfDqW7DqXJhbGUiLCJyb2xlIjoibWVkZWNpbiIsInBlcm1pc3Npb25zIjp7fSwiaWF0IjoxNzE0MDc4MDE0fQ.Ku9sSrGAPii7EvbLyTx0sb7uxkE7zB9SM7NBoLuml-DYupzrSfU719RS2cN37nzj_WGvhMgPHq0rxpRyPzHJsw'},
]

exports.custom_random = (list) => {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

exports.random_valid_jwt = () => {
  const index = Math.floor(Math.random() * JWT_TOKENS.length);
  return JWT_TOKENS[index];
}

const CODES_EXAMENS_CLINIQUES = ['S10.9', 'Z06.0', 'S54.16', 'N83.29', 'Z12.31']
exports.random_examens_cliniques = () =>{
  const result = []
  const count = Math.floor(Math.random() * 3);
  for (let i=0; i<count; i++){
    result.push({code_examen_clinique: this.custom_random(CODES_EXAMENS_CLINIQUES), resultat: faker.number.int({min: 1, max: 100}), remarques: ''})
  }
  return result;
}

const CODES_BILANS = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8']
exports.random_bilans = () =>{
  const result = []
  const count = Math.floor(Math.random() * 3);
  for (let i=0; i<count; i++){
    result.push({code_bilan: this.custom_random(CODES_BILANS), date: faker.date.past({years: 1}), remarques: ''})
  }
  return result;
}

const CODES_RADIO = ['R10.9', 'S06.0', 'M54.16', 'N83.29', 'Z12.31']
exports.random_radios = () =>{
  const result = []
  const count = Math.floor(Math.random() * 3);
  for (let i=0; i<count; i++){
    result.push({code_radio: this.custom_random(CODES_RADIO), date: faker.date.past({years: 1}), remarques: ''})
  }
  return result;
}

const CODES_MEDICAMENTS = ['01 A 003', '01 A 008', '01 A 009', '01 A 034', '01 A 039']
exports.random_prescriptions = () =>{
  const result = []
  const count = Math.floor(Math.random() * 3);
  for (let i=0; i<count; i++){
    result.push({
      code_medicament: this.custom_random(CODES_MEDICAMENTS),
      posologie: this.custom_random([100, 200, 500, 1000]),
      frequence: this.custom_random([1, 2, 3]),
      duree: this.custom_random([7, 15, 30, 90]),
      date: faker.date.past({years: 1}),
      remarques: ''
    });
  }
  return result;
}