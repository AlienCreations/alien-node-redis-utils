'use strict';

const constants = require('./_constants');

const _get = (cacheKey, callback) => {
  if (cacheKey === constants.FAKE_CACHE_KEY_EXISTS) {
    return callback(undefined, constants.FAKE_ITEM);
  } else {
    return callback(constants.FAKE_ERR, undefined);
  }
};

const _del = _get;

const _set = (cacheKey, stringifiedData) => cacheKey;

const _keys = (cacheKey, callback) => {
  if (cacheKey === constants.FAKE_CACHE_KEY_EXISTS) {
    return callback(undefined, [cacheKey]);
  } else {
    return callback(undefined, []);
  }
};

const mockRedisClient = {
  'get'    : _get,
  'del'    : _del,
  'set'    : _set,
  'keys'   : _keys
};

module.exports = mockRedisClient;
