# sea.js的介绍
## 为什么用sea.js
假设一个页面同时引入三个js
```
<scrpit type="text/javascript" src="a.js"></script>
<scrpit type="text/javascript" src="b.js"></script>
<scrpit type="text/javascript" src="c.js"></script>

```
- a.js
```javascript
function a(){
    console.log(1)
}
function b(){
  console.log(2)
}
```
- b.js
```javascript
function b(){
  console.log(3)
}
```

- c.js
```javascript
function c(){
  console.log(4)
}
a();
b();
```

这样有两个问题:

1.在c.js里面调用b(),其实b函数是b.js里的而非a.js里的b.js,即*命名冲突*

2.如果在别的页面只引入c.js就会报错,因为没有a,b函数,即*依赖管理*

YUI为了解决这两个问题采用了局部命名和依赖管理的配置,但是依赖复杂的时候有很多隐患,于是sea.js登场
```
YUI.add('my-module', function (Y) {
  // ...
}, '0.0.1', {
    requires: ['node', 'event']
});
```
##模块和系统是啥
> 系统泛指由一群有关连的个体组成，根据预先编排好的规则工作，能完成个别元件不能单独完成的工作的群体。
******也就是确定系统需要知道两个问题:
1.成员是什么
2.成员之间交互的规则是什么

>在前端开发领域，一个模块，可以是JS 模块，也可以是 CSS 模块，或是 Template 等模块。在 Sea.js 里，我们专注于 JS 模块（其他类型的模块可以转换为 JS 模块）

> Sea.js 是一个适用于 Web 浏览器端的模块加载器。在 Sea.js 里，一切皆是模块，所有模块协同构建成模块系统。成员是模块,通信规则是一段有统一书写样式的js代码.sea.js里,专注于js模块

##获取sea.js
1.seajs版本的git地址 https://github.com/seajs/seajs

2.git clone https://github.com/seajs/seajs/archive/master.zip

3.官网推荐spm安装 
`
 $ npm install spm -g
 $ spm install seajs
`

##sea.js的开发原理
>使用SeaJS开发JavaScript的基本原则就是：一切皆为模块。模块的概念有点类似于面向对象中的类——模块可以拥有数据和方法，数据和方法可以定义为公共或私有，公共数据和方法可以供别的模块调用。一个模块对应一个js文件.


## seajs常用API概览

* seajs.config 用来对 Sea.js 进行配置。
* seajs.use 用来在页面中加载一个或多个模块。
* define 用来定义模块。 
* require 用来获取指定模块的接口。
* require.async 用来在模块内部异步加载一个或多个模块。
* exports 用来在模块内部对外提供接口。
* module.exports 用来在模块内部对外提供接口。


## sea.js的seajs.config
seajs.config是对全局进行配置，配置项有下面几种。
```
base    在解析顶级标识时，会相对 base 路径来解析。
alias   当模块标识很长时，可以使用 alias 来简化。
charset 表示下载js时script标签的charset属性。
timeout 表示下载文件的最大时长，以毫秒为单位。
debug   表示是否工作在调试模式下。

这几个都是很常用的配置，举个例子如下

seajs.config({
    base: 'path/to/js/',
    alias: {
      'jquery': 'jquery.js'
    },
    charset: 'utf-8',
    timeout: 20000,
    debug: false
});

base用来指定根路径，可以指定为绝对路径或者相对路径。
譬如使用require("a") 则加载文件path/to/js/a.js

debug:可用的有三种 0|1|2
0： 普通状态，你就当啥也没发生
1： 调试状态，combo 会失效，其他和 0 的时候一样
2： 无缓存状态，所有请求都会自动在后面添加一个时间戳，其他和 1 的时候一样

比较不常用的：

map方法，可将某个文件映射到另一个。可用于在线调试，非常方便。
map: [
    ['.css', '.css?v=' + version],
    ['.js', '.js?v=' + version]
]

preload方法

```

## seajs.use()方法
```
seajs.use主要用于载入入口模块。入口模块相当于C程序的main函数，同时也是整个模块依赖树的根。
seajs.use用法如下：

//单一模式
seajs.use('./a');

//回调模式
seajs.use('./a', function(a) {
  a.run();
});

//多模块模式
seajs.use(['./a', './b'], function(a, b) {
  a.run();
  b.run();
});
一般seajs.use只用在页面载入入口模块，SeaJS会顺着入口模块解析所有依赖模块并将它们加载。如果入口模块只有一个，也可以通过给引入sea.js的script标签加入”data-main”属性来省略seajs.use，如下所示。

<script src="./sea.js" data-main="./init"></script>

这种写法会令html更加简洁。
```

## define()
```
define(factory) 
是一个全局函数，用来定义模块。

接收一个参数 可以使对象 可以使字符串 也可以使函数


接收两个以上参数 
define(id?, deps?, factory)
字符串 id 表示模块标识，数组 deps 是模块依赖。

如果只有一个参数，则赋值给factory。
如果有两个参数，第二个赋值给factory；第一个如果是array则赋值给deps，否则赋值给id。
如果有三个参数，则分别赋值给id，deps和factory。
`
主要来看工厂函数factory解析

工厂函数是模块的主体和重点。在只传递一个参数给define时（推荐写法），这个参数就是工厂函数，此时工厂函数的三个参数分别是：
`
require——模块加载函数，用于记载依赖模块。

require加载机制，在后面做统一讨论。

exports——接口点，将数据或方法定义在其上则将其暴露给外部调用。
module——模块的元数据。
这三个参数可以根据需要选择是否需要显示指定。

exports:
exports 是一个对象，用来向外提供模块接口。
除了给 exports 对象增加成员，还可以使用 return 直接向外提供接口。

seajs对外提供

module是一个对象，存储了模块的元信息，具体如下：

module.id——模块的ID。
module.dependencies——一个数组，存储了此模块依赖的所有模块的ID列表。
module.exports——与exports指向同一个对象。
```

## require.async
SeaJS会在html页面打开时通过静态分析一次性记载所有需要的js文件，如果想要某个js文件在用到时才下载，可以使用require.async：

```
require.async('/path/to/module/file', function(m) {
    //code of callback...
});
```
这样只有在用到这个模块时，对应的js文件才会被下载，也就实现了JavaScript代码的按需加载。


## 编写自己的一个cmd模块

define函数定义一个模块,factory可以接受三个参数,require,exports,module
```
require——模块加载函数，用于记载依赖模块。
exports——接口点，将数据或方法定义在其上则将其暴露给外部调用。
module——模块的元数据。
```
exports 仅仅是 module.exports 的一个引用。在factory内部给exports重新赋值并不会改变module.exports的值。因此给exports赋值是无效的，不能用来更改模块接口。

对 module.exports 的赋值需要同步执行，不能放在回调函数里。

require 是一个方法，接受 模块标识 作为唯一参数

使用模块系统内部的路径解析机制来解析并返回模块路径。该函数不会加载模块，只返回解析后的绝对路径。

require书写约定

* 正确拼写 模块 factory 构造方法的第一个参数 必须 命名为 require 。
* 不要修改 不要重命名 require 函数，或在任何作用域中给 require 重新赋值。
* 使用直接量 require 的参数值 必须 是字符串直接量。
* 可以把require看成语法关键字就行。

#### 关于模块的几种写法
1.教科书式的写法，也是最常用的一种写法。
```javascript
define(function(require,exports,module){
  var a = require('a'); // 引入a模块
  var b = require('b'); // 引入b模块
  var data1 = 1;// 私有数据
  var fun1 = function(){
    return a.run(data1);
  } // 私有方法
  exports.data2 = 2; // 公共数据
  exports.fun2 = function(){
    return "hello";
  }// 公共方法

})
```

2.抛弃exports和module的方式
```javascript
define(function(require){
  var a = require('a'); // 引入a模块
  var b = require('b'); // 引入b模块
  var data1 = 1;// 私有数据
  var fun1 = function(){
    return a.run(data1);
  } // 私有方法
  return {
    data2:2,
    fun2:function(){
    return 'hello';
  }
  }
})
```
3.类似于json的写法,其实就是没有方法的一种写法
```javascript
define({
  data:1,
  func:function(){
    return 'hello';
  }
})
```

## 改造现有文件成为cmd
如何改造现有文件为 CMD 模块

改造主流模块

这里指的是 jQuery、Moment、Backbone、underscore 等业界主流模块，这些模块一般都有对 AMD 和 CommonJS 的支持代码，例如 jQuery 源文件的最后几行：
```
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = jQuery;
} else {
    window.jQuery = window.$ = jQuery;

    if ( typeof define === "function" && define.amd ) {
        define( "jquery", [], function () { return jQuery; } );
    }
}

```
还有 Backbone 里：
```
var Backbone;
if (typeof exports !== 'undefined') {
  Backbone = exports;
} else {
  Backbone = root.Backbone = {};
}
```
对于有这些兼容代码的，只需要去掉 define.amd 的支持，或是直接包装上 define 就可以了。
```
define(function(require, exports, module) {
  // code here ...
})

```
如果没有模块化的兼容代码，有时候需要手动引入依赖，以及暴露对应的接口。

```
define(function(require, exports, module) {
  var $ = require('$');
  // code here ...
  module.exports = Placeholders;
});
```
可以参考 cmdjs/gallery 里的 Gruntfile 对这些主流模块的代码替换方式。

现有的 JS 文件

对于一些现有的普通 JS 文件，相对简单的多，参考 CMD 的书写规范，把那些暴露到全局命名空间的接口用 CMD 的方式进行改造就可以了。

比如现有文件 util.js 。
```
window.util = window.util || {};
util.addClass = function() {
  window.css();
};
util.queryString = function() {};
```
改为
```
define(function(require,exports,module){
// 引入依赖
  var css = require("css");
  util.addClass = function() {
    css();
  };
  util.queryString = function() {};
  // 暴露对应接口
  module.exports = util;
})
```
这里不啰嗦，就是基本的 CMD 书写规范。实际的改造过程中，情况可以比上面的例子要复杂一些，具体情况具体解决就行。

改造 jQuery 插件

这也是一个经常遇到的问题，我们推荐以下的包装方式：
```
// jquery-plugin-abc
define(function(require, exports, module) {
  var $ = require('$');
  // 插件的代码
  $.fn.abc = function() {};
});
```
这样的改造方式实际上是强化了原有的 $ 对象（而不是重新包装出一个新的 $），在实际调用时，可以用下面的方式：
```
seajs.use(['$', 'jquery-plugin-abc'], function($) {
  // $ 有了 jquery-plugin-abc 所提供的插件功能
  $.abc();
});
```
更多 jQuery 插件的包装，可以参考 cmdjs/jquery 里的做法。

实在是无法写出比官网还好的教程了，摘自[https://github.com/seajs/seajs/issues/971](https://github.com/seajs/seajs/issues/971)


## seajs示例
整体的目录结构：

    ├── index.html
    ├── js
    │   ├── a.js
    │   ├── b.js
    │   └── c.js
    └── lib
        └── seajs
            └── seajs1.3.0.js


index.html
```
   <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>seajs demo</title>
    </head>
    <body>
        <script src="lib/seajs/seajs1.3.0.js"></script>

        <script>
            seajs.config({
                base:"./js/"
            })
            seajs.use(["a"],function(){
                console.log("a.js and b.js saved");
            })
        </script>
    </body>
    </html>
```
a.js
```javascript
 define(function(require,exports,module){
        var b = require("b");

        console.log("a.js exec");

        console.log(module);
    })
```
b.js
```javascript
define(function(require,exports,module){
    var b = require("a");
    console.log("b.js exec");

    console.log(module);

    var c = require.async("c");

})
```
c.js
```javascript
define(function(require,exports,module){
    console.log("c.js exec");
    console.log(module);
})
```

## seajs的moduleId
相信大家现在已经能够用seajs完成一个项目了，但是此时的项目离正式上线还有很多差距，还需做很多优化，譬如，优化请求次数，优化文件大小。

当你使用seajs愉快的编码的时候，你也就会发现模块实在是太多了，请求数目过多这一问题。在这章，我们来共同探讨一下怎么优化seajs工程，使之真正可以达到可以上线的标准。

在进行优化以前，我们先讨论一下seajs里边的模块ID,还记得前面说过CMD的模块定义吗？define(id?deps?,factory),这里边的模块ID,官方建议我们不要写，通过工具去生成，那么你知道这个id是怎么生成的，通过什么规则呢？

这节我们就来看看这个module ID。

先看看我们会在哪里都会用到module ID。三个地方，
```
define(id[1],['id[2]'],function(require){
        var a = require("id"[3]);
})
```

无论是define第一个参数【模块ID】还是第二个参数【依赖模块的ID】还是【require模块ID】，最终的比对标准是【解析后的文件URI】。 因此，这三处需要写ID 的地方可以以任意一种方式来写，只要最终解析为同一个URI，即被认为是同一个模块。

Sea.js 的一个基本约定原则：*ID 和路径匹配原则*。

所谓 ID 和路径匹配原则 是指，使用 seajs.use 或 require 进行引用的文件，如果是具名模块（即定义了 ID 的模块），会把 ID 和 seajs.use 的路径名进行匹配，如果一致，则正确执行模块返回结果。反之，则返回 null。例如：
```
define('path/module/a',[],function(require){

})

在该例中，模块ID定义为了path/moudle/a,那么a模块应该正确放置的位置就base(在config中定义的)/path/moudle/a.js,假如a.js不在该位置，则返回了null。
```
至于为什么一定要使用一定要把 ID 定为文件路径，这一块请移步 [https://github.com/seajs/seajs/issues/930](https://github.com/seajs/seajs/issues/930)