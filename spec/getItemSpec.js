'use strict';

var R               = require('ramda'),
    getItem         = require('../lib/methods/getItem'),
    constants       = require('./helpers/_constants'),
    mockRedisClient = require('./helpers/_mockRedisClient');

describe('getItem', function() {

  it('should assume a recognized cache key will trigger a success callback from the RedisClient and resolve', function(done) {
    getItem(mockRedisClient, constants.FAKE_CACHE_KEY_EXISTS)
      .then(function(item) {
        expect(item).toBe(constants.FAKE_ITEM);
        done();
      });
  });

  it('should assume an unrecognized cache key will trigger an error callback from the RedisClient and reject', function(done) {
    getItem(mockRedisClient, constants.FAKE_CACHE_KEY_NOT_EXISTS)
      .catch(function(item) {
        expect(item).toBe(constants.FAKE_ERR);
        done();
      });
  });

  it('should throw an error when given a cacheKey of type other than String', function() {
    expect(function(){
      getItem(mockRedisClient, constants.FAKE_CACHE_KEY_INVALID);
    }).toThrow(new Error('Illegal value for parameter: cacheKey'));
  });

});
