'use strict';

var R                      = require('ramda'),
    listUtils              = require('alien-node-list-utils'),
    setOrDeleteCacheBucket = require('./setOrDeleteCacheBucket');

var getItem = require('./getItem');

var pluckFromQueryCache = R.curry(function(redisClient, cacheKey, identifierProperty, item) {
  return getItem(redisClient, cacheKey)
    .then(JSON.parse)
    .then(R.defaultTo([]))
    .then(listUtils.filterOutObject(identifierProperty, R.prop(identifierProperty, item)))
    .then(setOrDeleteCacheBucket(redisClient, cacheKey))
    .thenResolve(item)
    .catch(R.always(item));
});

module.exports = pluckFromQueryCache;
