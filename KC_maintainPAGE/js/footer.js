$(function(){
 	//hover icon加入動畫
	$(".iconANI").hover(function(){
			$(this).find("span").addClass("aniIcon")
		},function(){
			$(this).find("span").removeClass("aniIcon")
		}
	)
});