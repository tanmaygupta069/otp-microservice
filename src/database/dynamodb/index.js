const AWS = require("aws-sdk");
const { createServer } = require("dynamodb-admin");
const { dynamoDb } = require("../../config");

const dynamodb = new AWS.DynamoDB(dynamoDb);
const dynClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb });

const server = createServer(dynamodb, dynClient);
module.exports = server;
