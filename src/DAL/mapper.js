const AWS = require('aws-sdk');
const { DataMapper } = require('@aws/dynamodb-data-mapper');

const client = new DynamoDB();
const mapper = new DataMapper({ client });

module.exports = mapper;