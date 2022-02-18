var wow = new WOW({
	boxClass: 'wow', // animated element css class (default is wow)
	animateClass: 'animated', // animation css class (default is animated)
	offset: 0, // distance to the element when triggering the animation (default is 0)
	mobile: true, // trigger animations on mobile devices (default is true)
	live: true, // act on asynchronously loaded content (default is true)
	callback: function callback(box) {
		// the callback is fired every time an animation is started
		// the argument that is passed in is the DOM node being animated
	},
	scrollContainer: null // optional scroll container selector, otherwise use window
});
wow.init();

$(function(){
	//存入轉出頁籤 > fadeIn fadeOut寫法 
	$(".tabZone li").click(function () {
		$(this).addClass("active").siblings().removeClass("active");
	}); 

	$(".tabZone li").click(function(){
		var index = $(this).index();
		$(".contentZone").find(".listZone").eq(index).fadeIn(300).siblings().fadeOut(0);
	});

//hover casino加入動畫
	$(".casinoFrame").hover(function(){
			$(this).find(".model").addClass("aniModel");
		},function(){
			$(this).find(".model").removeClass("aniModel");
		}
	)

//hover slot 換大廳	
	$(".s01").hover(function () {
			$(".slot01").removeClass("slotHide").addClass("slotShow");
			$(".slot02").removeClass("slotShow").addClass("slotHide");
			$(".slot03").removeClass("slotShow").addClass("slotHide");
			$(".slot04").removeClass("slotShow").addClass("slotHide");
			$(".slot05").removeClass("slotShow").addClass("slotHide");
	}); 
	$(".s02").hover(function () {
			$(".slot02").removeClass("slotHide").addClass("slotShow");
			$(".slot01").removeClass("slotShow").addClass("slotHide");
			$(".slot03").removeClass("slotShow").addClass("slotHide");
			$(".slot04").removeClass("slotShow").addClass("slotHide");
			$(".slot05").removeClass("slotShow").addClass("slotHide");
	}); 
	$(".s03").hover(function () {
			$(".slot03").removeClass("slotHide").addClass("slotShow");
			$(".slot01").removeClass("slotShow").addClass("slotHide");
			$(".slot02").removeClass("slotShow").addClass("slotHide");
			$(".slot04").removeClass("slotShow").addClass("slotHide");
			$(".slot05").removeClass("slotShow").addClass("slotHide");
	});
	$(".s04").hover(function () {
			$(".slot04").removeClass("slotHide").addClass("slotShow");
			$(".slot01").removeClass("slotShow").addClass("slotHide");
			$(".slot02").removeClass("slotShow").addClass("slotHide");
			$(".slot03").removeClass("slotShow").addClass("slotHide");
			$(".slot05").removeClass("slotShow").addClass("slotHide");
	});
	$(".s05").hover(function () {
			$(".slot05").removeClass("slotHide").addClass("slotShow");
			$(".slot01").removeClass("slotShow").addClass("slotHide");
			$(".slot02").removeClass("slotShow").addClass("slotHide");
			$(".slot03").removeClass("slotShow").addClass("slotHide");
			$(".slot04").removeClass("slotShow").addClass("slotHide");
	});
	
//menu > fadeIn fadeOut寫法      
	$(".leftMenu li").find("a").click(function () {
		$(this).addClass("active").parent().siblings().find("a").removeClass("active");		
	});

//頭像hover > 出現會員資訊shortcart	
	 $(".memberZone").hover(function(){
	 		$(".memHover").fadeIn(300);
	 	},function(){
	 		$(".memHover").fadeOut(300);
	 	}
	 )
//leftMenuhover > 放大成本來大小	
	$(".LeftContent").hover(function(){
			$(".LeftContent").addClass("zoomOUT");
		},function(){
			$(".LeftContent").removeClass("zoomOUT");
		}
	)
	
//moneyRefresh動畫
	$(".icon-icconLOAD").click(function () {
		if(!$(this).hasClass("aniLoad")){
			$(this).addClass("aniLoad").delay(1000).queue(function(){
				$(this).removeClass("aniLoad").dequeue();
			});
		}
	});
});








