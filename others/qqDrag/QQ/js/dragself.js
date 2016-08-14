function getByClass(clsName,parent){
  var oParent=parent?document.getElementById(parent):document,
      eles=[],
      elements=oParent.getElementsByTagName('*');

  for(var i=0,l=elements.length;i<l;i++){
    if(elements[i].className==clsName){
      eles.push(elements[i]);
    }
  }
  return eles;
}

window.onload=drag;

function drag(){
   var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
   // 拖曳
   oTitle.onmousedown=fnDown;
   // 关闭
   var oClose=document.getElementById('ui_boxyClose');
   oClose.onclick=function(){
   	  document.getElementById('loginPanel').style.display='none';
   }
 
  // 点击状态 显示列表 鼠标放在列表项上背景变化 点击列表项列表消失且状态的文字变成点击的那行 图像 类名
  var stg= document.getElementById("loginState");
  var show = document.getElementById("loginStateShow");
  var slst=document.getElementById("loginStatePanel");
  var items = slst.getElementsByTagName("li");
  var stxt = document.getElementById("login2qq_state_txt");
  var cls = "";
  stg.onclick = function (e) {
    e = e|| window.event;
     slst.style.display = "block"; 
     e.stopPropagation?e.stopPropagation():(e.cancelBubble = true);
     // 和下面点击文档让list消失矛盾  所以要阻止冒泡
  }

  for (var i = 0,l = items.length; i < l; i++) {
    items[i].onmouseover = function(){
      this.style.backgroundColor = "#f69";
    }
    items[i].onmouseout = function(){
      this.style.backgroundColor = "#fff";
    }
    items[i].onclick = function(e){
      e = e || window.event;
      console.log(this)
      cls = this.id;
      stxt.innerHTML = getByClass("stateSelect_text",cls)[0].innerHTML;
      slst.style.display = "none";
      e.stopPropagation?e.stopPropagation():(e.cancelBubble = true);
      show.className = "login-state-show "+cls;


    }
  }
  document.onclick = function(){
    if(slst.style.display == "block"){
    slst.style.display = "none";

    }
  }

  
 
}

function fnDown(event){
  event = event || window.event;
  var oDrag=document.getElementById('loginPanel'),
      // 光标按下时光标和面板之间的距离
      disX=event.clientX-oDrag.offsetLeft,
      disY=event.clientY-oDrag.offsetTop;
  // 移动
  document.onmousemove=function(event){
  	event = event || window.event;
  	fnMove(event,disX,disY);
  }
  // 释放鼠标
  document.onmouseup=function(){
  	document.onmousemove=null;
  	document.onmouseup=null;
  }
}

function fnMove(e,posX,posY){
  var oDrag=document.getElementById('loginPanel'),
      l=e.clientX-posX,
      t=e.clientY-posY,
      winW=document.documentElement.clientWidth || document.body.clientWidth,
      winH=document.documentElement.clientHeight || document.body.clientHeight,
      maxW=winW-oDrag.offsetWidth-10,
      maxH=winH-oDrag.offsetHeight;
  if(l<0){
    l=0;
  }else if(l>maxW){
    l=maxW;
  }
  if(t<0){
    t=10;
  }else if(t>maxH){
    t=maxH;
  }
  oDrag.style.left=l+'px';
  oDrag.style.top=t+'px';
}



// e/propagation cancelBubble preventDefault return Default 
// document.documentElement.clientHeight offsetTop   x.offsetWidth