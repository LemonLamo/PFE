const blockchain = require('../blockchain')
const stringify = require('json-stringify-deterministic')
const sortKeysRecursive = require('sort-keys-recursive')
const crypto = require('crypto')
const logger = require('./logger')

exports.AddEntry = async (id, obj) => {
    try{
        const string = stringify(sortKeysRecursive(obj))
        const hash = crypto.createHash('sha256').update(string, 'binary').digest('hex')
        await blockchain.invoke("AddEntry", id, hash, new Date().toISOString())
    }catch(err){
        logger.error(err)
    }
}