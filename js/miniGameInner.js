$(function () {
	//遊戲頁籤 > fadeIn fadeOut寫法 
	$(".tabZone li").eq(0).addClass("active");
     
	$(".tabZone li").click(function () {
		$(this).addClass("active").siblings().removeClass("active");
	}); 

  $(".tabZone li").click(function(){
		var index = $(this).index();
		$(".pbList").find(".pbType").eq(index).fadeIn(500).siblings().fadeOut();
	});

	//遊戲選擇 > active寫法      
	$(".chooseOne .game").click(function () {
		//同一區塊幾注選一
		//$(this).addClass("active").siblings().removeClass("active");

		//多區塊幾注選一
		$(this).addClass("active").siblings().removeClass("active")		
		.parent().parent().siblings().find(".game").removeClass("active").parent().parent().parent().siblings().find(".game").removeClass("active");

		$(this).find(".iconOuter").addClass("aniBall01").parent().siblings().find(".iconOuter").removeClass("aniBall01").parent().parent().parent().siblings().find(".iconOuter").removeClass("aniBall01").parent().parent().parent().parent().siblings().find(".iconOuter").removeClass("aniBall01");			
	});

	$(".game41 .game").click(function () {
		//同一區塊幾注選一
		//$(this).addClass("active").siblings().removeClass("active");

		//多區塊幾注選一
		$(this).addClass("active").parent().siblings().find(".game").removeClass("active").parent().parent().siblings().find(".game").removeClass("active");
		$(this).find(".iconOuter").addClass("aniBall01").parent().parent().siblings().find(".iconOuter").removeClass("aniBall01").parent().parent().parent().siblings().find(".iconOuter").removeClass("aniBall01");
	});	

  //投注區塊 > btn選取投注金額 chooseBtn寫法
	$(".moneyBtns .btnM").click(function(){
		$(this).addClass("chooseBtn").siblings().removeClass("chooseBtn");
	});
	$(".reset").click(function(){
     $(".btnM").removeClass("chooseBtn");
	});
	$(".max").click(function(){
		 $(".btnM").removeClass("chooseBtn");
		 $(".large").addClass("chooseBtn");
	});

	//hover遊戲加入動畫
	$(".chooseOne .game").hover(function(){
			$(this).find(".iconOuter").addClass("aniBall")
		},function(){
			$(this).find(".iconOuter").removeClass("aniBall")
		}
	)

	// > 投注紀錄加上 Tab > fadeIn fadeOut寫法 
	$(".tabZone01 li").eq(0).addClass("active");
     
	$(".tabZone01 li").click(function () {
		$(this).addClass("active").siblings().removeClass("active");
	}); 

  $(".tabZone01 li").click(function(){
		var index = $(this).index();
		$(".listFrame").find(".listZone").eq(index).fadeIn(300).siblings().fadeOut(0);
	});
});