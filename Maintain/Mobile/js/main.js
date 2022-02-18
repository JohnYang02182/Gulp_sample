// 左側的選單
$(function () {
  // 左側icon點開
  $(".icon-left-menu").click(function () {
    $(".slide-content-left").toggleClass("is-visible-left");
    $("#out-wrapper").toggleClass("is-obscured-left");
    $("#out-wrapper").toggleClass("fixed");
  });
  // 點開次選單增加寬度
  $(".sub-menubar").click(function () {
    $(".slide-content-left, #out-wrapper").addClass("zindexadd");
  });
  // 點開次選單的按鈕
  $(".sub-menu , .icon-left-menu").click(function () {
    $(".slide-content-left,#out-wrapper").removeClass("zindexadd");
  });
  // 控制minigame
  $(".sub-minigame").click(function () {
    $(".sub-menu-lotus").addClass("hide");
    $(".sub-menu-casino").addClass("hide");
    $(".sub-menu-slot").addClass("hide");

    $(".sub-menu-minigame").removeClass("hide");
  });
  // 控制lotus
  $(".sub-lotus").click(function () {
    $(".sub-menu-minigame").addClass("hide");
    $(".sub-menu-casino").addClass("hide");
    $(".sub-menu-slot").addClass("hide");

    $(".sub-menu-lotus").removeClass("hide");
  });
  // 控制casino
  $(".sub-casino").click(function () {
    $(".sub-menu-minigame").addClass("hide");
    $(".sub-menu-lotus").addClass("hide");
    $(".sub-menu-slot").addClass("hide");

    $(".sub-menu-casino").removeClass("hide");
  });
  // 控制slot
  $(".sub-slot").click(function () {
    $(".sub-menu-minigame").addClass("hide");
    $(".sub-menu-lotus").addClass("hide");
    $(".sub-menu-casino").addClass("hide");

    $(".sub-menu-slot").removeClass("hide");
  });
  // 點大區域收起來
  $("#out-wrapper").click(function () {
    $(".slide-content-left").removeClass("is-visible-left");
    $(this).removeClass("is-obscured-left , fixed");
  });
  $(".icon-left-menu").click(function (event) {
    event.stopPropagation();
  });
  $(".slide-content-left").click(function (event) {
    event.stopPropagation();
  });
});

// 右側的選單
$(function () {
  // 右側icon點開
  $(".icon-right-menu").click(function () {
    $(".slide-content-right").toggleClass("is-visible-right");
    $("#out-wrapper").toggleClass("is-obscured-right");
    $("#out-wrapper").toggleClass("fixed");
  });
  // 點大區域收起來
  $("#out-wrapper").click(function () {
    $(".slide-content-right").removeClass("is-visible-right");
    $(this).removeClass("is-obscured-right , fixed");
  });
  // 點右側選單收起來
  $(".slide-content-right").click(function () {
    $("#out-wrapper").removeClass("is-obscured-right , fixed");
    $(this).removeClass("is-visible-right ");
  });
  $(".icon-right-menu").click(function (event) {
    event.stopPropagation();
  });
  $(".slide-content-right").click(function (event) {
    event.stopPropagation();
  });
});

// popup
$(function () {
  $(".login-btn").on("click", function () {
    $(".popup-login").addClass("model-open");
  });
  $(
    ".customer-send-btn, .save-button, .edit-button, .tab-moneycharge-content .submit-button, .exchange-button ,.amount-box button.submit-button"
  ).on("click", function () {
    $(".popup-hint-small").addClass("model-open");
    $(".popup-hint-small").fadeIn(400).delay(3000).fadeOut(400);
  });
  $(".how-deposit").on("click", function () {
    $(".popup-howdeposit").addClass("model-open");
    $('header,footer').addClass('zindex0');
  });
  $(".rolling-button").on("click", function () {
    $(".popup-rolling").addClass("model-open");
    $('header,footer').addClass('zindex0');
  });
  $(".signup-btn,.signupnow-button").on("click", function () {
    $(".popup-signup").addClass("model-open");
  });
  $(".bank-btn").on("click", function () {
    $(".popup-bank").addClass("model-open");
    $(".popup-signup").removeClass("model-open");
  });
  $(".close-btn ,.bg-overlay ,.cancel-button ,.close-button").click(
    function () {
      $(".popup-login").removeClass("model-open");
      $(".popup-signup").removeClass("model-open");
      $(".popup-hint-small").removeClass("model-open");
      $(".popup-howdeposit").removeClass("model-open");
      $(".popup-rolling").removeClass("model-open");
      $('header,footer').removeClass('zindex0');
    }
  );
  $(".bank-close-btn").on("click", function () {
    $(".popup-bank").removeClass("model-open");
    $(".popup-signup").addClass("model-open");
  });

  $(".login-go .forget-button").on("click", function () {
    $(".popup-account-problem.login").addClass("model-open");
    $(".popup-login").removeClass("model-open");
  });
  $(".login.send-button").on("click", function () {
    $(".popup-account-problem.login").removeClass("model-open");
    $(".popup-login").addClass("model-open");
  });
  $(".login.cancel-button").on("click", function () {
    $(".popup-account-problem.login").removeClass("model-open");
    $(".popup-login").addClass("model-open");
  });

  $(".signup-go .forget-button").on("click", function () {
    $(".popup-account-problem.signup").addClass("model-open");
    $(".popup-signup").removeClass("model-open");
  });
  $(".signup.send-button").on("click", function () {
    $(".popup-account-problem.signup").removeClass("model-open");
    $(".popup-signup").addClass("model-open");
  });
  $(".signup.cancel-button").on("click", function () {
    $(".popup-account-problem.signup").removeClass("model-open");
    $(".popup-signup").addClass("model-open");
  });
});

// slotgame tab切換
$(function () {
  $("#tabs-slotgame li:first-child").addClass("active");
  $(".tab-content").hide();
  $(".tab-content:first").show();

  // Click function
  $("#tabs-slotgame li").click(function () {
    $("#tabs-slotgame li").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// minigame tab切換(與Lotus共用)
$(function () {
  $("#tabs-minigame li:first-child").addClass("active");
  $(".tab-content").hide();
  $(".tab-content:first").show();

  // Click function
  $("#tabs-minigame li").click(function () {
    $("#tabs-minigame li").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// minigame tab-content PowerBall切換(與Lotus共用)
$(function () {
  $(".for-pb li:first-child").addClass("active");
  $(".content-for-pb").hide();
  $(".content-for-pb:first").show();

  // Click function
  $(".for-pb li").click(function () {
    $(".for-pb li").removeClass("active");
    $(this).addClass("active");
    $(".content-for-pb").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// minigame tab-content PowerLadder切換(與Lotus共用)
$(function () {
  $(".for-ld li:first-child").addClass("active");
  $(".content-for-ld").hide();
  $(".content-for-ld:first").show();

  // Click function
  $(".for-ld li").click(function () {
    $(".for-ld li").removeClass("active");
    $(this).addClass("active");
    $(".content-for-ld").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// minigame tab-content SpeedKeno切換(與Lotus共用)
$(function () {
  $(".for-sk li:first-child").addClass("active");
  $(".content-for-sk").hide();
  $(".content-for-sk:first").show();

  // Click function
  $(".for-sk li").click(function () {
    $(".for-sk li").removeClass("active");
    $(this).addClass("active");
    $(".content-for-sk").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// minigame tab-content KenoLadder切換(與Lotus共用)
$(function () {
  $(".for-kl li:first-child").addClass("active");
  $(".content-for-kl").hide();
  $(".content-for-kl:first").show();

  // Click function
  $(".for-kl li").click(function () {
    $(".for-kl li").removeClass("active");
    $(this).addClass("active");
    $(".content-for-kl").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// minigame 快速投注打開(與Lotus共用)
$("#open-bet").click(function () {
  $(this).addClass("hide");
  $(".minigame-box button.item").removeClass("active");
  $(".quickbet-box").removeClass("hide");
  $(".total-box ,footer").addClass("hide");
  $(".minigame-box").addClass("PD");
});

// minigame 快速投注關閉(與Lotus共用)
$("button.back-button").click(function () {
  $(".minigame-box.PD button.item").removeClass("active");
  $(".quickbet-box").addClass("hide");
  $(".total-box ,footer").removeClass("hide");
  $(".minigame-box").removeClass("PD");
  $("#open-bet").removeClass("hide");
});

// minigame 清除多選的(與Lotus共用)
$("button.remove-button").click(function () {
  $(".minigame-box.PD button.item").removeClass("active");
});

// minigame click add active chip on (與Lotus共用)
$(".minigame-box button.item").click(function () {
  $(this).toggleClass("active").siblings().removeClass("active");
});
$("button.normal").click(function () {
  $(this).toggleClass("active").siblings().removeClass("active");
});
$(".minigame-box.PD button.item").click(function () {
  $(".coinbet-type").addClass("hide");
  $(this).toggleClass("active").siblings().removeClass("active");
});
$(".chip-item button").click(function () {
  $(this).addClass("on").siblings().removeClass("on");
});

// bet history tab切換
$(function () {
  $("#tabs-bethistory li:first-child").addClass("active");
  $(".tab-content").hide();
  $(".tab-content:first").show();

  // Click function
  $("#tabs-bethistory li").click(function () {
    $("#tabs-bethistory li").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// bet history 球類的tab切換
$(function () {
  $("#filterball li:first-child").addClass("active");
  $(".tab-ball-content").hide();
  $(".tab-ball-content:first").show();

  // Click function
  $("#filterball li").click(function () {
    $("#filterball li").removeClass("active");
    $(this).addClass("active");
    $(".tab-ball-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// bet history minigame的tab切換
$(function () {
  $("#filterminigame li:first-child").addClass("active");
  $(".tab-minigame-content").hide();
  $(".tab-minigame-content:first").show();

  // Click function
  $("#filterminigame li").click(function () {
    $("#filterminigame li").removeClass("active");
    $(this).addClass("active");
    $(".tab-minigame-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// bet history casino的tab切換
$(function () {
  $("#filtercasino li:first-child").addClass("active");
  $(".tab-casino-content").hide();
  $(".tab-casino-content:first").show();

  // Click function
  $("#filtercasino li").click(function () {
    $("#filtercasino li").removeClass("active");
    $(this).addClass("active");
    $(".tab-casino-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// bet history slot的tab切換
$(function () {
  $("#filterslot li:first-child").addClass("active");
  $(".tab-slot-content").hide();
  $(".tab-slot-content:first").show();

  // Click function
  $("#filterslot li").click(function () {
    $("#filterslot li").removeClass("active");
    $(this).addClass("active");
    $(".tab-slot-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// bet history IDNPoker的tab切換
$(function () {
  $("#filterIDNPoker li:first-child").addClass("active");
  $(".tab-IDNPoker-content").hide();
  $(".tab-IDNPoker-content:first").show();

  // Click function
  $("#filterIDNPoker li").click(function () {
    $("#filterIDNPoker li").removeClass("active");
    $(this).addClass("active");
    $(".tab-IDNPoker-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// deposit的tab切換
$(function () {
  $("#tabs-moneycharge li:first-child").addClass("active");
  $(".tab-moneycharge-content").hide();
  $(".tab-moneycharge-content:first").show();

  // Click function
  $("#tabs-moneycharge li").click(function () {
    $("#tabs-moneycharge li").removeClass("active");
    $(this).addClass("active");
    $(".tab-moneycharge-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// event的tab切換
$(function () {
  $("#tabs-event li:first-child").addClass("active");
  $(".tab-event-content").hide();
  $(".tab-event-content:first").show();

  // Click function
  $("#tabs-event li").click(function () {
    $("#tabs-event li").removeClass("active");
    $(this).addClass("active");
    $(".tab-event-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// add favorite
$(".add-favorite").click(function () {
  if ($("span").hasClass("icon-star")) {
    $(".add-favorite").removeClass("active");
    setTimeout(function () {
      $("span").removeClass("icon-star");
      $("span").addClass("icon-star-o");
    }, 15);
  } else {
    $(".add-favorite").addClass("active");
    setTimeout(function () {
      $("span").addClass("icon-star");
      $("span").removeClass("icon-star-o");
    }, 150);
  }
});

// hoemgame的tab切換
$(function () {
  $("#tabs-maingame li:first-child").addClass("active");
  $(".tab-maingame-content").hide();
  $(".tab-maingame-content:first").show();

  // Click function
  $("#tabs-maingame li").click(function () {
    $("#tabs-maingame li").removeClass("active");
    $(this).addClass("active");
    $(".tab-maingame-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});

// Customer Reply
$("button.reply-button").click(function () {
  $(".reply-box").removeClass("hide");
});
$("button.send-reply-button").click(function () {
  $(".reply-box").addClass("hide");
});