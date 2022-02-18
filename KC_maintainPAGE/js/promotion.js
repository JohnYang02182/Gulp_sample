$(function () {
	//遊戲頁籤 > fadeIn fadeOut寫法 
	$(".tabZone li").eq(0).addClass("active");
     
	$(".tabZone li").click(function () {
		$(this).addClass("active").siblings().removeClass("active");		
	}); 

  $(".tabZone li").click(function(){
		var index = $(this).index();
		$(".slotZone").find(".slotLobby").eq(index).fadeIn(500).siblings().fadeOut();
	});

	//tab hover遊戲加入動畫
	$(".tabZone li").hover(function(){
			$(this).find("span").addClass("aniTab");
		},function(){
			$(this).find("span").removeClass("aniTab");
		}
	)
});