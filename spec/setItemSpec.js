'use strict';

var R               = require('ramda'),
    setItem         = require('../lib/methods/setItem'),
    constants       = require('./helpers/_constants'),
    mockRedisClient = require('./helpers/_mockRedisClient');

var FAKE_DATA           = {foo : 'bar'},
    FAKE_DATA_INVALID   = 'foo',
    FAKE_TTL_IN_SECONDS = 30,
    FAKE_TTL_INVALID    = '30';

describe('setItem', function() {

  it('should set data on a key and resolve data', function(done) {
    setItem(mockRedisClient, constants.FAKE_CACHE_KEY_EXISTS, FAKE_TTL_IN_SECONDS, FAKE_DATA)
      .then(function(item) {
        expect(item).toBe(FAKE_DATA);
        done();
      });
  });

  it('should set data on a key and resolve data when given no cacheExpire', function(done) {
    setItem(mockRedisClient, constants.FAKE_CACHE_KEY_EXISTS, 0, FAKE_DATA)
      .then(function(item) {
        expect(item).toBe(FAKE_DATA);
        done();
      });
  });

  it('should throw an error when given a cacheKey of type other than String', function() {
    expect(function() {
      setItem(mockRedisClient, constants.FAKE_CACHE_KEY_INVALID, FAKE_TTL_IN_SECONDS, FAKE_DATA);
    }).toThrow(new Error('Illegal value for parameter: cacheKey'))
  });

  it('should throw an error when given a ttl of type other than Number', function() {
    expect(function() {
      setItem(mockRedisClient, constants.FAKE_CACHE_KEY_EXISTS, FAKE_TTL_INVALID, FAKE_DATA);
    }).toThrow(new Error('Illegal value for parameter: cacheExpire'))
  });

  it('should throw an error when given data of type other than Object', function() {
    expect(function() {
      setItem(mockRedisClient, constants.FAKE_CACHE_KEY_EXISTS, FAKE_TTL_IN_SECONDS, FAKE_DATA_INVALID);
    }).toThrow(new Error('Illegal value for parameter: data'))
  });
});
