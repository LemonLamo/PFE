const axios = require('axios')

exports.fetchPatients = async (data) => {
    const NINs = data.map((x) => x.patient);
    const patients = (await axios.post('http://patients-service/private/patientsByNINs', { NINs })).data;
    const patientsMap = new Map(patients.map((x) => [x.NIN, { ...x }]));

    return data.map((x) => ({ ...x, patient: patientsMap.get(x.patient) }));
}

exports.fetchBilans = async (data) => {
    const codes_bilans = data.map((x) => x.code_bilan);
    const bilans = (await axios.post('http://codifications-service/private/bilansByCodes', { codes_bilans })).data;
    const codesMap = new Map(bilans.map((x) => [x.code_bilan, { ...x }]));

    return data.map((x) => ({ ...x, designation: codesMap.get(x.code_bilan).designation }));
}

exports.fetchRadios = async (data) => {
    const codes_radios = data.map((x) => x.code_radio);
    const radios = (await axios.post('http://codifications-service/private/radiosByCodes', { codes_radios })).data;
    const codesMap = new Map(radios.map((x) => [x.code_radio, { ...x }]));

    return data.map((x) => ({ ...x, designation: codesMap.get(x.code_radio).designation }));
}