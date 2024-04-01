const axios = require('axios')

exports.fetchMaladies = async (data) => {
    const codes_maladies = data.map((x) => x.code_maladie);
    const maladies = (await axios.post('http://codifications-service/private/maladiesByCodes', { codes_maladies })).data;
    const codesMap = new Map(maladies.map((x) => [x.code_maladie, { ...x }]));

    return data.map((x) => ({ ...x, designation: codesMap.get(x.code_maladie).designation }));
}

exports.fetchAllergies = async (data) => {
    const codes_allergenes = data.map((x) => x.code_allergene);
    const allergenes = (await axios.post('http://codifications-service/private/allergenesByCodes', { codes_allergenes })).data;
    const codesMap = new Map(allergenes.map((x) => [x.code_allergene, { ...x }]));

    return data.map((x) => ({ ...x, designation: codesMap.get(x.code_allergene).designation }));
}

exports.fetchVaccinations = async (data) => {
    const codes_vaccins = data.map((x) => x.code_vaccin);
    const vaccins = (await axios.post('http://codifications-service/private/vaccinsByCodes', { codes_vaccins })).data;
    const codesMap = new Map(vaccins.map((x) => [x.code_vaccin, { ...x }]));

    return data.map((x) => ({ ...x, designation: codesMap.get(x.code_vaccin).designation }));
}