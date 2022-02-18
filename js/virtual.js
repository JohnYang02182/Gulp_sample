$(function(){
//hover btn logo加入動畫
	$(".casinoFrame").hover(function(){
			$(this).find(".ballMove").addClass("aniLogoViru");
		},function(){
			$(this).find(".ballMove").removeClass("aniLogoViru");
		}
	)
});




