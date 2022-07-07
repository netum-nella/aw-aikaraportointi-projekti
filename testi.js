// UUSI KOODI
import "dotenv/config";
import pkg from "pg";
import AWS from "aws-sdk";
import { SubscribeCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./snsClient.js";
const { Client } = pkg;
await connectDB();

async function connectDB() {
  const client = new Client({
    connectionString: process.env.DB_CONNECTIONSTRING,
  });
  await client.connect();
  const res = await client.query("SELECT * FROM tyoajat");
  const res2 = await client.query(
    "SELECT SUM(lopetusaika - aloitusaika) työaika FROM tyoajat GROUP BY projekti ORDER BY projekti"
  );
  const tiedot = [res.rows, res2.rows];
  console.log(res.rows[0]["aloitusaika"]);
  //   const tiedot = [res.rows, res2.rows];
  //sendToSnsTopic(res.rows);
  // sendToSnsTopic(res2.rows);
  sendToSnsTopic(tiedot);
  await client.end();
}

async function sendToSnsTopic(tiedot) {
  AWS.config.update({ region: "eu-west-2" });
  const params = {
    Message: tiedot,
    TopicArn: "aws:sns:eu-west-2:235920682125:TuntiJ",
  };
  const publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();
  publishTextPromise
    .then(function (data) {
      console.log(
        `Message ${params.Message} sent to the topic ${params.TopicArn}`
      );
      console.log("MessageID is " + data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
}

const now = new Date();
const millisTill19 =
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0, 0) - now;
if (millisTill19 < 0) {
  millisTill19 += 86400000; // it's after 19, try 19 tomorrow.
}
setTimeout(function () {
  alert(sendToSnsTopic());
}, millisTill19);
// let query = "SELECT SUM(lopetusaika - aloitusaika) AS total_tyoajat FROM tyoajat";

// db_con.query(query, (err, rows) => {
//   if (err) throw err;

//   console.log(rows);
// });

//SUBSCRIBE AN EMAIL ADDRESS TO AN AMAZON SNS TOPIC USING AN AMAZON SDK
//Create the client in a separate module and export it.
//Import the SDK and client modules and call the API.
// Import required AWS SDK clients and commands for Node.js

// Set the parameters
const params = {
  Protocol: "email" /* required */,
  TopicArn: "aws:sns:eu-west-2:235920682125:TuntiJ", //TOPIC_ARN
  Endpoint: "razan.askar@awacademy.training", //EMAIL_ADDRESS
};

const run = async () => {
  try {
    const data = await snsClient.send(new SubscribeCommand(params));
    console.log("Success.", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err.stack);
  }
};
run();



//await raportti(client);

async function raportti(client) {
    const res = await client.query("SELECT workhours.starttime, workhours.endtime, workhours.sum");
    res.rows.forEach((workhours) => console.log(workhours));