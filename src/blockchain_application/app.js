const blockchain = require("./blockchain");

async function main(){
    await blockchain.connect();
    console.log(await blockchain.query('GetAll'))
}

main()