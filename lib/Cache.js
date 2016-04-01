'use strict';

/**
 * Redis Utils API.
 * @param {RedisClient} redisClient
 * @returns {{deleteItem: *, getItem: *, setItem: *, keys: *, maybeAddToQueryCache: *, pluckFromQueryCache: *, setOrDeleteCacheBucket: *}}
 * @constructor
 */
function Cache(redisClient) {
  return {
    deleteItem             : require('./methods/deleteItem')(redisClient),
    getItem                : require('./methods/getItem')(redisClient),
    setItem                : require('./methods/setItem')(redisClient),
    keys                   : require('./methods/keys')(redisClient),
    maybeAddToQueryCache   : require('./methods/maybeAddToQueryCache')(redisClient),
    pluckFromQueryCache    : require('./methods/pluckFromQueryCache')(redisClient),
    setOrDeleteCacheBucket : require('./methods/setOrDeleteCacheBucket')(redisClient)
  }
}

module.exports = Cache;
