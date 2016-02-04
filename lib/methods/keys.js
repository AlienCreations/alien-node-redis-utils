'use strict';

var Q            = require('q'),
    R            = require('ramda'),
    Validator    = require('o-validator'),
    promiseUtils = require('alien-node-q-utils');

var isString       = R.is(String),
    requiredString = Validator.required(isString);

var validateCacheKey = Validator.validateOrThrow({
  cacheKey : requiredString
});

/**
 * Get an item from the redis store
 * @param {RedisClient} redisClient
 * @param {String} cacheKey
 * @returns {Promise}
 */
var keys = R.curry(function(redisClient, cacheKey) {
  var deferred = Q.defer();

  validateCacheKey({ cacheKey : cacheKey });
  redisClient.keys(cacheKey, promiseUtils.rejectOnErrorOrNilElseResolve(deferred));

  return deferred.promise;
});

module.exports = keys;