'use strict';

const Q            = require('q'),
      R            = require('ramda'),
      Validator    = require('o-validator'),
      promiseUtils = require('alien-node-q-utils');

const isString       = R.is(String),
      requiredString = Validator.required(isString);

const validateCacheKey = Validator.validateOrThrow({
  cacheKey : requiredString
});

/**
 * Get an item from the redis store
 * @param {RedisClient} redisClient
 * @param {String} cacheKey
 * @returns {Promise}
 */
const keys = R.curry((redisClient, cacheKey) => {
  const deferred = Q.defer();

  validateCacheKey({ cacheKey });
  redisClient.keys(cacheKey, promiseUtils.rejectOnErrorOrNilElseResolve(deferred));

  return deferred.promise;
});

module.exports = keys;
