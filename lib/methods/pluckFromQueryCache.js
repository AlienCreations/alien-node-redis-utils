'use strict';

const R                      = require('ramda'),
      setOrDeleteCacheBucket = require('./setOrDeleteCacheBucket');

const getItem = require('./getItem');

const pluckFromQueryCache = R.curry((redisClient, cacheKey, identifierProperty, item) => {
  return getItem(redisClient, cacheKey)
    .then(JSON.parse)
    .then(R.defaultTo([]))
    .then(R.reject(R.eqProps(identifierProperty, item)))
    .then(setOrDeleteCacheBucket(redisClient, cacheKey))
    .then(() => item)
    .catch(() => item);
});

module.exports = pluckFromQueryCache;
