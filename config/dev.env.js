'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://gushenxing.f3322.net:9924"'
  BASE_API: '"http://192.168.3.8:3001"',
  LICENCE_API: '"http://192.168.3.244:5000"'
})
