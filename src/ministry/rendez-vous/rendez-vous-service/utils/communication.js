const axios = require('axios')

exports.fetchPatients = async (data) => {
    if(data.length==0) return data;
    const NINs = data.map((x) => x.patient);
    const patients = (await axios.post('http://patients-service/private/patients', { NINs })).data;
    const patientsMap = new Map(patients.map((x) => [x.NIN, { ...x }]));

    return patientsMap;
}

exports.fetchInterventions = async (data) => {
    if(data.length==0) return data;
    const codes_interventions = data.map((x) => x.code_intervention);
    const bilans = (await axios.post('http://codifications-service/private/interventions', { codes_interventions })).data;
    const codesMap = new Map(bilans.map((x) => [x.code_intervention, { ...x }]));

    return codesMap;
}

exports.fetchBilans = async (data) => {
    if(data.length==0) return data;
    const codes_bilans = data.map((x) => x.code_bilan);
    const bilans = (await axios.post('http://codifications-service/private/bilans', { codes_bilans })).data;
    const codesMap = new Map(bilans.map((x) => [x.code_bilan, { ...x }]));

    return codesMap;
}

exports.fetchRadios = async (data) => {
    if(data.length==0) return data;
    const codes_radios = data.map((x) => x.code_radio);
    const radios = (await axios.post('http://codifications-service/private/radios', { codes_radios })).data;
    const codesMap = new Map(radios.map((x) => [x.code_radio, { ...x }]));

    return codesMap;
}