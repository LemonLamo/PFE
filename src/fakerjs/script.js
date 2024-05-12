const patients = require('./scripts/patients');
const consultations = require('./scripts/consultations');
const hospitalisations = require('./scripts/hospitalisations');
const hospitalisations_ender = require('./scripts/hospitalisations_ender');
const radios_ender = require('./scripts/radios_ender');
const bilans_ender = require('./scripts/bilans_ender');
const interventions = require('./scripts/interventions');

const NUMBER_OF_RECORDS = 100
function randomCloseBy(number) {
  const min = number * 0.9; // 90% of the number
  const max = number;       // 100% of the number
  return Math.random() * (max - min) + min;
}

async function main(){
    const patientsList = await patients.fillup(randomCloseBy(NUMBER_OF_RECORDS));
    await consultations.fillup(randomCloseBy(NUMBER_OF_RECORDS*3), patientsList);
    await radios_ender.fillup(); // Ends all radios but 5
    await bilans_ender.fillup(); // Ends all bilans but 5

    await hospitalisations.fillup(randomCloseBy(NUMBER_OF_RECORDS*3), patientsList);
    await hospitalisations_ender.fillup(); // Ends all hospitalisations but 5

    await interventions.fillup(randomCloseBy(NUMBER_OF_RECORDS*3), patientsList);
}

main();
