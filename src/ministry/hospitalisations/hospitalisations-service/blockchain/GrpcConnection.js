const grpc = require('@grpc/grpc-js');
const { signers } = require('@hyperledger/fabric-gateway');
const crypto = require('crypto');

class GrpcConnection{
    newGrpcConnection = async (tlsRootCert, peerEndpoint, peerHostAlias) => {
        const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
        return new grpc.Client(peerEndpoint, tlsCredentials, {
            'grpc.ssl_target_name_override': peerHostAlias,
        });
    }

    newIdentity = async (credentials, mspId) => {
        return { mspId, credentials };
    }
    
    newSigner = async (privateKeyPem) => {
        const privateKey = crypto.createPrivateKey(privateKeyPem);
        return signers.newPrivateKeySigner(privateKey);
    }
}

module.exports = new GrpcConnection();