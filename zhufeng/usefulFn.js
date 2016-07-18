// 检测属性是不是公共属性 
function hasPublicProperty (obj,prop) {
	// 首先必须是属于对象的属性 然后不是对象的私有属性
	 return (prop in obj) && !obj.hasOwnProperty(prop)  
}