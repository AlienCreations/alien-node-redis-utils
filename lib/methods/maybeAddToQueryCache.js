'use strict';

var R = require('ramda'),
    Q = require('q');

var getItem = require('./getItem'),
    setItem = require('./setItem');

var SUPPORTED_LIST_ACTIONS = ['append', 'prepend'];

var ensureSupportedAction = R.curry(function(action, data) {
  if (!R.contains(action, SUPPORTED_LIST_ACTIONS)) {
    throw 'Unsupported action: ' + action + '. Please choose from the following supported actions: ' + SUPPORTED_LIST_ACTIONS.toString();
  }
  return data;
});

/**
 *
 * @param {RedisClient} redisClient
 * @param {String} action
 * @param {String} cacheKey
 * @param {Number} cacheExpire TTL in seconds
 * @param {Object} data        JSON.stringify-able object
 * @returns {*}
 */
var maybeAddToQueryCache = R.curry(function(redisClient, action, cacheKey, cacheExpire, data) {
  return Q(cacheKey)
    .then(getItem(redisClient))
    .then(JSON.parse)
    .then(ensureSupportedAction(action))
    .then(R[action](data))
    .then(setItem(redisClient, cacheKey, cacheExpire))
    .thenResolve(data)
    .catch(R.always(data));
});

module.exports = maybeAddToQueryCache;
