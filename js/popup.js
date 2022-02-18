$(function () {
	//login popup
  $(".loginIcon").click(function () {
     $(".NAV_log").show();
	});
	
	$(".NAV_log").find(".XX").click(function(){
     $(".NAV_log").hide();
	});	
	
	//reg popup
  $(".signupIcon").click(function () {
     $(".NAV_reg").show();
	});
	
	$(".NAV_reg").find(".XX").click(function(){
     $(".NAV_reg").hide();
	});	

	//bank popup
  $(".goBank").click(function () {
     $(".NAV_bank").show();
	});
	
	$(".NAV_bank").find(".XX").click(function(){
     $(".NAV_bank").hide();
	});

	$(".NAV_bank").find(".btnB").click(function(){
     $(".NAV_bank").hide();
	});	

	//bank_choose
	$(".btns").find("li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");	
	})


		//carrier popup
  $(".goCarrier").click(function () {
     $(".NAV_carrier").show();
	});
	
	$(".NAV_carrier").find(".XX").click(function(){
     $(".NAV_carrier").hide();
	});

	$(".NAV_carrier").find(".btnB").click(function(){
     $(".NAV_carrier").hide();
	});	

	//carrier_choose
	$(".btns").find("li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");	
	})

	
	//coupon_popup //請前端設定1.5秒收掉
  $(".goCoupon").click(function () {
     $(".NAV_coupon").show();
	});
	
	$(".NAV_coupon").find(".XX").click(function(){
     $(".NAV_coupon").hide();
	});

	//member_popup 
  $(".goMember").click(function () {
     $(".NAV_member").show();
	});
	
	$(".NAV_member").find(".XX").click(function(){
     $(".NAV_member").hide();
	});

	$(".NAV_member").find(".btnB").click(function(){
     $(".NAV_member").hide();
	})

	//sitemail_choose01_popup 
  $(".godeleteMail").click(function () {
     $(".NAV_choose01").show();
	});

	$(".NAV_choose01").find(".XX").click    (function(){
     $(".NAV_choose01").hide();
	});

	 $(".godeleteMail01").click(function () {
		 $(".NAV_choose01").hide();
		 $(".NAV_choose02").show();
	});

	$(".NAV_choose02").find(".XX").click    (function(){
     $(".NAV_choose02").hide();
	});

	//PW_popup 
  $(".goPW").click(function () {
		 $(".NAV_log").hide();
     $(".NAV_pw").show();
	});
	
	$(".NAV_pw").find(".XX").click(function(){
     $(".NAV_pw").hide();
	});

	$(".NAV_pw").find(".btn_pB").click(function(){
     $(".NAV_pw").hide();
	})

	//AD_popup > 
	$(".NAV_ad").find(".XX").click(function(){
     $(this).parent().hide();
	});
  //暫時寫的,要請前端判斷,最後關那個蓋版廣告來關popup
	$(".NAV_ad").find(".XXall").click(function(){
     $(".NAV_ad").hide();
	});

  //ALERT_popup > 
	$(".NAV_alert01").find(".closeP").click(function(){
		 $(".NAV_alert01").hide();
		 $(".NAV_nonmember").hide();
	});

	//REG_popup 
	$(".goREG").click(function () {
     $(".NAV_log").hide();
     $(".NAV_reg").show();
	});

	//promotion_popup 
  $(".goPromotion").click(function () {
     $(".NAV_promotion").show();
	});
	
	$(".NAV_promotion").find(".XX").click(function(){
     $(".NAV_promotion").hide();
	});

	//bit5 popup
  $(".goBit").click(function () {
     $(".NAV_bit5").show();
	});
	
	$(".NAV_bit5").find(".XX").click(function(){
     $(".NAV_bit5").hide();
	});

	//withdraw popup	
	$(".NAV_withdraw").find(".XX").click(function(){
     $(".NAV_withdraw").hide();
	});	
	$(".closeWD").click(function(){
     $(".NAV_withdraw").hide();
	});	

	//point popup
  $(".goPoint").click(function () {
     $(".NAV_alert01").show();
	});

	//nonmember popup	
  $(".goUnmember").click(function () {
		$(".NAV_log").hide();
    $(".NAV_nonmember").show();
	});	
	$(".NAV_nonmember").find(".XX").click(function(){
     $(".NAV_nonmember").hide();
	});	
	$(".goAlertMem").click(function(){
     $(".NAV_alert_nonmem").show();
	});	
	$(".NAV_nonmember").find(".btnP").click(function(){
		 $(".NAV_alert_nonmem").hide();		 
	});

	//提款提示
	$(".goWDremind").click(function(){
		$(".NAV_wdRemind").addClass("show");		   
	});
	$(".NAV_wdRemind").find(".closeP").click(function(){
     $(".NAV_wdRemind").removeClass("show");
	});

	//pointFlow
	$(".pointFlow").click(function(){
		$(".NAV_pointFlow").addClass("show");		   
	});

	$(".pointFlow").find(".XX").click(function(){
		$(".pointFlow").addClass("hide");		   
	});

	$(".NAV_pointFlow").find(".closeP").click(function(){
     $(".NAV_pointFlow").removeClass("show");
	});

	//jpay
	$(".goDetail").click(function(){
		$(".NAV_alert01_jpay").show();	   
	});

	$(".NAV_alert01_jpay").find(".closeP").click(function(){
		$(".NAV_alert01_jpay").hide();			   
	});

	//Referral Bonus
	let isShining = false
                    $(".goShine").click(function(){
                        if(!isShining){
                            isShining = true
                            $(".NAV_message").addClass("shine").delay(2000).queue(function(){
                                $(".NAV_message").removeClass("shine").dequeue();
                                isShining = false
                            });
                        }
                    });
});