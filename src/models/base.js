// models/session.js
const { DataMapper } = require('@aws/dynamodb-data-mapper');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const { attribute, hashKey, rangeKey, table } = require('@aws/dynamodb-data-mapper-annotations');

const client = new DynamoDB();
const mapper = new DataMapper({ client });

@table('tmunan-data')
class BaseEntity {
  @attribute()
  pk;

  @attribute()
  sk;

  @attribute()
  createdAt;

  @attribute()
  updatedAt;

  constructor(entityType) {
    this.entityType = entityType;
  }

  getSK() {
    return this.entityType;
  }
}

class BaseManyEntity extends BaseEntity {
  getSK() {
    const timestamp = new Date().toISOString();
    return `${this.entityType}#${timestamp}`;
  }
}

module.exports = { BaseEntity, BaseManyEntity };