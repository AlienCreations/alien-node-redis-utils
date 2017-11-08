'use strict';

const R                      = require('ramda'),
      listUtils              = require('alien-node-list-utils'),
      setOrDeleteCacheBucket = require('./setOrDeleteCacheBucket');

const getItem = require('./getItem');

const pluckFromQueryCache = R.curry((redisClient, cacheKey, identifierProperty, item) => {
  return getItem(redisClient, cacheKey)
    .then(JSON.parse)
    .then(R.defaultTo([]))
    .then(listUtils.filterOutObject(identifierProperty, R.prop(identifierProperty, item)))
    .then(setOrDeleteCacheBucket(redisClient, cacheKey))
    .thenResolve(item)
    .catch(R.always(item));
});

module.exports = pluckFromQueryCache;
