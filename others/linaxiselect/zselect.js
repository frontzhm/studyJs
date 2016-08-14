$(function() {
	/**
	 *
	 *
	 *把
	 * <select class="beautifySelect" name="" id="">
      <option value="0">选择水果</option>
      <!-- 需要的数据放在option里 -->
      <option value="1" data-source="baidu">苹果</option>
      <option value="2" data-source="suning">香蕉</option>
      <option value="3" data-source="xxhzhm">西瓜</option>
    </select>
    变
    <div class="zselect">
      <i class="fa fa-angle-down"></i>
      <div class="zselectTxt">西瓜</div>
      <ul class="zselectList" style="display: none;">
        <li class="zoption" data-value="0">选择水果</li>
        <li class="zoption" data-value="1" data-source="baidu">苹果</li>
        <li class="zoption" data-value="2" data-source="suning">香蕉</li>
        <li class="zoption" data-value="3" data-source="xxhzhm">西瓜</li>
      </ul>
    </div>
	 */
	
  $.each($("select.beautifySelect"), function(index) {
    var select = $(this);
    // 伪select的建造
    var zselect = $("<div>", { class: "zselect", html: '<i class="fa fa-angle-down"></i><div class="zselectTxt">选择水果</div><ul class="zselectList"></ul>' });
    var zselectTxt = zselect.find(".zselectTxt");
    var zselectList = zselect.find(".zselectList");
    // 补充伪option
    console.log(select.children('option'))
    $.each(select.children('option'), function() {
      var option = $(this);
      var zoption = $("<li>", {
        class: "zoption",
        html: option.text(),
        "data-value": option.val(),
        "data-source": option.data("source"),
        // 点击选项的时候
        click: function() {
          zselectTxt.text(option.text());
          select.val(option.val());
          console.log(select.val());
          zselectList.trigger("zhide");
        }
      });
      // 节点插入
      zoption.appendTo(zselectList);
      
    })
    zselectList.appendTo(zselect);
    select.hide(0).after(zselect)
    // 点击框
    zselectTxt.click(function(){
    	zselectList.trigger("ztoggle");
    })
    // 鼠标离开select区域的时候
    zselect.mouseleave(function() {
    	zselectList.trigger("zhide");
    });
    // 自定义zselectList的事件
    zselectList.bind("zhide",function(){
    	// 排除动画中
    	if(zselectList.is(":animated")){
    		return false;
    	}
    	// slideUp就是隐藏
    	zselectList.stop().slideUp(200);
    	zselect.removeClass('expanded');
    }).bind("zshow",function(){

    	if(zselectList.is(":animated")){
    		return false;
    	}
    	// slideDown就是显示
    	zselectList.stop().slideDown(200);
    	zselect.addClass('expanded');
    }).bind("ztoggle",function(){

    	if(zselectList.is(":animated")){
    		return false;
    	}
    	if(zselect.hasClass('expanded')){
    		zselectList.trigger("zhide");
    	}
    	zselectList.trigger("zshow");
    })
    
  })












})
