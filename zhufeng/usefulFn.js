var utils = {
  // 实现将类数组转化为数组
  zlistToArray: function(likeArray) {
    var arr = [];
    try {
      arr = Array.prototype.slice.call(likeArray);
    } catch (e) {
      for (var i = 0, l = likeArray.length; i < l; i++) {
        arr[arr.length] = likeArray[i];
      }
    }
    return arr;
  },
  // 把json格式的字符串变成json格式的对象
  zjsonParse:function(str){
  	// try{
  	// 	return JSON.parse(str);
  	// }catch(e){
  	// 	return eval("("+str+")");
  	// }
  	return  "JSON" in window?JSON.parse(str):eval("("+str+")");
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


