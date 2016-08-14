// 自定义模块
define("add",function(){
	var add = function(a,b){
		return a+b;
	}
	return {
		add:add
	}
});