const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const blockchain = require("./blockchain");
blockchain.connect();
const RabbitConnection = require("./config/amqplib");
RabbitConnection.connect();
const app = express();
const stringify = require('json-stringify-deterministic')
const sortKeysRecursive = require('sort-keys-recursive')
const crypto = require('crypto')

// configure express app
app.set("trust proxy", 1); // trust first proxy
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(helmet()); // add security measures
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
const logger = require("./utils/logger");

// Verification
app.post("/api/blockchain/verify", async (req, res) => {
  const { id, obj } = req.body;
  try {
    blockchain.contract = blockchain.network.getContract('handicap',"HashEntryContract");
    const blockchain_entry = await blockchain.query("GetOne", id)
    const string = stringify(sortKeysRecursive(obj))
    const hash = crypto.createHash('sha256').update(string, 'binary').digest('hex')
    console.log(`Comparing ${hash} and ${blockchain_entry.hash}, ==> ${hash == blockchain_entry.hash}`)
    if (blockchain_entry.hash != hash)
      return res.status(200).json({ integrite: -1, message: `Objet ${id} n'est pas intègre.` })
    else
      return res.status(200).json({ integrite: 1, message: `Objet ${id} est intègre.` })
  } catch (err) {
    logger.error(err);
    return res.status(200).json({ integrite: -1, message: `Objet ${id} n'est pas intègre.` })
  }
});

RabbitConnection.on("blockchain_insert", async (data) => {
  blockchain.contract = blockchain.network.getContract('handicap',"HashEntryContract");
  const { id, obj, author } = data
  const string = stringify(sortKeysRecursive(obj))
  const hash = crypto.createHash('sha256').update(string, 'binary').digest('hex')
  await blockchain.invoke("AddEntry", id, hash, author, new Date().toISOString())
});

RabbitConnection.on("CreateHandicap", async (data) => {
  blockchain.contract = blockchain.network.getContract('handicap',"HandicapEntryContract");
  await blockchain.invoke("AddEntry", String(data.id), data.NIN, data.code_handicap, data.doctor,"false","false" ,"0","0");
});

RabbitConnection.on("UpdateHandicapTravail", async (data) => {
  blockchain.contract = blockchain.network.getContract('handicap',"HandicapEntryContract");
  const blockchain_entry = await blockchain.query("GetOne", String(data.id))
  //const blockchain_entry = false;
  console.log(blockchain_entry);
  if (blockchain_entry) {
    await blockchain.invoke("AddEntry", String(data.id), blockchain_entry.NIN, blockchain_entry.code_handicap, blockchain_entry.doctor,"true",blockchain_entry.Solidarity ,new Date().toISOString(),blockchain_entry.TimestampSolidarity);
  }else{
    await blockchain.invoke("AddEntry", String(data.id), data.NIN, data.code_handicap, data.doctor,"true","false" ,new Date().toISOString(),"0");
  }
});

RabbitConnection.on("UpdateHandicapSolidarity", async (data) => {
  blockchain.contract = blockchain.network.getContract('handicap',"HandicapEntryContract");
  const blockchain_entry = await blockchain.query("GetOne", String(data.id));
  //const blockchain_entry = false;
  console.log(blockchain_entry);
  if(blockchain_entry){
    await blockchain.invoke("AddEntry", String(data.id), blockchain_entry.NIN, blockchain_entry.code_handicap, blockchain_entry.doctor,blockchain_entry.Travail,"true" ,blockchain_entry.TimestampTravail,new Date().toISOString());
  }else{
    await blockchain.invoke("AddEntry", String(data.id), data.NIN, data.code_handicap, data.doctor,"false","true" ,"0",new Date().toISOString());
  }
});


app.use((req, res) => res.sendStatus(404));

// graceful shutdown
process.on("SIGTERM", () =>
  app.close(() => {
    logger.info("Server shutdown.");
    database.db.end();
  })
);

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;
