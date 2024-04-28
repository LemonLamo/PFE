const path = require('path');
const fs = require('fs').promises;
const { TextDecoder } = require('util');
const { connect } = require('@hyperledger/fabric-gateway');
const { newGrpcConnection, newIdentity, newSigner } = require('./GrpcConnection');

// Path to peer tls certificate.
const tlsCertPath = path.resolve('blockchain', 'peer0.hopital1.medicalife.com', 'tls', 'ca.crt');
const peerEndpoint = 'localhost:7051';
const peerHostAlias = 'peer0.hopital1.medicalife.com';

// Path to user private & public key directories.
const keyDirectoryPath = path.resolve('blockchain', 'Admin@hopital1.medicalife.com', 'msp', 'keystore');
const certDirectoryPath = path.resolve('blockchain', 'Admin@hopital1.medicalife.com', 'msp', 'signcerts');

// Gateway peer endpoint.
const mspId = 'Hopital1MSP';
const channelName = 'mychannel';
const chaincodeName = 'basic';

class HFConnection{
    gateway = null;
    network = null;
    contract = null;

    connect = async () => {
        try{
            // The gRPC client connection should be shared by all Gateway connections to this endpoint.
            const tlsRootCert = await fs.readFile(tlsCertPath);
            const client = await newGrpcConnection(tlsRootCert, peerEndpoint, peerHostAlias);

            this.gateway = connect({
                client,
                identity: await newIdentity(certDirectoryPath, mspId),
                signer: await newSigner(keyDirectoryPath),
                // Default timeouts for different gRPC calls
                evaluateOptions: () => ({ deadline: Date.now() + 5000 }),
                endorseOptions: () => ({ deadline: Date.now() + 15000 }),
                submitOptions: () => ({ deadline: Date.now() + 5000 }),
                commitStatusOptions: () => ({ deadline: Date.now() + 6000 }),
            });       
            this.network = this.gateway.getNetwork(channelName);
            this.contract = this.network.getContract(chaincodeName);        
        }catch(error){
            console.error('******** FAILED to connect to blockchain gateway:', error);
        }
    }

    invoke = async (transaction, ...args) => {
        try{
            const result = await this.contract.submitTransaction(transaction, ...args);
            return result
        }catch(error){
            console.log(error)
        }
    }
    
    query = async (transaction) => {
        try{
	    const resultBytes = await this.contract.evaluateTransaction(transaction);
	    const result = this.decode(resultBytes);
	    return result
        }catch(error){
            console.log(error)
        }
    }

    displayInputParameters = () => {
        console.log(`mspId:             ${mspId}`);
        console.log(`channelName:       ${channelName}`);
        console.log(`chaincodeName:     ${chaincodeName}`);
        console.log(`keyDirectoryPath:  ${keyDirectoryPath}`);
        console.log(`certDirectoryPath: ${certDirectoryPath}`);
        console.log(`tlsCertPath:       ${tlsCertPath}`);
        console.log(`peerEndpoint:      ${peerEndpoint}`);
        console.log(`peerHostAlias:     ${peerHostAlias}`);
    }

    decode = (bytes) => {
        const json_string = new TextDecoder().decode(bytes);
        const json = JSON.parse(json_string);
        return json;
    }
}

module.exports = new HFConnection();
