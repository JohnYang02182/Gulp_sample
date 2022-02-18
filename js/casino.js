$(function () {
	//hover遊戲加入動畫
	$(".casinoZone li").hover(function(){
			$(this).find(".gogo").addClass("activePlay")
		},function(){
			$(this).find(".gogo").removeClass("activePlay")
		}
	)
});