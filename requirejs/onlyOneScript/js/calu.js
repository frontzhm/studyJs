// 自定义模块,依赖add,和minus
// 
define(["add","minus"],function(a,m){
	return a(3,4)+" and "+m(3,4)
});