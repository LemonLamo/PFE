const axios = require('axios')

exports.fetchMaladies = async (data) => {
    if(data.length==0) return data;
    const codes_maladies = data.map((x) => x.code_maladie);
    const maladies = (await axios.post('http://codifications-service/private/maladiesByCodes', { codes_maladies })).data;
    const codesMap = new Map(maladies.map((x) => [x.code_maladie, { ...x }]));

    return codesMap;
}

exports.fetchAllergies = async (data) => {
    if(data.length==0) return data;
    const codes_allergenes = data.map((x) => x.code_allergene);
    const allergenes = (await axios.post('http://codifications-service/private/allergenesByCodes', { codes_allergenes })).data;
    const codesMap = new Map(allergenes.map((x) => [x.code_allergene, { ...x }]));

    return codesMap;
}

exports.fetchVaccinations = async (data) => {
    if(data.length==0) return data;
    const codes_vaccins = data.map((x) => x.code_vaccin);
    const vaccins = (await axios.post('http://codifications-service/private/vaccinsByCodes', { codes_vaccins })).data;
    const codesMap = new Map(vaccins.map((x) => [x.code_vaccin, { ...x }]));

    return codesMap;
}