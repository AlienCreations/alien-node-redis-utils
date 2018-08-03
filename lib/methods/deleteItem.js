'use strict';

const R            = require('ramda'),
      Validator    = require('o-validator'),
      promiseUtils = require('alien-node-q-utils');

const isString       = R.is(String),
      requiredString = Validator.required(isString);

const validateCacheKey = Validator.validateOrThrow({
  cacheKey : requiredString
});

/**
 * Delete an item from the redis store
 * @param {RedisClient} redisClient
 * @param {String} cacheKey
 * @returns {Promise}
 */
const deleteItem = R.curry((redisClient, cacheKey) => {
  validateCacheKey({ cacheKey });
  return new Promise((resolve, reject) => {
    redisClient.del(cacheKey, promiseUtils.rejectOnErrorOrResolve({ resolve, reject }));
  });
});

module.exports = deleteItem;
