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
    cacheUtils  = require('alien-node-redis-utils')(redisClient);
    
cacheUtils.getItem('someKey')
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
    cacheUtils  = require('alien-node-redis-utils')(redisClient);
    
var TWO_HOURS_IN_SECONDS_CACHE_EXPIRE = 1000 * 60 * 60 * 2;

var cacheKey = 'someKey', 
    data     = { foo : 'bar' };
    
cacheUtils.setItem(cacheKey, TWO_HOURS_IN_SECONDS_CACHE_EXPIRE, data);
  .then(function(data) {
    // cool
  });

```

#### deleteItem
Delete an item from the Redis store, provided a recognized `cacheKey`

```js

var redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient);

cacheUtils.deleteItem('someKey')
  .then(function() {
    // cool
  })
  .catch(function(err) {
    // some err from redisClient
  });

```

## Helpers

#### maybeAddToQueryCache
Checks for an existing record matching `cacheKey` and appends/prepends `item`

```js

var User = require('/path/to/user/model'),
    data = {name : 'joe'};

var redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient);

var CACHE_KEY    = 'api.users',
    CACHE_EXPIRE = 1000 * 60 * 60 * 24;

return User.create(data).then(function(user) {
  return cacheUtils.maybeAddToQueryCache(CACHE_KEY, CACHE_EXPIRE, user);
});

```

#### pluckFromQueryCache
Checks for an existing record matching `cacheKey`, looks for an item matching a
 provided `identifierProperty`, removes the item and resets the cache.

```js

var User = require('/path/to/user/model'),
    data = {id : 123};

var redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient);

var CACHE_KEY   = 'api.users';

return User.delete(data)
  .thenResolve(data)
  .then(cacheUtils.pluckFromQueryCache(CACHE_KEY, 'id');

```


#### setOrDeleteCacheBucket
Checks for an existing record matching `cacheKey`, and sets it to `items` if `items` 
is a populated list. If `items` is falsy or an empty array, `cacheKey` will be deleted.

```js

// See internal usage from pluckFromQueryCache method: 

var pluckFromQueryCache = R.curry(function(redisClient, cacheKey, identifierProperty, item) {
  return getItem(redisClient, cacheKey)
    .then(JSON.parse)
    .then(R.defaultTo([]))
    .then(listUtils.filterOutObject(identifierProperty, R.prop(identifierProperty, item)))
    .then(setOrDeleteCacheBucket(redisClient, cacheKey))
    .thenResolve(item)
    .catch(R.always(item));
});


```
