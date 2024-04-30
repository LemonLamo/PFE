const { TextDecoder } = require('util');
const { connect } = require('@hyperledger/fabric-gateway');
const { newGrpcConnection, newIdentity, newSigner } = require('./GrpcConnection');

// Path to peer tls certificate.
const peerEndpoint = 'localhost:7051';
const peerHostAlias = 'peer0.hopital1.medicalife.com';

// Make sure these env variables are set.
// BLOCKCHAIN_MSPID = 'Hopita1MSP'
// BLOCKCHAIN_PeerHostAlias = 'peer0.hopital1.medicalife.com'
// BLOCKCHAIN_PeerTLSCACert
// BLOCKCHAIN_UserSecretKey
// BLOCKCHAIN_UserPublicKey

// Variables
const channelName = 'mychannel';
const chaincodeName = 'basic';

class HFConnection{
    gateway = null;
    network = null;
    contract = null;

    connect = async () => {
        try{
            // The gRPC client connection should be shared by all Gateway connections to this endpoint.
            const client = await newGrpcConnection(process.env.BLOCKCHAIN_PeerTLSCert, peerEndpoint, peerHostAlias);

            this.gateway = connect({
                client,
                identity: await newIdentity(process.env.BLOCKCHAIN_UserPublicKey, process.env.BLOCKCHAIN_MSPID),
                signer: await newSigner(process.env.BLOCKCHAIN_UserSecretKey),
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
        console.log(`MSPID:             ${process.env.BLOCKCHAIN_MSPID}`);
        console.log(`peerEndpoint:      ${peerEndpoint}`);
        console.log(`peerHostAlias:     ${peerHostAlias}`);
        console.log(`user:              Admin`);
        console.log(`channelName:       ${channelName}`);
        console.log(`chaincodeName:     ${chaincodeName}`);
    }

    decode = (bytes) => {
        const json_string = new TextDecoder().decode(bytes);
        const json = JSON.parse(json_string);
        return json;
    }
}

module.exports = new HFConnection();
