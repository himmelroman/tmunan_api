const { mapper, client } = require('./mapper');
require('dotenv').config();

class DAL {
  static async saveEntity(entity) {
    return await mapper.put({ item: entity });
  }

  async getEntity(entityClass, key) {
    return await mapper.get(Object.assign(new entityClass(), key));
  }

  static async getById(userId, entityClass, entityId) {
    let e = new entityClass();

    const k = {
      PK: userId,
      SK: `${e.entityType}#${entityId}`
    };

    const key = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        PK: k.PK,
        SK: k.SK
      }
    };
    
    
    // e = Object.assign(e, key);

    // console.log("Entity before get:", e);
    // console.log("PK:", e.PK, typeof e.PK);
    // console.log("SK:", e.SK, typeof e.SK);
    
    try {
      return await client.getItem(key).promise();
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