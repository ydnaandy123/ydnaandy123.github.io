$(document).ready(function (e) {
  // console.log("page is loading now");
  $(".navbar a, footer a[href='#main-body'], #landing-button-group a.btn").on('click', function (event) {
    console.log(this.hash)
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;$('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function () {
        window.location.hash = hash;
      });
    }
  });
  $(window).scroll(function () {
    animatedObjectCheck();
  });  
  $("#grid-1_1").hover(function(){  
    $(this).css("background-color", "rgba(255, 255, 255, 0.0)"); 
    $("#intro-text1").css("opacity", "0"); 
    }, function(){  
    $(this).css("background-color", "rgba(255, 255, 255, 0.8)");  
    $("#intro-text1").css("opacity", "1"); 
  });  
  $("#grid-1_3").hover(function(){  
    $(this).css("background-color", "rgba(255, 255, 255, 0.0)"); 
    $("#intro-text3").css("opacity", "0"); 
    }, function(){  
    $(this).css("background-color", "rgba(255, 255, 255, 0.8)");  
    $("#intro-text3").css("opacity", "1"); 
  });  
  $("#grid-2_2-wrap").hover(function(){  
    $("#grid-2_2").css("background-color", "rgba(0, 0, 0, 0.0)"); 
    $("#intro-text4").css("opacity", "0"); 
    }, function(){  
    $("#grid-2_2").css("background-color", "rgba(0, 0, 0, 0.8)");  
    $("#intro-text4").css("opacity", "1"); 
  }); 
  // parallax render overflow?
  /*
  $("#grid-2_3-wrap").hover(function(){  
    $("#grid-2_3").css("background-color", "rgba(255, 255, 255, 0)"); 
    $("#intro-text5").css("opacity", "0"); 
    }, function(){  
    $("#grid-2_3").css("background-color", "rgba(255, 255, 255, 0.8)");  
    $("#intro-text5").css("opacity", "1"); 
  });
  */ 
});

$(window).on('load', function (e) {
  // console.log("completely loaded");
  animatedObjectCheck();
})

function animatedObjectCheck(){  
  var winTop = $(window).scrollTop();
  // Check all ready-to-appear elements
  $(".ready-to-appear").each(function () {
    var pos = $(this).offset().top;
    if (pos < winTop + window.innerHeight && pos > winTop) {
      $(this).addClass("top-to-center-animation").removeClass("ready-to-appear");
    }
  });
  $(".ready-to-appear2").each(function () {
    var pos = $(this).offset().top;
    if (pos < winTop + window.innerHeight && pos > winTop) {
      $(this).addClass("down-to-center-animation").removeClass("ready-to-appear2");
    }
  });
}
