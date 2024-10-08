// const { DataMapper } = require('@aws/dynamodb-data-mapper');
// const DynamoDB = require('aws-sdk/clients/dynamodb');
// const { Session, mapper } = require('./models/session');
require('dotenv').config();
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


// const client = new DynamoDB();
// const mapper = new DataMapper({ client });

async function testDb() {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          PK: 'user123',
          SK: 'session123',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour from now
          usageCount: 0
        }
      };

    // const session = new Session();
    // session.userId = 'user123';
    // session.sessionId = 'session123';
    // session.createdAt = new Date();
    // session.expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour from now
    // session.usageCount = 0;
  
    try {
        await dynamoDb.put(params).promise();
      // await mapper.put(session);
      console.log('Session inserted successfully:', params);
    } catch (error) {
        console.error('Error inserting session:', error);
        throw error;
    }
  }

module.exports = { testDb };