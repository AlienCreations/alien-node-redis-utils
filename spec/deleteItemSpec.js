'use strict';

const deleteItem      = require('../lib/methods/deleteItem'),
      constants       = require('./helpers/_constants'),
      mockRedisClient = require('./helpers/_mockRedisClient');

describe('deleteItem', () => {

  it('should assume a recognized cache key will trigger a success callback from the RedisClient and resolve', done => {
    deleteItem(mockRedisClient, constants.FAKE_CACHE_KEY_EXISTS)
      .then(item => {
        expect(item).toBe(constants.FAKE_ITEM);
        done();
      });
  });

  it('should assume an unrecognized cache key will trigger an error callback from the RedisClient and reject', done => {
    deleteItem(mockRedisClient, constants.FAKE_CACHE_KEY_NOT_EXISTS)
      .catch(item => {
        expect(item).toBe(constants.FAKE_ERR);
        done();
      });
  });

  it('should throw an error when given a cacheKey of type other than String', () => {
    expect(() => {
      deleteItem(mockRedisClient, constants.FAKE_CACHE_KEY_INVALID);
    }).toThrow(new Error('Illegal value for parameter: cacheKey'));
  });

});
