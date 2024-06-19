const { fakerFR: faker } = require('@faker-js/faker');

const JWT_TOKENS = [
  { NIN: '100010364027390000', jwt:'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJOSU4iOiIxMDAwMTAzNjQwMjczOTAwMDAiLCJub20iOiJCUkFISU0iLCJwcmVub20iOiJBYmRlcnJhemFrIiwic3BlY2lhbGl0ZSI6IkNhcmRpb2xvZ2llIiwiaG9waXRhbCI6IkNIVSBNdXN0YXBoYSIsInNlcnZpY2UiOiJDaGlydXJnaWUgR8OpbsOpcmFsZSIsInJvbGUiOiJtZWRlY2luIiwicGVybWlzc2lvbnMiOnt9LCJpYXQiOjE3MTg3NTQ2ODZ9.KwBpyJqBDHT9e5rLYvlJC1m0JUZNXnu1gZEM-eHLY-52xjGTiDzN9GNPuvjgeN9jEWqiG86E6NnBkyIhIlaxUA'},
]

exports.custom_random = (list) => {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

exports.random_valid_jwt = () => {
  const index = Math.floor(Math.random() * JWT_TOKENS.length);
  return JWT_TOKENS[index];
}

const CODES_EXAMENS_CLINIQUES = ['EC01', 'EC02', 'EC03', 'EC04', 'EC05']
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
    result.push({ code_bilan: this.custom_random(CODES_BILANS), externe: 0, date: faker.date.past({years: 1}), remarques: ''})
  }
  return result;
}

const CODES_RADIO = ['R10.9', 'S06.0', 'M54.16', 'N83.29', 'Z12.31']
exports.random_radios = () =>{
  const result = []
  const count = Math.floor(Math.random() * 3);
  for (let i=0; i<count; i++){
    result.push({
      code_radio: this.custom_random(CODES_RADIO), externe: 0, date: faker.date.past({years: 1}), remarques: ''})
  }
  return result;
}

const CODES_MEDICAMENTS = ['N02BE01', 'C07AB02', 'A02BC01', 'A01AB03', 'A10BA02']
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