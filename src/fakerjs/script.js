const patients = require('./scripts/patients');
const consultations = require('./scripts/consultations');
const hospitalisations = require('./scripts/hospitalisations');
const hospitalisations_ender = require('./scripts/hospitalisations_ender');
const radios_ender = require('./scripts/radios_ender');
const bilans_ender = require('./scripts/bilans_ender');
const interventions = require('./scripts/interventions');

const NUMBER_OF_RECORDS = 500

async function main(){
    const patientsList = await patients.fillup(NUMBER_OF_RECORDS);
    await consultations.fillup(NUMBER_OF_RECORDS*3, patientsList);
    await radios_ender.fillup(); // Ends all radios but 5
    await bilans_ender.fillup(); // Ends all bilans but 5

    await hospitalisations.fillup(NUMBER_OF_RECORDS*3, patientsList);
    await hospitalisations_ender.fillup(); // Ends all hospitalisations but 5

    await interventions.fillup(NUMBER_OF_RECORDS*3, patientsList);
}

main();