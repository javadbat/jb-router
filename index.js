/* */ 
(function(process) {
  'use strict';
  if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/Router.cjs.min');
  } else {
    module.exports = require('./dist/Router.cjs.min');
  }
})(require('process'));
