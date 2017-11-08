'use strict';

const keys            = require('../lib/methods/keys'),
    constants       = require('./helpers/_constants'),
    mockRedisClient = require('./helpers/_mockRedisClient');

describe('keys', function() {

  it('should accept a known key and return all recognized cache keys and resolve with an array containing the key', function(done) {
    keys(mockRedisClient, constants.FAKE_CACHE_KEY_EXISTS)
      .then(function(res) {
        expect(res).toEqual([constants.FAKE_CACHE_KEY_EXISTS]);
        done();
      });
  });

  it('should accept an unknown key and return an empty array', function(done) {
    keys(mockRedisClient, constants.FAKE_CACHE_KEY_NOT_EXISTS)
      .then(function(item) {
        expect(item).toEqual([]);
        done();
      });
  });

  it('should throw an error when given a cacheKey of type other than String', function() {
    expect(function(){
      keys(mockRedisClient, constants.FAKE_CACHE_KEY_INVALID);
    }).toThrow(new Error('Illegal value for parameter: cacheKey'));
  });

});
