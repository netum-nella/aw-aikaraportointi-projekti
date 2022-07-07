// import "dotenv/config";
// import pkg from "pg";
// const { Client } = pkg;
// await connectDB();

// async function connectDB() {
//   const client = new Client({
//     connectionString: process.env.DB_CONNECTIONSTRING,
//   });
//   await client.connect();
//   //  console.log("Connected to DB");
//   //  return client;
//   //}

//   //Function to return hours of work for a given day
//   //   async function selectAllHours(client) {
//   const res = await client.query("SELECT * FROM Työajat");
//   //     res.rows.forEach((Työajat) => console.log(Työajat));
//   //   }
//   //   await selectAllHours(client);
//   sendToSnsTopic(res.rows);
//   await client.end();
// }

// // //CREATE SNS TOPIC
// // // Create promise and SNS service object
// // const createTopicPromise = new AWS.SNS({apiVersion: '2010-03-31'}).createTopic({Name: "TuntiJ"}).promise();

// // // Handle promise's fulfilled/rejected states
// // createTopicPromise.then(
// //   function(data) {
// //     console.log("Topic ARN is " + data.TopicArn);
// //   }).catch(
// //     function(err) {
// //     console.error(err, err.stack);
// //   });

// //PUBLISH TO SNS TOPIC
// //Load the AWS SDK for Node.js

// async function sendToSnsTopic(data, sum) {
//   const AWS = require("aws-sdk");
//   // Set region
//   AWS.config.update({ region: "eu-west-2" });

//   // Create publish parameters
//   const params = {
//     Message: data,
//     TopicArn: "aws:sns:eu-west-2:235920682125:TuntiJ",
//   };

//   // Create promise and SNS service object
//   const publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
//     .publish(params)
//     .promise();

//   // Handle promise's fulfilled/rejected states
//   publishTextPromise
//     .then(function (data) {
//       console.log(
//         `Message ${params.Message} sent to the topic ${params.TopicArn}`
//       );
//       console.log("MessageID is " + data.MessageId);
//     })
//     .catch(function (err) {
//       console.error(err, err.stack);
//     });
// }

// const now = new Date();
// const millisTill17 =
//   new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0, 0) - now;
// if (millisTill17 < 0) {
//   millisTill17 += 86400000; // it's after 17, try 17 tomorrow.
// }
// setTimeout(function () {
//   alert(sendToSnsTopic());
// }, millisTill17);
// // let query = "SELECT SUM(lopetusaika - aloitusaika) AS total_työajat FROM Työajat";

// // db_con.query(query, (err, rows) => {
// //   if (err) throw err;

// //   console.log(rows);
// // });

// //SUBSCRIBE AN EMAIL ADDRESS TO AN AMAZON SNS TOPIC USING AN AMAZON SDK
// //Create the client in a separate module and export it.
// import { SNSClient } from "@aws-sdk/client-sns";
// // Set the AWS Region.
// const REGION = "REGION"; //e.g. "us-east-1"
// // Create SNS service object.
// const snsClient = new SNSClient({ region: REGION });
// export { snsClient };

// //Import the SDK and client modules and call the API.
// // Import required AWS SDK clients and commands for Node.js
// import { SubscribeCommand } from "@aws-sdk/client-sns";
// import { snsClient } from "./libs/snsClient.js";

// // Set the parameters
// const params = {
//   Protocol: "email" /* required */,
//   TopicArn: "aws:sns:eu-west-2:235920682125:TuntiJ", //TOPIC_ARN
//   Endpoint: "razan.askar@awacademy.training", //EMAIL_ADDRESS
// };

// const run = async () => {
//   try {
//     const data = await snsClient.send(new SubscribeCommand(params));
//     console.log("Success.", data);
//     return data; // For unit tests.
//   } catch (err) {
//     console.log("Error", err.stack);
//   }
// };
// run();
