$(function () {
	//一區塊 >　sideMenu
	$(".sideMenu li").eq(0).addClass("activeSTab");
	$(".sideMenu li").click(function () {
		$(this).addClass("activeSTab").siblings().removeClass("activeSTab");

		var index = $(this).index();
		$(".centerZone").find(".pageZone").eq(index).fadeIn(300).addClass("flexShow").siblings().removeClass("flexShow").fadeOut(0);
	});

	//二區塊 >　球種頁籤 > fadeIn fadeOut寫法 
	$(".tabZone li").eq(0).addClass("active");
     
	$(".tabZone li").click(function () {
		$(this).addClass("active").siblings().removeClass("active");
	}); 

  $(".tabZone li").click(function(){
		var index = $(this).index();
		$(".sportZone").find(".pageSport").eq(index).fadeIn(300).siblings().fadeOut(0);
	});

	//二區塊 >　star
	$(".iconStar").click(function(){
        $(this).toggleClass("iconStar01");
	}); 

	//二區塊 >　選擇投注btn
	$(".btnM").click(function(){
    $(this).addClass("yellowChoose").siblings().removeClass("yellowChoose");
	});

	//二區塊 >　btn按下 moreZone滑出滑入
	$(".more").click(function(){
      $(".moreZone").addClass("moreSlide")
	});
	$(".backL").click(function(){
      $(".moreZone").removeClass("moreSlide")
	});	

	//三區塊 >　選擇投注btn
	$(".btnZone01").find(".btnM").click(function(){
    $(this).addClass("yellowChoose").siblings().removeClass("yellowChoose").parent().siblings().find(".btnM").removeClass("yellowChoose");
	});

	//四區塊 >　注單種頁籤 > fadeIn fadeOut寫法 
	$(".tabBar li").eq(0).addClass("activeTab");
     
	$(".tabBar li").click(function () {
		$(this).addClass("activeTab").siblings().removeClass("activeTab");
	}); 

	$(".tabBar li").click(function(){
		var index = $(this).index();
		$(".listFrame").find(".listZone").eq(index).fadeIn(300).siblings().fadeOut(0);
	});	

	//四區塊 >　選擇投注金額btn
	$(".btnD").click(function(){
    $(this).addClass("chooseBtn").siblings().removeClass("chooseBtn");
	});

	//四區塊 >　xx_delete注單
	$(".xx").click(function(){
    $(this).parent().fadeOut(300);
	});

	//四區塊 >　video_slide
	$(".arrowT").click(function(){
		$(this).toggleClass("arrowGO");
		$(this).parent().parent().next().slideToggle(500);
	});

});