const axios = require('axios')

exports.genID = () => {
    const id =  Array.from({ length: 8 }, () => Math.random().toString(36).charAt(2)).join('').toUpperCase();
    return id
}

exports.verifyIntegrity = async (id, obj) => {
    try {
        const result = await axios.post('http://blockchain-service/api/blockchain/verify', { id, obj })
        return result.data.integrite;
    } catch (err) {
        return 0;
    }
}