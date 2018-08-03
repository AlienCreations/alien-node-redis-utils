'use strict';

const setItem         = require('../lib/methods/setItem'),
      constants       = require('./helpers/_constants'),
      mockRedisClient = require('./helpers/_mockRedisClient');

const FAKE_DATA           = { foo : 'bar' },
      FAKE_DATA_INVALID   = 'foo',
      FAKE_TTL_IN_SECONDS = 30,
      FAKE_TTL_INVALID    = '30';

describe('setItem', () => {

  it('sets data on a key and resolve data', done => {
    setItem(mockRedisClient, constants.FAKE_CACHE_KEY_EXISTS, FAKE_TTL_IN_SECONDS, FAKE_DATA)
      .then(item => {
        expect(item).toBe(FAKE_DATA);
        done();
      });
  });

  it('sets data on a key and resolve data when given no cacheExpire', done => {
    setItem(mockRedisClient, constants.FAKE_CACHE_KEY_EXISTS, 0, FAKE_DATA)
      .then(item => {
        expect(item).toBe(FAKE_DATA);
        done();
      });
  });

  it('throws an error when given a cacheKey of type other than String', () => {
    expect(() => {
      setItem(mockRedisClient, constants.FAKE_CACHE_KEY_INVALID, FAKE_TTL_IN_SECONDS, FAKE_DATA);
    }).toThrow(new Error('Illegal value for parameter: cacheKey'))
  });

  it('throws an error when given a ttl of type other than Number', () => {
    expect(() => {
      setItem(mockRedisClient, constants.FAKE_CACHE_KEY_EXISTS, FAKE_TTL_INVALID, FAKE_DATA);
    }).toThrow(new Error('Illegal value for parameter: cacheExpire'))
  });

  it('throws an error when given data of type other than Object', () => {
    expect(() => {
      setItem(mockRedisClient, constants.FAKE_CACHE_KEY_EXISTS, FAKE_TTL_IN_SECONDS, FAKE_DATA_INVALID);
    }).toThrow(new Error('Illegal value for parameter: data'))
  });
});
