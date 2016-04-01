'use strict';

var R = require('ramda');

var deleteItem = require('./deleteItem'),
    setItem    = require('./setItem');

var setOrDeleteCacheBucket = R.curry(function(redisClient, cacheKey, cacheExpire, items) {
  if (R.isEmpty(items)) {
    return deleteItem(redisClient, cacheKey)
      .thenResolve(null);
  } else {
    return setItem(redisClient, cacheKey, cacheExpire, items)
  }
});

module.exports = setOrDeleteCacheBucket;
