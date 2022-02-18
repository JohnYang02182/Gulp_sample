$(function(){
//hover btn logo加入動畫
	$(".casinoFrame").hover(function(){
			$(this).find(".logo").addClass("aniLogoMini");
		},function(){
			$(this).find(".logo").removeClass("aniLogoMini");
		}
	)
});




