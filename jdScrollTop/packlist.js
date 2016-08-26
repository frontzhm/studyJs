var acList = document.getElementById("acList");
var navWrap = document.getElementById("plnavWrap");
var navList = document.getElementById("plnavList");
var acItems = acList.children;
var navItems = navList.children;
var left = offset(acList).left+acList.offsetWidth+20+"px";
var len = acItems.length;
var scrollArr = [];
for (var i = 0; i < acItems.length; i++) {
	scrollArr.push(offset(acItems[i]).top);
	// 点击选项 浏览器滚到相应位置
	navItems[i].index = i;
	navItems[i].onclick = function(e){
		// e = e ||window.event;
		// e.target = e.target || e.srcElement;
		win("scrollTop",scrollArr[this.index]);
		// if(e.target.tagName.toLowerCase() === "a"){
		// 	addCur(e.target.parentElement.index);
		// }
	}
}




function win(attr, value) {
  if (typeof value === "undefined") {
    return document.documentElement[attr] || document.body[attr];
  }
  document.documentElement[attr] = value;
  document.body[attr] = value;
}
function offset(selector) {
  var par = selector.offsetParent,
    top = selector.offsetTop,
    left = selector.offsetLeft;
  while (par !== null) {
    if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
      top += par.clientTop;
      left += par.clientLeft;
    }
    top += par.offsetTop;
    left += par.offsetLeft;
    par = par.offsetParent;
  }
  return {
    top: top,
    left: left
  }
}

function addCur(index){
	for (var i = 0; i < len; i++) {
			if(i===index){
				navItems[index].className = "plnavItem cur"
			}else{
				navItems[i].className = "plnavItem"
			}
		}
}

function changeColor(distance){
	if(distance<scrollArr[1]-100){
		addCur(0)
	}else if(distance>=scrollArr[1]-100 && distance<scrollArr[2]-100  ){
		addCur(1)
	}else if(distance>=scrollArr[2]-100 && distance<scrollArr[3]-100  ){
		addCur(2)
	}else if(distance>=scrollArr[3]-100 && distance<scrollArr[4]-100  ){
		addCur(3)
	}else{
		addCur(4)
	}
}
// left位置求出来
navWrap.style.left = left;
// 浏览器滚动的时候 nav固定  且 滚到相应位置显示相应选项
window.onscroll = function(){
	console.log(win("scrollTop")>=scrollArr[0]-100)
	if(win("scrollTop")>=scrollArr[0]-100){
		console.log('f')
		navWrap.style.position = "fixed";
	}else{
		console.log('a')
		navWrap.style.position = "absolute";
	}
	changeColor(win("scrollTop"))

}