/**
 * [eventUtil 添加事件和删除事件的兼容]
 *  eventUtil.addHandle(body,"click");
 * @type {Object}
 */
var eventUtil = {
	// handler就是函数  , 添加事件
	addHandle:function(element,type,handler){
		// 除ie的浏览器
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		// ie高版本
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		// ie低版本
		}else{
			element["on"+type] = handler;
		}
	},
	// 删除事件
	removeHandle:function(element,type,handler){
		// 除ie的浏览器
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		// ie高版本
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		// ie低版本
		}else{
			element["on"+type] = null;
		}
	},
	getEvent:function (event) {
		 return event || window.event; 
	},
	getType:function(event) {
		 return event.type
	},
	getElement:function (event) {
		  return event.target || event.srcElement;
	},
	preventDefault:function (event) {
		 if(event.preventDefault){
		 	event.preventDefault();
		 } else{
		 	event.returnVal = false;
		 }
	},
	stopPropagation:function (event) {
		 if(event.stopPropagation){
		 	event.stopPropagation();
		 }else{
		 	event.cancelBubble = true;
		 }
	}

};
window.onblur = function() {
  document.title = '(●—●)';
};
window.onfocus = function() {
  document.title = "Just a little Demo";
};
