'use strict';

/**
 * Redis Utils API.
 * @param {RedisClient} redisClient
 * @returns {{deleteItem: *, getItem: *, setItem: *}}
 * @constructor
 */
function Cache(redisClient) {
  return {
    deleteItem : require('./methods/deleteItem.js')(redisClient),
    getItem    : require('./methods/deleteItem')(redisClient),
    setItem    : require('./methods/setItem')(redisClient)
  }
}

module.exports = Cache;
