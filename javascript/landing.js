$(document).ready(function(e) { 
  // executes when HTML-Document is loaded and DOM is ready  
  console.log("page is loading now"); 
});

$(window).on('load', function(e){
  console.log("completely loaded");   
  if ($(window).scrollTop() < window.innerHeight){
    $("#landing-content").addClass("top-to-center-animation").removeClass("ready-to-appear");
  }  
})
$(window).scroll(function() {
  $(".ready-to-appear").each(function(){
    var pos = $(this).offset().top;
    var winTop = $(window).scrollTop();
    if (pos < winTop +  window.innerHeight && pos > winTop) {
      $(this).addClass("top-to-center-animation").removeClass("ready-to-appear");
      console.log('hi')
    }
  });
});
