const grpc = require('@grpc/grpc-js');
const { signers } = require('@hyperledger/fabric-gateway');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs').promises;

class GrpcConnection{
    newGrpcConnection = async (tlsRootCert, peerEndpoint, peerHostAlias) => {
        const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
        return new grpc.Client(peerEndpoint, tlsCredentials, {
            'grpc.ssl_target_name_override': peerHostAlias,
        });
    }

    newIdentity = async (certDirectoryPath, mspId) => {
        const certPath = await getFirstDirFileName(certDirectoryPath);
        const credentials = await fs.readFile(certPath);
        return { mspId, credentials };
    }
    
    newSigner = async (keyDirectoryPath) => {
        const keyPath = await getFirstDirFileName(keyDirectoryPath);
        const privateKeyPem = await fs.readFile(keyPath);
        const privateKey = crypto.createPrivateKey(privateKeyPem);
        return signers.newPrivateKeySigner(privateKey);
    }
}

getFirstDirFileName = async (dirPath) => {
    const files = await fs.readdir(dirPath);
    return path.join(dirPath, files[0]);
}
module.exports = new GrpcConnection();