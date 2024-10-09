const mapper = require('./mapper');

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
    console.log(key);
    return await mapper.get(Object.assign(e, key));
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