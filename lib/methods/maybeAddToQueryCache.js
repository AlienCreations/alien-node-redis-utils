'use strict';

const R = require('ramda'),
      Q = require('q');

const getItem = require('./getItem'),
      setItem = require('./setItem');

const SUPPORTED_LIST_ACTIONS = ['append', 'prepend'];

const ensureSupportedAction = R.curry((action, data) => {
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
const maybeAddToQueryCache = R.curry((redisClient, action, cacheKey, cacheExpire, data) => {
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
