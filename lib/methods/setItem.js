'use strict';

const R            = require('ramda'),
      promiseUtils = require('alien-node-q-utils'),
      Validator    = require('o-validator');

const ONE_HOUR_IN_SECONDS_TTL_DEFAULT = 60 * 60;

const isString       = R.is(String),
      isNumber       = R.is(Number),
      isObject       = R.is(Object),
      requiredString = Validator.required(isString),
      requiredNumber = Validator.required(isNumber),
      requiredObject = Validator.required(isObject);

const validateCacheKey = Validator.validateOrThrow({
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
const setItem = R.curry((redisClient, cacheKey, cacheExpire, data) => {

  validateCacheKey({
    cacheKey,
    cacheExpire,
    data
  });

  return new Promise((resolve, reject) => {
    redisClient.set(
      cacheKey,
      JSON.stringify(data),
      'EX',
      cacheExpire || ONE_HOUR_IN_SECONDS_TTL_DEFAULT,
      promiseUtils.rejectOnErrorOrResolve({
        resolve : () => resolve(data),
        reject
      })
    );
  });

});

module.exports = setItem;
