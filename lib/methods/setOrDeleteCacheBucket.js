'use strict';

const R = require('ramda');

const deleteItem = require('./deleteItem'),
      setItem    = require('./setItem');

const setOrDeleteCacheBucket = R.curry((redisClient, cacheKey, cacheExpire, items) => {
  if (R.isEmpty(items)) {
    return deleteItem(redisClient, cacheKey).then(() => null);
  } else {
    return setItem(redisClient, cacheKey, cacheExpire, items);
  }
});

module.exports = setOrDeleteCacheBucket;
