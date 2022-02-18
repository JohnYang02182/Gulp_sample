$(function () {
	//活動頁籤 > fadeIn fadeOut寫法 
	$(".tabZone li").eq(0).addClass("active");
     
	$(".tabZone li").click(function () {
		$(this).addClass("active").siblings().removeClass("active");
	}); 

  $(".tabZone li").click(function(){
		var index = $(this).index();
		$(".subZone").find(".fundList").eq(index).fadeIn(300).siblings().fadeOut(0);
	});

	//tab hover遊戲加入動畫
	$(".tabZone li").hover(function(){
			$(this).find("span").addClass("aniTab");
		},function(){
			$(this).find("span").removeClass("aniTab");
		}
	)

	//活動頁籤 > fadeIn fadeOut寫法      
	$(".goRoll").click(function () {
		$(".tabZone li").eq(4).addClass("active").siblings().removeClass("active");
		$(".rollList").fadeIn(300).siblings().fadeOut(0);
	}); 

  //投注區塊 > btn選取投注金額 chooseBtn寫法
	$(".moneyBtns .btnM").click(function(){
		$(this).addClass("chooseBtn").siblings().removeClass("chooseBtn");
	});
	$(".reset").click(function(){
     $(".btnM").removeClass("chooseBtn");
	});

	//btn選取大廳 chooseBtn寫法
	$(".lobbyBtns .btnM").click(function(){
		$(this).addClass("chooseBtn").siblings().removeClass("chooseBtn");
	});

	//選遊戲種 >　btn_p　chooseBtn寫法
	$(".btn_p").click(function(){
		$(this).toggleClass("accept");
	});

	//存錢鈕按下按鍵變色變文字　>　跳出popup
	//$(".goDep").click(function(){
	  //$(".goDep").html("계좌 번호 신청 (59s)");
		//$(this).addClass("lock");	
		//$(".NAV_dep01").show();	
		//前端判斷哪存款狀態跳出
		//$(".NAV_dep02").show();	
		//$(".NAV_dep03").show();	
	//});
  //前端判斷哪存款狀態關閉popup
	$(".NAV_dep01").find(".btnB").click(function(){
    $(".NAV_dep01").hide();
	});

	$(".NAV_dep01").find(".XX").click(function(){
    $(".NAV_dep01").hide();
	});
	//$(".NAV_fund02").find(".XX").click(function(){
    // $(".NAV_fund02").hide();
  //});
	//$(".NAV_fund03").find(".XX").click(function(){
    // $(".NAV_fund03").hide();
	//});
	
	//siteMail > 編輯信件鈕	     
	$(".editMessage span").click(function () {
		$(this).addClass("active").siblings().removeClass("active");
	}); 

	//recommend > copy qrcode
	//$(".goCopy").click(function(){
		//$(".copyMSG").addClass("aniMSG");		
	//});
  //recommend > copy qrcode
	$(".goCopy").click(function(){
		var	A = $(".copyMSG") ;	  
			if(A.hasClass("aniMSG")) {
	        A.removeClass("aniMSG");
       } else {
	        A.addClass("aniMSG");
       }	
	});

	//service > send letter
	$(".goSend").click(function(){
			var	A = $(".sendMSG") ;	  
				if(A.hasClass("aniMSG")) {
						A.removeClass("aniMSG");
				} else {
						A.addClass("aniMSG");
				}	
		});

	$(".editService").click(function(){
		$(".serviceFrame").addClass("serviceReplyFrame");
	});
	
	//存款加入提款密碼流程
	$(".goDep").click(function(){
		$(".goDep").addClass("hide");
		$(".wdPW").removeClass("hide");     
	});

	$(".wdBtn").click(function(){
		$(".wdPW").addClass("hide");
		$(".wdName").removeClass("hide");     
	});
	
	//GameResult_popup
	$(".goResult").click(function(){
      $(this).parent().find(".resultCube").addClass("show").parent().parent().siblings().find(".resultCube").removeClass("show");
	});
	$(".resultCube").find(".XX").click(function(){
     $(".resultCube").removeClass("show");
	});
}); 
