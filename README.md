# alien-node-redis-utils
Helper functions for Redis cache on NodeJS. The functions are pure and curried with Ramda.

[![Build Status](https://travis-ci.org/AlienCreations/alien-node-redis-utils.svg?branch=master)](https://travis-ci.org/AlienCreations/alien-node-redis-utils) [![Coverage Status](https://coveralls.io/repos/AlienCreations/alien-node-redis-utils/badge.svg?branch=master&service=github)](https://coveralls.io/github/AlienCreations/alien-node-redis-utils?branch=master) [![npm version](http://img.shields.io/npm/v/alien-node-redis-utils.svg)](https://npmjs.org/package/alien-node-redis-utils) [![Dependency Status](https://david-dm.org/AlienCreations/alien-node-redis-utils.svg)](https://david-dm.org/AlienCreations/alien-node-redis-utils)

## Install

```
$ npm install alien-node-redis-utils --save
```

Run the specs

```
$ npm test
```

## Methods

#### getItem
Get an item from the Redis store, provided a recognized `cacheKey`

```js

var redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils');
    
cacheUtils.getItem(redisClient, 'someKey')
  .then(function(item) {
    // cool
  })
  .catch(function(err) {
    // no item found matching cacheKey
  });

```

#### setItem
Set an item in the Redis store. Adds if key does not exist, otherwise updates the cache.

```js

var redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils');
    
var TWO_HOURS_IN_SECONDS_CACHE_EXPIRE = 1000 * 60 * 60 * 2;

var cacheKey = 'someKey', 
    data     = { foo : 'bar' };
    
cacheUtils.setItem(redisClient, cacheKey, TWO_HOURS_IN_SECONDS_CACHE_EXPIRE, data);
  .then(function(data) {
    // cool
  });

```

#### deleteItem
Delete an item from the Redis store, provided a recognized `cacheKey`

```js

var redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils');

cacheUtils.deleteItem(redisClient, 'someKey')
  .then(function() {
    // cool
  })
  .catch(function(err) {
    // some err from redisClient
  });

```
