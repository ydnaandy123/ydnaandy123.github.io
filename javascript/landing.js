$(document).ready(function (e) {
  // executes when HTML-Document is loaded and DOM is ready  
  console.log("page is loading now");
  $(".navbar a, footer a[href='#landing-wrapper']").on('click', function (event) {
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
  
});

$(window).on('load', function (e) {
  console.log("completely loaded");
  animatedObjectCheck();
})

function animatedObjectCheck(){
  var winTop = $(window).scrollTop();
  // Check all ready-to-appear elements
  $(".ready-to-appear").each(function () {
    var pos = $(this).offset().top;
    if (pos < winTop + window.innerHeight && pos > winTop) {
      $(this).addClass("top-to-center-animation").removeClass("ready-to-appear");
      console.log('hi')
    }
  });
  $(".ready-to-appear2").each(function () {
    var pos = $(this).offset().top;
    if (pos < winTop + window.innerHeight && pos > winTop) {
      $(this).addClass("down-to-center-animation").removeClass("ready-to-appear2");
      console.log('hi')
    }
  });
}
