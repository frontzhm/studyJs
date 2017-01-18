/**
 * Created by Administrator on 2017/1/18.
 */

require.config({
  // 相对于index.html的路径,写了就相当于里面的js文件路径都可以访问到
  baseUrl:"js",
  paths:{
    // 这个文件并不在范围之类,注意这里的../
    lodash:"lodash.min"
    // add:"js/add.js" 以为基本的路径已经有了 也就是js,而后缀js可以没有,故可以省略
    // 其他也一样
  }
});
// 这里是需要加载的库,后面是一一对应的参数,表示这里面函数返回的值,可以是函数 对象 字符串等等
// 想要用到的函数在别的js文件里,就这样写
require(["lodash"],function(_){
  console.log(_.chunk([1,2,3,4,5,6,7],2));      // 数组分块
  console.log(_.compact([0,false,3,4,5,6,7])); // false的值都不要
  console.log(_.difference([1,2,2,3,4],[2,7])); // 数组排除后面数组里面有的
});

