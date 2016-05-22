// 自定义模块,依赖add,和minus
// 
define(["add","minus"],function(a,m){
	return a.add(3,4)+" and "+m.minus(3,4)
});