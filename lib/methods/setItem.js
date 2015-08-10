'use strict';

var Q            = require('q'),
    R            = require('ramda'),
    Validator    = require('o-validator');

var ONE_HOUR_IN_SECONDS_TTL_DEFAULT = 1000 * 60 * 60;

var isString       = R.is(String),
    isNumber       = R.is(Number),
    isObject       = R.is(Object),
    requiredString = Validator.required(isString),
    requiredNumber = Validator.required(isNumber),
    requiredObject = Validator.required(isObject);

var validateCacheKey = Validator.validateOrThrow({
  cacheKey    : requiredString,
  cacheExpire : requiredNumber,
  data        : requiredObject
});

/**
 * Set an item to the redis store
 * @param {RedisClient} redisClient
 * @param {String} cacheKey
 * @param {Number} cacheExpire TTL in seconds
 * @param {Object} data        JSON.stringify-able object
 * @returns {Promise}
 */
var setItem = R.curry(function(redisClient, cacheKey, cacheExpire, data) {
  var deferred = Q.defer();
  
  validateCacheKey({
    cacheKey    : cacheKey,
    cacheExpire : cacheExpire,
    data        : data
  });

  redisClient.set(cacheKey, JSON.stringify(data));
  redisClient.expire(cacheKey, cacheExpire || ONE_HOUR_IN_SECONDS_TTL_DEFAULT);

  deferred.resolve(data);
  return deferred.promise;
});

module.exports = setItem;
