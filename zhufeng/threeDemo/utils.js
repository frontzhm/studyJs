var utils = (function(){
  var flag = "getComputedStyle" in window;
  // true 表示现代浏览器 false表示ie6-8
  return {
    // 实现将类数组转化为数组
    zlistToArray: function(likeArray) {
      // var arr = [];
      // try {
      //   arr = Array.prototype.slice.call(likeArray);
      // } catch (e) {
      //   for (var i = 0, l = likeArray.length; i < l; i++) {
      //     arr[arr.length] = likeArray[i];
      //   }
      // }
      if(flag){
        return Array.prototype.slice.call(likeArray);
      }else{
        var arr = [];
        for (var i = 0, l = likeArray.length; i < l; i++) {
          arr[arr.length] = likeArray[i];
        }
      }

      return arr;
    },
    // 把json格式的字符串变成json格式的对象
    zjsonParse:function(str){
      // try{
      //  return JSON.parse(str);
      // }catch(e){
      //  return eval("("+str+")");
      // }
      // return  "JSON" in window?JSON.parse(str):eval("("+str+")");
      return  flag?JSON.parse(str):eval("("+str+")");
    },
    // 检测属性是不是公共属性
    zhasPublicProperty: function(obj, prop) {
      // 首先必须是属于对象的属性 然后不是对象的私有属性
      return (prop in obj) && !obj.hasOwnProperty(prop);
    },
    // 检测类型
    ztypeof: function(para) {
      return Object.prototype.toString.call(para).slice(8, -1).toLowerCase();
    },

    // 数组去掉重复的
    // 思路:
    // 1.建立一个空对象
    // 2.从数组的第一个数开始,数组的项给对象的键值对,对象的键值相等
    // 3.数组的每项和对象相应的键比较,如果对象有obj[23]=23;如在遇到数组有23 那么检测到obj[23]已经存在
    zunique: function(arr) {
      var obj = {};
      for (var i = 0, l = arr.length; i < l; i++) {
        var cur = arr[i];
        if (obj[cur] === cur) {
          arr[i] = arr[l - 1];
          arr.length--;
          i--;
        }
        obj[cur] = cur;
      }
      obj = null;
      return arr;
    }


  }
}())




  // 检测属性是不是公共属性 
  function zhasPublicProperty(obj, prop) {
    // 首先必须是属于对象的属性 然后不是对象的私有属性
    return (prop in obj) && !obj.hasOwnProperty(prop)
  }

  // 数组去掉重复的
  // 思路:
  // 1.建立一个空对象
  // 2.从数组的第一个数开始,数组的项给对象的键值对,对象的键值相等
  // 3.数组的每项和对象相应的键比较,如果对象有obj[23]=23;如在遇到数组有23 那么检测到obj[23]已经存在

  function zunique(arr) {
    var obj = {};
    for (var i = 0, l = arr.length; i < l; i++) {
      var cur = arr[i];
      if (obj[cur] === cur) {
        arr[i] = arr[l - 1];
        arr.length--;
        i--;
      }
      obj[cur] = cur;
    }
    obj = null;
    return arr;
  }

  // 检测类型
  function ztypeof(para) {
    return Object.prototype.toString.call(para).slice(8, -1).toLowerCase();
  }
  function children(curEle,tagName) {
      // 首先获取所有的子节点(childNode)
      // 然后筛选出元素节点 nodeType===1
      var arr = [];
      // ie6-8下
      if (/MSIE [678]/i.test(navigator.userAgent)) {
        var nodelist = curEle.childNodes;
          for (var i = 0, l = nodelist.length; i < l; i++) {
              var cur = nodelist[i];
              if (cur.nodeType === 1) {
                  arr[arr.length] = cur // arr.push(/)
              }
          }
          nodelist=null;
      }else{
        // 现代浏览器的children是类数组 转换为数组
        arr = Array.prototype.slice.call(curEle.children);
      }
      // 二次筛选
      // if(typeof tagName==="string"){
      //  var arr2 = [];
      //  for (i = 0,l=arr.length; i < l; i++) {
      //    cur=arr[i];
      //    if(cur.tagName.toLowerCase()===tagName.toLowerCase()){
      //      arr2[arr2.length]=cur;
      //    }
      //  }
      //  arr = arr2;
      // }
      if(typeof tagName === "string"){
        for (i = 0; i <arr.length ; i++) {
          cur = arr[i];
          // 不等于 表示不是我想要的标签
          if(cur.nodeName.toLowerCase() !== tagName.toLowerCase() ){
            // 删除的时候记得索引减1
            arr.splice(i,1);
            i--;
          }

        }
      }


      return arr;
  }


