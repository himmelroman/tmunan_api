const { mapper } = require('./mapper');
require('dotenv').config();
const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient();

class DAL {
  static async saveEntity(entity) {
    return await mapper.put({ item: entity });
  }

  async getEntity(entityClass, key) {
    return await mapper.get(Object.assign(new entityClass(), key));
  }

  static async getById(userId, entityClass, entityId) {
    let e = new entityClass();

    const key = {
      PK: userId,
      SK: `${e.entityType}#${entityId}`
    };

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: key
    };

    
    
    
    // e = Object.assign(e, key);

    console.log("Entity before get:", params);
    console.log("PK:", params.Key.PK, typeof params.Key.PK);
    console.log("SK:", params.Key.SK, typeof params.Key.SK);
    
    try {
      const data = await client.get(params).promise();
      if (data.Item) {
        console.log('Item retrieved:', data.Item);
        return data.Item;
      } else {
        console.log('No item found with the provided key.');
        return null;
      }
      // return await mapper.get(e);
    } catch (error) {
      console.log(error.__type);
      console.error('Error getting entity by ID:', error);
      throw error;
    }
  }

  async deleteEntity(entity) {
    return await mapper.delete({ item: entity });
  }

  async queryEntities(entityClass, keyCondition) {
    const results = [];
    for await (const item of mapper.query(entityClass, keyCondition)) {
      results.push(item);
    }
    return results;
  }
}

module.exports = DAL;