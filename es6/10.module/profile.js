// ES6将这个文件视为一个模块，里面用export命令对外部输出了三个变量。
// export var firstName = "Mike";
// export var lastName = "Jackson";
// export var year = 1958;
// 或者(推荐,输出变量一目了然)
var firstName = "Mike";
var lastName = "Jackson";
var year = 1958;
export {firstName,lastName,year,year as year2};

// 也可以输出函数或类
// export function multiply (x,y) {
// 	return x*y;
// }
// 或者
function v1 () {
	
}
function v2 () {
	
}
// 使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。
export {
	v1 as streamV1,
	v2 as streamV2,
	v2 as streamLastVersion,
}
// 实质是，在接口名与模块内部变量之间，建立了一一对应的关系。
// 
// 另外，export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
// 上面代码输出变量foo，值为bar，500毫秒之后变成baz。