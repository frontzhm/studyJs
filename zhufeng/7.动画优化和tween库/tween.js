~function (argument) {
	var effect = {
		Linear :function Linear(begin,distance,duration,time) {
				 // start 开始位置
				 // target 目标位置
				 // duration 总时间
				 // time 走过的时间
				 // 返回 过了time之后的位置
				 return distance/duration*time+begin
			}
	}
	// 实现多方向的运动动画
	// curEle:当前元素
	// target:当前动画的目标位置,存储的是每一个方向的目标位置{left:xxx,top:xxx}
	// duration:当前动画的总时间
	function animate (curEle,target,duration) {
		// 在每次执行方法执行之前 首先结束当前元素的动画
		window.clearInterval(curEle.timer);
		// 获得每个方向的起始值和总距离
		var begin = {},distance={};
		for (var key in target) {
			// 只遍历私有属性
			if (target.hasOwnProperty(key)) {
				// key:方向:top/left
				begin[key] = utils.css(curEle,key);
				distance[key] = target[key]-begin[key];
			}
		}
		// 实现多方向运动动画
		var time = 0;
		var delay = 10;
		  curEle.timer = window.setInterval(function(){
		  	time+=delay;
		  	// 到了时间就停止定时器 结束动画 让盒子到目标那
		  	if(time>=duration){
		  		// for (key in target) {
		  		// 	if (target.hasOwnProperty(key)) {
		  		// 		utils.css(curEle,key,target[key]);
		  		// 	}
		  		// }
		  		utils.css(curEle,key,target);
		  		clearInterval(curEle.timer);
		  		return;
		  	}
		  	// 未到达目标:分别获取每个方向的当前位置,然后设置即可
		  	for (key in target) {
		  		if (target.hasOwnProperty(key)) {
		  			utils.css(curEle,key,effect.Linear(begin[key],distance[key],duration,time));
		  		}
		  	}
		  }, delay)
	}
	 window.animate = animate;
}();