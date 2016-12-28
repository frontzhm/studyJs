define(function(require, exports, module) {
  var b = require('a');
  console.log('b.js exec');
  console.log(module);
  var c = require.async("c");
})
