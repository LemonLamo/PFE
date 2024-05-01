const { TextDecoder } = require('util');
const { connect } = require('@hyperledger/fabric-gateway');
const { newGrpcConnection, newIdentity, newSigner } = require('./GrpcConnection');

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
            const client = await newGrpcConnection(Buffer.from(process.env.BLOCKCHAIN_PeerTLSCACert, 'utf8'), process.env.BLOCKCHAIN_PeerHostEndpoint, process.env.BLOCKCHAIN_PeerHostAlias);

            this.gateway = connect({
                client,
                identity: await newIdentity(Buffer.from(process.env.BLOCKCHAIN_UserPublicKey, 'utf8'), process.env.BLOCKCHAIN_MSPID),
                signer: await newSigner(Buffer.from(process.env.BLOCKCHAIN_UserSecretKey, 'utf8')),
                // Default timeouts for different gRPC calls
                evaluateOptions: () => ({ deadline: Date.now() + 5000 }),
                endorseOptions: () => ({ deadline: Date.now() + 15000 }),
                submitOptions: () => ({ deadline: Date.now() + 5000 }),
                commitStatusOptions: () => ({ deadline: Date.now() + 6000 }),
            });       
            this.network = this.gateway.getNetwork(channelName);
            this.contract = this.network.getContract(chaincodeName);
            this.displayInputParameters();
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
        console.log(`PeerHostEndpoint:  ${process.env.BLOCKCHAIN_PeerHostEndpoint}`);
        console.log(`PeerHostAlias:     ${process.env.BLOCKCHAIN_PeerHostAlias}`);
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
