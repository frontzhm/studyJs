# sea.js的介绍
## 为什么用sea.js
假设一个页面同时引入三个js
`
<scrpit type="text/javascript" src="a.js"></script>
<scrpit type="text/javascript" src="b.js"></script>
<scrpit type="text/javascript" src="c.js"></script>
`
- a.js
`
function a(){
	console.log(1)
}
function b(){
	console.log(2)
}
`

- b.js
`
function b(){
	console.log(3)
}

`
- c.js
`
function c(){
	console.log(4)
}
a();
b();
`
这样有两个问题:
1.在c.js里面调用b(),其实b函数是b.js里的而非a.js里的b.js,即*命名冲突*
2.如果在别的页面只引入c.js就会报错,因为没有a,b函数,即*依赖管理*

YUI为了解决这两个问题采用了局部命名和依赖管理的配置,但是依赖复杂的时候有很多隐患,于是sea.js登场
`
YUI.add('my-module', function (Y) {
  // ...
}, '0.0.1', {
    requires: ['node', 'event']
});
`
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
`
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

`

## seajs.use()方法
`
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
`

## define()
`
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
`

## require.async
SeaJS会在html页面打开时通过静态分析一次性记载所有需要的js文件，如果想要某个js文件在用到时才下载，可以使用require.async：
`
require.async('/path/to/module/file', function(m) {
    //code of callback...
});
`
这样只有在用到这个模块时，对应的js文件才会被下载，也就实现了JavaScript代码的按需加载。
