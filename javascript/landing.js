$(document).ready(function (e) {
  // executes when HTML-Document is loaded and DOM is ready  
  console.log("page is loading now");
});

$(window).on('load', function (e) {
  console.log("completely loaded");
  if ($(window).scrollTop() < window.innerHeight) {
    $("#landing-content").addClass("top-to-center-animation").removeClass("ready-to-appear");
  }
})
$(window).scroll(function () {
  var winTop = $(window).scrollTop();
  $(".ready-to-appear").each(function () {
    var pos = $(this).offset().top;
    if (pos < winTop + window.innerHeight && pos > winTop) {
      $(this).addClass("top-to-center-animation").removeClass("ready-to-appear");
      console.log('hi')
    }
  });
  if (winTop < window.innerHeight / 2){
    //$("#testt").css({"opacity" : "1.0"})
    $("#testt").css({"background-color" : "rgba(255, 255, 255, 0.6)"});
  } else{
    //$("#testt").css({"opacity" : "0.3"})
    $("#testt").css({"background-color" : "rgba(227, 242, 253, 0.4)"});
  }
  
  
});
