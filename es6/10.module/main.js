import {firstName,lastName,year} from 'profile';
// 大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。
function setName (element) {
	element.textContent = firstName+' '+lastName;
}
console.log(firstName)
// 注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。
import{lastName as surName} from 'profile';


foo();
import {foo} from 'my_module';
// 上面的代码不会报错，因为import的执行早于foo的调用。