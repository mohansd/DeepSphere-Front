'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://gushenxing.f3322.net:11088"'
  BASE_API: '"http://deepsphere.net:3001"'
})
