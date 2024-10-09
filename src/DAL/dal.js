const mapper = require('./mapper');

class DAL {
  static async saveEntity(entity) {
    return await mapper.put({ item: entity });
  }

  async getEntity(entityClass, key) {
    return await mapper.get(Object.assign(new entityClass(), key));
  }

  static async getById(userId, entityType, entityId) {
    return await mapper.get({ PK: userId, SK: `${entityType}#${entityId}` });
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