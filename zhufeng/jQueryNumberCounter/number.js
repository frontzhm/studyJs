(function($){
	$.fn.countTo = function (options) {
		options = options || {};
		return $(this).each(function(){
			// set options for current element
			var settings = $.extend({},$.fn.countTo.defaults,{
				from:$(this).data("from"),
				to:$(this).data("to"),
				// speed相当于总时间
				speed:$(this).data("speed"),
				// 每隔多长时间刷新
				refreshInterval:$(this).data("refreshInterval"),
				decimals:$(this).data("decimals"),
			},options);
			// how many times to update the value, and how much to increment the value on each update
			var
			loops = Math.ceil(settings.speed/settings.refreshInterval),
			increment = (settings.to-settings.from)/loops;
			// references & variables that will change with each update
			var
			 _this = this,
			 self = $(this),
			 loopCount = 0,
			 value = settings.from,
			 data = self.data("countTo") || {};
			 self.data("countTo",data);
			// if an existing interval can be found ,clear it first
			if(data.interval){
				clearInterval(data.interval);
			}
			data.interval = window.setInterval(updateTimer, settings.refreshInterval);
			// initialize the element with the starting value
			render(value);
			function updateTimer() {
				 value+=increment;
				 loopCount++;
				 render(value);
				 if(typeof settings.onUpdate === "function"){
				 	settings.onUpdate.call(_this,value);
				 }
				 if(loopCount>=loops){
				 	// remove the interval
				 	self.removeData("countTo");
				 	window.clearInterval(data.interval);
				 	value = settings.to;
				 	if(typeof setting.onComplete === "function"){
				 		settings.onComplete.call(_this,value)
				 	}
				 }
			}
			function render (value) {
				 var formattedValue = settings.formatter.call(_this,value,settings);
				 self.html(formattedValue);
			}
		});
	};
	$.fn.countTo.defaults = {
		from:0,// the number the element should start
		to:0, // the number the element should end at
		speed:1000,// how long it should take to count between the target numbers
		refreshInterval:100, // how often the element should be updated
		decimals:0,// the number of decimal places to show
		formatter:formatter, // handle for formatting the value before rendering
		onUpdate:null,// callback method for every time the elements is updated
		onComplete:null // callback method for when the element finishes updating
	}
	function formatter (value,settings) {
		 return value.toFixed(settings.decimals);
	}
}(jQuery))

jQuery(function ($) {
	  // custom formatting the example
	  $("#count-number").data("countToOptions",{
	  	formatter:function (value,options) {
	  		 return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g,','); 
	  	}
	  })
	  // start all timers
	  $(".timer").each(count);
	  function count(options) {
	  	 var $this = $(this);
	  	 options = $.extend({},options||{},$this.data("countToOptions")||{});
	  	 $this.countTo(options);
	  }
})