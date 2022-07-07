// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
// Set region
AWS.config.update({ region: "eu-west-2" });
//CREATE SNS TOPIC
// Create promise and SNS service object
const createTopicPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
  .createTopic({ Name: "TuntiJ" })
  .promise();

// Handle promise's fulfilled/rejected states
createTopicPromise
  .then(function (data) {
    console.log("Topic ARN is " + data.TopicArn);
  })
  .catch(function (err) {
    console.error(err, err.stack);
  });
