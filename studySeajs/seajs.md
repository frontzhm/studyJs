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


## seajs模块的module_id解析
sea.js中的模块标识是Commonjs模块标识的超集:
* 一个模块标识由斜线（/）分隔的多项组成。
* 每一项必须是小驼峰字符串、 . 或 .. 。
* 模块标识可以不包含文件后缀名，比如 .js 。
* 模块标识可以是 相对 或 顶级 标识。如果第一项是 . 或..，则该模块标识是相对标识。
* 顶级标识根据模块系统的基础路径来解析。
* 相对标识相对 require 所在模块的路径来解析。

seajs模块的module_id解析分为相对标识,顶级标识,普通路径(绝对路径和根路径)
>相对标识:以.开头,只出现在define的factory方法里(模块环境中),相对于当前模块的uri来解析

```
// 在 http://example.com/js/a.js 的 factory 中：
require.resolve('./b');
  // => http://example.com/js/b.js

// 在 http://example.com/js/a.js 的 factory 中：
require.resolve('../c');
  // => http://example.com/c.js
```

>顶级标识:不以.或/开始,会相对seajs的base路径(模块系统的基础路径)来解析

```
// 假设 base 路径是：http://example.com/assets/

// 在模块代码里：
require.resolve('gallery/jquery/1.9.1/jquery');
  // => http://example.com/assets/gallery/jquery/1.9.1/jquery.js
```

>模块系统的基础路径:base的值,如果不设置就是base的默认值,默认值与seajs的访问路径有关

```
如果 sea.js 的访问路径是：
  http://example.com/assets/sea.js

则 base 路径为：
  http://example.com/assets/
当 sea.js 的访问路径中含有版本号时，base 不会包含 seajs/x.y.z 字串。 当 sea.js 有多个版本时，这样会很方便。

如果 sea.js 的路径是：
  http://example.com/assets/seajs/1.0.0/sea.js

则 base 路径是：
  http://example.com/assets/
当然，也可以手工配置 base 路径：

seajs.config({
  base: 'http://code.jquery.com/'
});

// 在模块代码里：
require.resolve('jquery');
  // => http://code.jquery.com/jquery.js
```


>普通路径:会相对当前页面解析。分为绝对路径(就是拧出来都可以)和根路径(目录根路径+路径)

```
// 假设当前页面是 http://example.com/path/to/page/index.html

// 绝对路径是普通路径：
require.resolve('http://cdn.com/js/a');
  // => http://cdn.com/js/a.js

// 根路径是普通路径：
require.resolve('/js/b');
  // => http://example.com/js/b.js

// use 中的相对路径始终是普通路径：
seajs.use('./c');
  // => 加载的是 http://example.com/path/to/page/c.js

seajs.use('../d');
  // => 加载的是 http://example.com/path/to/d.js
```
注意:
Sea.js 在解析模块标识时， 除非在路径中有问号（?）或最后一个字符是井号（#），否则都会自动添加 JS 扩展名（.js）。如果不想自动添加扩展名，可以在路径末尾加上井号（#）。

```
// ".js" 后缀可以省略：
require.resolve('http://example.com/js/a');
require.resolve('http://example.com/js/a.js');
  // => http://example.com/js/a.js

// ".css" 后缀不可省略：
require.resolve('http://example.com/css/a.css');
  // => http://example.com/css/a.css

// 当路径中有问号（"?"）时，不会自动添加后缀：
require.resolve('http://example.com/js/a.json?callback=define');
  // => http://example.com/js/a.json?callback=define

// 当路径以井号（"#"）结尾时，不会自动添加后缀，且在解析时，会自动去掉井号：
require.resolve('http://example.com/js/a.json#');
  // => http://example.com/js/a.json
```

总结: ./ ../   模块的相对标识(相对路径), /(根路径) 和 http://(绝对路径) 是页面的普通路径,除了前面的就是绝对标识(base)


## seajs的模块加载过程
模块加载的整体思路:
1.从seajs.use方法入口，开始加载use到的模块。
2.use到的模块这时mod缓存当中一定是不存在的。seajs创建一个新的mod,赋予一些初始的状态。
3.执行mod.load方法
4.一堆逻辑之后走到seajs.request方法，请求模块文件。模块加载完成之后，执行define方法
5.define方法分析提取模块的依赖模块，保存起来。缓存factory但不执行。
6.模块的依赖模块再被加载，如果继续有依赖模块，则继续加载。直至所有被依赖的模块都加载完毕
7.所有的模块加载完毕之后，执行use方法的callback.
8.模块内部逻辑从callback开始执行。require方法在这个过程当中才被执行。

####1.1 从线团的线头抓起,从use说起
seajs.use方法有两个参数,第一个参数是要加载的模块,第二个是加载完模块后的回调函数（可选）

其中要加载的模块，可以为一个字符串，也可以为一个数组。

譬如：
```
seajs.use("a",function(){})

seajs.use(['a','b'],function(){})
```

####1.2 看use里面做了什么

```
function preload(callback) {
    var preloadMods = config.preload.slice()
    config.preload = []
    preloadMods.length ? globalModule._use(preloadMods, callback) : callback()
}


// Public API
// ----------

var globalModule = new Module(util.pageUri, STATUS.COMPILED)

seajs.use = function(ids, callback) {
    // Loads preload modules before all other modules.
    preload(function() {
        globalModule._use(ids, callback)
    })

    // Chain
    return seajs
}

 这段代码里在遇到seajs.use时候先加载了在config中定义的preload的模块，再去加载use里边的需要加载的模块。
```
####2.下来我们再看 globalModule.use(ids, callback) 也就到了module.prototypeuse方法了。

```
Module.prototype._use = function(ids, callback) {
    util.isString(ids) && (ids = [ids])
    var uris = resolve(ids, this.uri)

    this._load(uris, function() {
        // Loads preload files introduced in modules before compiling.
        preload(function() {
            var args = util.map(uris, function(uri) {
                return uri ? cachedModules[uri]._compile() : null
            })

            if (callback) {
                callback.apply(null, args)
            }
        })
    })
}

先将单个ids转成数组,使用resolve获取到ids的uris,下来继续使用module.prototype._load()去加载模块，在加载完成后再去compile()分析模块，所有模块都加载了，再去执行use函数的callback方法。

```

####3. 分析module.prototype._load()

```
 Module.prototype._load = function(uris, callback) {

     //获取到还没有加载过的资源列表
    var unLoadedUris = util.filter(uris, function(uri) {
        return uri && (!cachedModules[uri] ||
            cachedModules[uri].status < STATUS.READY)
    })

    var length = unLoadedUris.length
    if (length === 0) {
        callback()
        return
    }

    var remain = length

    for (var i = 0; i < length; i++) {
        (function(uri) {
            var module = cachedModules[uri] ||
                (cachedModules[uri] = new Module(uri, STATUS.FETCHING))

            module.status >= STATUS.FETCHED ? onFetched() : fetch(uri, onFetched)

            function onFetched() {
                // cachedModules[uri] is changed in un-correspondence case
                module = cachedModules[uri]

                if (module.status >= STATUS.SAVED) {
                     //模块加载完成后，查看是否有其它依赖模块，有其它依赖模块则继续加载新的模块，所有的文件都加载完成后，执行回调函数
                    var deps = getPureDependencies(module)

                    if (deps.length) {
                        Module.prototype._load(deps, function() {
                            cb(module)
                        })
                    } else {
                        cb(module)
                    }
                }
                // Maybe failed to fetch successfully, such as 404 or non-module.
                // In these cases, just call cb function directly.
                else {

                    cb()
                }
            }

        })(unLoadedUris[i])
    }

    function cb(module) {
        (module || {}).status < STATUS.READY && (module.status = STATUS.READY)
            --remain === 0 && callback()
    }
}
```
####4.在这里看下如何分析依赖模块的 getPureDependencies(module)

在这里需要注意的是模块里边的循环调用处理。
```
 function getPureDependencies(module) {
    var uri = module.uri

     //循环调用的直接去除了,在加载

    return util.filter(module.dependencies, function(dep) {
        circularCheckStack = [uri]

        var isCircular = isCircularWaiting(cachedModules[dep])
        if (isCircular) {
            circularCheckStack.push(uri)
            printCircularLog(circularCheckStack)
        }

        return !isCircular
    })
}

function isCircularWaiting(module) {
    if (!module || module.status !== STATUS.SAVED) {
        return false
    }

    circularCheckStack.push(module.uri)
    var deps = module.dependencies

    if (deps.length) {
        if (isOverlap(deps, circularCheckStack)) {
            return true
        }

        for (var i = 0; i < deps.length; i++) {
            if (isCircularWaiting(cachedModules[deps[i]])) {
                return true
            }
        }
    }

    circularCheckStack.pop()
    return false
}

function printCircularLog(stack, type) {
    util.log('Found circular dependencies:', stack.join(' --> '), type)
}

function isOverlap(arrA, arrB) {
    var arrC = arrA.concat(arrB)
    return arrC.length > util.unique(arrC).length
}
```

再看看在模块定义define中都做了些什么？
```
Module._define = function(id, deps, factory) {
    var argsLength = arguments.length

    // define(factory)
    if (argsLength === 1) {
        factory = id
        id = undefined
    }
    // define(id || deps, factory)
    else if (argsLength === 2) {
        factory = deps
        deps = undefined

        // define(deps, factory)
        if (util.isArray(id)) {
            deps = id
            id = undefined
        }
    }

    // Parses dependencies.
    if (!util.isArray(deps) && util.isFunction(factory)) {
            //parseDependencies方法做的事情主要就是用一个正则表达式把函数体里面所有require(XXX)里面的XXX提取出来，这也就是这个函数依赖到的所有模块了。
        deps = util.parseDependencies(factory.toString())
    }

    var meta = {
        id: id,
        dependencies: deps,
        factory: factory
    }
    var derivedUri

    // Try to derive uri in IE6-9 for anonymous modules.
    if (document.attachEvent) {
        // Try to get the current script.
        var script = util.getCurrentScript()
        if (script) {
            derivedUri = util.unParseMap(util.getScriptAbsoluteSrc(script))
        }

        if (!derivedUri) {
            util.log('Failed to derive URI from interactive script for:',
                factory.toString(), 'warn')

            // NOTE: If the id-deriving methods above is failed, then falls back
            // to use onload event to get the uri.
        }
    }

    // Gets uri directly for specific module.
    var resolvedUri = id ? resolve(id) : derivedUri

    if (resolvedUri) {
        // For IE:
        // If the first module in a package is not the cachedModules[derivedUri]
        // self, it should assign to the correct module when found.
        if (resolvedUri === derivedUri) {
            var refModule = cachedModules[derivedUri]
            if (refModule && refModule.realUri &&
                refModule.status === STATUS.SAVED) {
                cachedModules[derivedUri] = null
            }
        }

        var module = Module._save(resolvedUri, meta)

        // For IE:
        // Assigns the first module in package to cachedModules[derivedUrl]
        if (derivedUri) {
            // cachedModules[derivedUri] may be undefined in combo case.
            if ((cachedModules[derivedUri] || {}).status === STATUS.FETCHING) {
                cachedModules[derivedUri] = module
                module.realUri = derivedUri
            }
        } else {
            firstModuleInPackage || (firstModuleInPackage = module)
        }
    } else {
        // Saves information for "memoizing" work in the onload event.
        anonymousModuleMeta = meta
    }
}


var REQUIRE_RE = /(?:^|[^.$])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g


 分析完deps之后,将模块定义存入缓存：
util.parseDependencies = function(code) {
    // Parse these `requires`:
    //   var a = require('a');
    //   someMethod(require('b'));
    //   require('c');
    //   ...
    // Doesn't parse:
    //   someInstance.require(...);
    var ret = [],
        match

     //去除注释
    code = removeComments(code)
    REQUIRE_RE.lastIndex = 0

    while ((match = REQUIRE_RE.exec(code))) {
        if (match[2]) {
            ret.push(match[2])
        }
    }

    return util.unique(ret)
}
```

下面说举几个例子说下：
```
index.html:

<script src="lib/seajs/seajs1.3.0.js"></script>

<script>
    seajs.config({
        base:"./js/"
    })
    seajs.use(["a"],function(){
        console.log("a.js and b.js saved");
    })
</script>

a.js:

define(function(require,exports,module){
    var b = require("b");

    console.log("a.js exec");

    console.log(module);
})

b.js:

define(function(require,exports,module){
    var b = require("a");

    console.log("b.js exec");

    console.log(module);

    var c = require.async("c");

})

c.js:

define(function(require,exports,module){
    console.log("c.js exec");
    console.log(module);    
})
```
执行结果如下：

上述例子seajs模块加载的逻辑，如下图：

a依赖b b依赖a和c c不依赖

尽管存在上述依赖，但是a，b，c，d模块download到浏览器端的顺序确是a，b，c而不是c,b,a，笨想一下后一种执行顺序也是不可能的，因为模块间的依赖只有download到浏览器端seajs才能进行分析。

概括一下整个加载的流程就是：

自顶向下的download，自底向上的反馈准备就绪。

如何做到的呢？

主要是Module中的几个属性发挥的作用，模块被download到浏览器端后，按照CMD规范，define函数会被执行，module.define会分析该模块的依赖，记录到dependencies属性中，define函数执行完毕，绑定在script标签上的onload事件会被触发，进而加载当前模块的依赖模块，也就是执行module.load函数，这是一个循环往复的过程。

假设d模块加载就绪，执行module.load时发现，d模块已无其他依赖，进而执行module.onload, 在module.onload中，通过waitings属性找到父模块，操作父模块的依赖计数remain，达到通知父模块的目的。

这是一个完美的反馈系统。

至此，模块加载过程就算是说完了。


##seajs的插件

Sea.js官方提供了7个插件，对Sea.js的功能进行了补充。

seajs-text：用来加载HTML或者模板文件；
seajs-style：提供了importStyle，动态地向页面中插入css；
seajs-combo：该插件提供了依赖combo的功能，能把多个依赖的模块uri combo，减少HTTP请求；
seajs-flush：该插件是对seajs-combo的补充，或者是大杀器，可以先hold住前面的模块请求，最后将请求的模块combo成一个url，一次加载hold住的模块；
seajs-debug：基本就是提供了这样一种功能，可以通过修改config，将线上文件proxy到本地服务器，便于线上开发调试和排错；
seajs-log：提供一个seajs.log API，觉得比较鸡肋；
seajs-health：目标功能是，分析当前网页的模块健康情况。

## seajs的调试工具
Sea.JS 开发过程中有哪些调试技巧?

seajs.cache：用Chrome访问使用Seajs的站点，打开Console，输入seajs.cache，可以看到当前加载好的模块，点开某一个，可以查看该模块的详细信息，包括该模块ID，该模块暴露的API等等信息，很常用；

seajs.find：包装好的模块的API不会污染全局变量，但在Console中，有时想用一下jQuery，这样就需要使用seajs.find了，var $ = seajs.find("jquery")[0]，然后就可以在Console的上下文中使用jQuery了，PS.seajs.find返回的是一个数组；

seajs.log：在Console中打印信息，功能和console.log差不多，但是不会在IE下报错。由seajs-log 插件提供,记得加载该插件。

seajs.resolve: 类似 require.resolve，会利用模块系统的内部机制对传入的字符串参数进行路径解析。
```
seajs.resolve('jquery');
// => http://path/to/jquery.js

seajs.resolve('./a', 'http://example.com/to/b.js');
// => http://example.com/to/a.js
```

seajs.resolve 方法不光可以用来调试路径解析是否正确，还可以用在插件开发环境中。

seajs.require: 全局的 require 方法，可用来直接获取模块接口，比如
```
seajs.use(['a', 'b'], function() {

  var a = seajs.require('a')
  var b = seajs.require('b')

  // do something...
})
```
seajs.data: 通过 seajs.data，可以查看 seajs 所有配置以及一些内部变量的值，可用于插件开发。当加载遇到问题时，也可用于调试。
