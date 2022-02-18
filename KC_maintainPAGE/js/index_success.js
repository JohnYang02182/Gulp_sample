jQuery.fn.ViderCountdown = function(options, callback) {
    var $elem = $(this);
    (function tick(){
    		function padLeft(str,lenght){
    			  if(str.length >= lenght){
        			return str;
    				}else{
        			return padLeft("0" +str,lenght);
            }
         }
      
    	var txt = $.trim($elem.html());
      
      if(txt.substr(0,8)=="00:00:00"){
         return;
      }
      
      var h = parseInt(txt.substr(0,2));
      var m = parseInt(txt.substr(3,2));
      var s = parseInt(txt.substr(6,2)) - 1;
      if(s==-1){
      		m--;
          s=59;
          if(m==-1){
              h--;
              m=59;
          }
      }

      $elem.html(padLeft(h.toString(),2) + ":" + padLeft(m.toString(),2) + ":" + padLeft(s.toString(),2) + txt.substr(8));
    	setTimeout(tick, 1000);
    })();
    return $elem;
};

var indexPage={};
indexPage.current_Top_Banner_idx = 1;
indexPage.Slide_Top_interval = null;
indexPage.Slide_Top_isMoveing=0;
//首頁主要slide
indexPage.initSlideTop=function(){
	var elms = $(".specialeffects_slider_background .banner_posR");
	$(".specialeffects_slider_background").css("width",((elms.length+2)*1903).toString() + "px");
	$(".specialeffects_slider_background").css("left","-1901px");
	var firstElm = $(elms).first().clone();
	$(elms).last().after(firstElm);
	var lastElm = $(elms).last().clone();
	$(elms).first().before(lastElm);

	$(".sliderThumbnailBar li").eq(0).css("opacity","1");
	
	$(".sliderThumbnailBar li").hover(function(){
		indexPage.CleearAutoTopSlide();
		indexPage.current_Top_Banner_idx = $(this).index()+1;
		indexPage.Slide_Top_Banner();
	},function(){
		indexPage.StartTopAutoSlide();
	});
	
	$(".sliderBtnPrev").click(function(){
		indexPage.CleearAutoTopSlide();
		if(!indexPage.Slide_Top_isMoveing){
			indexPage.current_Top_Banner_idx -= 1;
			indexPage.Slide_Top_Banner();
		}
	});
	$(".sliderBtnNext").click(function(){
		indexPage.CleearAutoTopSlide();
		if(!indexPage.Slide_Top_isMoveing){
			indexPage.current_Top_Banner_idx += 1;
			indexPage.Slide_Top_Banner();
		}
	});

	indexPage.StartTopAutoSlide();
}

indexPage.Slide_Top_Banner=function(){
	indexPage.Slide_Top_isMoveing=1;
	$(".sliderThumbnailBar li").css("opacity","0.6");
	$(".specialeffects_slider_background .adsBox").css("left","");
	
	var MOVE = indexPage.current_Top_Banner_idx * -1901;
	
	var showIdx=indexPage.current_Top_Banner_idx-1;
	if(indexPage.current_Top_Banner_idx==$(".specialeffects_slider_background .banner_posR").length-1){//last
		showIdx=0;
	}else if(indexPage.current_Top_Banner_idx==0){
		showIdx = $(".sliderThumbnailBar li").length-1;
	}
	$(".sliderThumbnailBar li").eq(showIdx).css("opacity","1");
	
	$(".specialeffects_slider_background").stop(true, false).animate({
		left: MOVE
	}, 1000,function(){
		if(indexPage.current_Top_Banner_idx==$(".specialeffects_slider_background .banner_posR").length-1){//last
			indexPage.current_Top_Banner_idx=1;
			$(".specialeffects_slider_background").css("left","-1901px");
		}else if(indexPage.current_Top_Banner_idx==0){
			var innerCount = $(".specialeffects_slider_background .banner_posR").length;
			indexPage.current_Top_Banner_idx=innerCount-2;
			$(".specialeffects_slider_background").css("left",(indexPage.current_Top_Banner_idx * -1901).toString() + "px");
		}
		$(".specialeffects_slider_background .adsBox").eq(indexPage.current_Top_Banner_idx).animate({left: "+=20px"}, 1000);
		indexPage.Slide_Top_isMoveing=0;
		indexPage.StartTopAutoSlide();
	});
	
	var elm = $(".bannerLoader");
	var newone = elm.clone(true);
	elm.before(newone);
	$(elm).remove();
}

indexPage.Auto_Slide_Top_Banner=function(){
	if(!$(".sliderThumbnailBar li:hover").exists()){
		indexPage.current_Top_Banner_idx += 1;
		indexPage.Slide_Top_Banner();
	}
}

indexPage.StartTopAutoSlide=function(){
	if(indexPage.Slide_Top_interval==null){
		indexPage.Slide_Top_interval = setInterval(indexPage.Auto_Slide_Top_Banner,3000);
	}
}

indexPage.CleearAutoTopSlide=function(){
	if(indexPage.Slide_Top_interval!=null){
		clearInterval(indexPage.Slide_Top_interval);
		indexPage.Slide_Top_interval = null;
	}
}
indexPage.GameListLeftMaxIdx=1;
indexPage.initGameListLeft=function(){
	var lis = $(".tab_container .myscrollbox ul li");
	if(lis.length>1){
		var area_width = $(".tab_container .myscrollbox ul").width();
		for(var i=0;i<lis.length;i++){
			area_width -= $(lis[i]).width();
			if(area_width <= $(".tab_container .myscroll").width()){
				indexPage.GameListLeftMaxIdx = i-1;
				break;
			}
		}
		
		$(".mybtns .right").click(function () {
			if($(this).css("color")=="rgb(52, 52, 52)"){
				return;
			}
			var idx = parseInt($(this).parent().attr("idx"));
			idx++;
			var option_width = $(this).parent().next().find(".myscrollbox li").width();
			var move_range = option_width * idx * -1;
			$(this).parent().next().find(".myscrollbox").css("left", move_range.toString() + "px");
			$(this).parent().attr("idx",idx);
			
			$(".mybtns a").css("color","");
			if(idx >= indexPage.GameListLeftMaxIdx){
				$(this).css("color","#343434");
			}
		});
		$(".mybtns .left").click(function () {
			if($(this).css("color")=="rgb(52, 52, 52)"){
				return;
			}
			var idx = parseInt($(this).parent().attr("idx"));
			idx--;
			var option_width = $(this).parent().next().find(".myscrollbox li").width();
			
			$(".mybtns a").css("color","");
			if (idx > 0) {
				$(this).parent().next().find(".myscrollbox").css("left", -(option_width * idx));
			} else {
				idx = 0;
				$(this).parent().next().find(".myscrollbox").css("left", 0);
				$(this).css("color","#343434");
			}
			$(this).parent().attr("idx",idx);
		});
		$(".mybtns .left").css("color","#343434");
		$(".mybtns .left").parent().attr("idx",0);
	}else{
		$(".mybtns .left").css("color","#343434");
		$(".mybtns .right").css("color","#343434");
	}
	
}

//熱門鑽石兌換商品(index)
indexPage.current_left_down_product_idx=1;
indexPage.Slide_left_down_product_timer=null;
indexPage.Slide_left_down_product_isMoveing=0;

indexPage.initLeftDownHotestGift=function(){
	var elms = $(".pro_all ul li");
	var firstElm = $(elms).first().clone();
	$(elms).last().after(firstElm);
	var lastElm = $(elms).last().clone();
	$(elms).first().before(lastElm);
	$(".pro_all ul").css("width",((elms.length+2)*389).toString() + "px");
	$(".pro_all ul").css("left","-389px");
	
	for(var i=0;i<elms.length;i++){
		$(".bean ul").append("<li><a href=\"#\"></a></li>");
	}
	$(".bean").find("li").eq(0).find("a").addClass("pink_bean");
	$(".bean li").click(function () {
		indexPage.CleearAutoLeft_down_productSlide();
		indexPage.current_left_down_product_idx = $(this).index()+1;
		indexPage.Slide_left_down_product();
		return false;
	});
	
	$(".right_aa").click(function () {
		indexPage.CleearAutoLeft_down_productSlide();
		if(!indexPage.Slide_left_down_product_isMoveing){
			indexPage.current_left_down_product_idx += 1;
			indexPage.Slide_left_down_product();
		}
	});

	$(".left_aa").click(function () {		
		indexPage.CleearAutoLeft_down_productSlide();
		if(!indexPage.Slide_left_down_product_isMoveing){
			indexPage.current_left_down_product_idx -= 1;
			indexPage.Slide_left_down_product();
		}
	});
	
	indexPage.Slide_left_down_product();
}

indexPage.Slide_left_down_product=function(){
	indexPage.Slide_left_down_product_isMoveing=1;
	var MOVE = indexPage.current_left_down_product_idx * -389;
	var showIdx=indexPage.current_left_down_product_idx-1;
	if(indexPage.current_left_down_product_idx==$(".pro_all ul li").length-1){//last
		showIdx=0;
	}else if(indexPage.current_left_down_product_idx==0){
		showIdx = $(".bean li").length-2;
	}
	$(".bean").find("li").find("a").removeClass("pink_bean").eq(showIdx).addClass("pink_bean");
	$(".pro_all ul").stop(true, false).animate({
		left: MOVE
	}, 500,function(){
		if(indexPage.current_left_down_product_idx==$(".pro_all ul li").length-1){//last
			indexPage.current_left_down_product_idx=1;
			$(".pro_all ul").css("left","-389px");
		}else if(indexPage.current_left_down_product_idx==0){
			var innerCount = $(".pro_all ul li").length;
			indexPage.current_left_down_product_idx=innerCount-2;
			$(".pro_all ul").css("left",(indexPage.current_left_down_product_idx * -389).toString() + "px");
		}
		indexPage.Slide_left_down_product_isMoveing=0;
		if(indexPage.Slide_left_down_product_timer==null){
			indexPage.Slide_left_down_product_timer = setInterval(indexPage.Auto_Slide_Left_down_product_Banner,3000);
		}
	});
}

indexPage.Auto_Slide_Left_down_product_Banner=function(){
	indexPage.current_left_down_product_idx += 1;
	indexPage.Slide_left_down_product();
}

indexPage.CleearAutoLeft_down_productSlide=function(){
	if(indexPage.Slide_left_down_product_timer!=null){
		clearInterval(indexPage.Slide_left_down_product_timer);
		indexPage.Slide_left_down_product_timer = null;
	}
}

//熱門鑽石兌換商品(右區塊)_上下slide
indexPage.down_right_idx = 0;
indexPage.initRightDownGiftBox=function(){
	$(".up_aa").click(function () {
		if (indexPage.down_right_idx > 0) {
			$(".down_aa_disable").removeClass("down_aa_disable").addClass("down_aa");
			indexPage.down_right_idx -= 1;
			var move = indexPage.down_right_idx * -179;
			$(".pro_zone_all ul").stop(true, false).animate({top: move}, 1000);
			if (indexPage.down_right_idx == 0) {
				$(".up_aa").removeClass("up_aa").addClass("up_aa_disable");
			}
		}
	});
 
	$(".down_aa").click(function () {
		if (indexPage.down_right_idx < $(".pro_zone_all li").length-2) {
			$(".up_aa_disable").removeClass("up_aa_disable").addClass("up_aa");
			indexPage.down_right_idx += 1;
			var move = indexPage.down_right_idx * -179;
			$(".pro_zone_all ul").stop(true, false).animate({top: move}, 1000);
			
			if (indexPage.down_right_idx == $(".pro_zone_all li").length-2) {
				$(".down_aa").removeClass("down_aa").addClass("down_aa_disable");
			}
		}
	});
	
	$(".up_aa").removeClass("up_aa").addClass("up_aa_disable");
}

jQuery(document).ready(function ($) {
	indexPage.initSlideTop();
	indexPage.initGameListLeft();
	indexPage.initLeftDownHotestGift();
	indexPage.initRightDownGiftBox();

	//首頁賽事頁籤_tab_start
	// 預設顯示第一個 Tab
	var _showTab = 0;
	var $defaultLi = $('ul.tabs li').eq(_showTab).addClass('active');
	$($defaultLi.find('a').attr('href')).siblings().hide();

	// 當 li 頁籤被點擊時...
	$('ul.tabs li').click(function () {
		// 找出 li 中的超連結 href(#id)
		var $this = $(this),
			_clickTab = $this.find('a').attr('href');
		// 把目前點擊到的 li 頁籤加上 .active
		// 並把兄弟元素中有 .active 的都移除 class
		$this.addClass('active').siblings('.active').removeClass('active');
		// 淡入相對應的內容並隱藏兄弟元素
		$(_clickTab).stop(false, true).fadeIn().siblings().hide();

		return false;
	}).find('a').focus(function () {
		this.blur();
	});
	
	$(".ttime").ViderCountdown();
});

