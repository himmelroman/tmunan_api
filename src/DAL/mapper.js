const { DataMapper } = require('@aws/dynamodb-data-mapper');
const DynamoDB = require('aws-sdk/clients/dynamodb');

const client = new DynamoDB();
const mapper = new DataMapper({ client });

module.exports = { mapper, client };