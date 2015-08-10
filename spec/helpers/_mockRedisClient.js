'use strict';

var constants = require('./_constants');

var _get = function(cacheKey, callback) {
  if (cacheKey === constants.FAKE_CACHE_KEY_EXISTS) {
    return callback(undefined, constants.FAKE_ITEM);
  } else {
    return callback(constants.FAKE_ERR, undefined);
  }
};

var _del = _get;

var _set = function(cacheKey, stringifiedData) {
  return cacheKey;
};

var _expire = function(cacheKey, ttl) {
  return cacheKey;
};

var mockRedisClient = {
  'get'     : _get,
  'del'     : _del,
  'set'     : _set,
  'expire'  : _expire
};

module.exports = mockRedisClient;
