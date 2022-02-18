$(function () {
	//球種頁籤 > fadeIn fadeOut寫法 
	$(".tabZone li").eq(0).addClass("active");
     
	$(".tabZone li").click(function () {
		$(this).addClass("active").siblings().removeClass("active");
	}); 

  $(".tabZone li").click(function(){
		var index = $(this).index();
		$(".sportZone").find(".pageSport").eq(index).fadeIn(300).siblings().fadeOut(0);
	});	

	//選擇投注btn
	$(".nameA").click(function(){
    $(this).addClass("yellowChoose").siblings().removeClass("yellowChoose");
	});


	//球種頁籤 > fadeIn fadeOut寫法 
	$(".tabBar li").eq(0).addClass("activeTab");
     
	$(".tabBar li").click(function () {
		$(this).addClass("activeTab").siblings().removeClass("activeTab");
	}); 

	$(".tabBar li").click(function(){
		var index = $(this).index();
		$(".listFrame").find(".listZone").eq(index).fadeIn(300).siblings().fadeOut(0);
	});	

	//選擇投注金額btn
	$(".btnD").click(function(){
    $(this).addClass("chooseBtn").siblings().removeClass("chooseBtn");
	});

	//xx_delete注單
	$(".xx").click(function(){
    $(this).parent().fadeOut(300);
	});

	//more btn按下 moreZone滑出滑入
	$(".more").click(function(){
      $(".moreZone").addClass("moreSlide")
	});
	$(".backL").click(function(){
      $(".moreZone").removeClass("moreSlide")
	});	

	//more arrow_slide
	$(".arrowT").click(function(){
		$(this).toggleClass("arrowGO");
		$(this).parent().parent().next().slideToggle(500);
	});

	//more >　選擇投注btn
	$(".btnM").click(function(){
    $(this).addClass("yellowChoose").siblings().removeClass("yellowChoose");
	});

	//more >　選擇投注btn
	$(".btnZone01").find(".btnM").click(function(){
    $(this).addClass("yellowChoose").siblings().removeClass("yellowChoose").parent().siblings().find(".btnM").removeClass("yellowChoose");
	});
});