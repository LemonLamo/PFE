const axios = require('axios')

exports.fetchMaladies = async (data) => {
    if(data.length==0) return data;
    const codes_maladies = data.map((x) => x.code_maladie);
    const maladies = (await axios.post('http://codifications-service/private/maladies', { codes_maladies })).data;
    const codesMap = new Map(maladies.map((x) => [x.code_maladie, { ...x }]));

    return codesMap;
}

exports.fetchAllergies = async (data) => {
    if(data.length==0) return data;
    const codes_allergenes = data.map((x) => x.code_allergene);
    const allergenes = (await axios.post('http://codifications-service/private/allergenes', { codes_allergenes })).data;
    const codesMap = new Map(allergenes.map((x) => [x.code_allergene, { ...x }]));

    return codesMap;
}

exports.fetchHandicaps = async (data) => {
    if (data.length == 0) return data;
    const codes_handicaps = data.map((x) => x.code_handicap);
    const handicaps = (await axios.post('http://codifications-service/private/handicaps', { codes_handicaps })).data;
    const codesMap = new Map(handicaps.map((x) => [x.code_handicap, { ...x }]));

    return codesMap;
}

exports.fetchVaccinations = async (data) => {
    if(data.length==0) return data;
    const codes_vaccins = data.map((x) => x.code_vaccin);
    const vaccins = (await axios.post('http://codifications-service/private/vaccins', { codes_vaccins })).data;
    const codesMap = new Map(vaccins.map((x) => [x.code_vaccin, { ...x }]));

    return codesMap;
}

exports.fetchMedicaments = async (data) => {
    if(data.length==0) return data;
    const codes_medicaments = data.map((x) => x.code_medicament);
    const medicaments = (await axios.post('http://codifications-service/api/codifications/medicaments', { codes_medicaments })).data;
    const medicamentsMap = new Map(medicaments.map((x) => [x.code_medicament, { ...x }]));

    return medicamentsMap;
}