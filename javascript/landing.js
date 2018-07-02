$(document).ready(function(e) { 
  // executes when HTML-Document is loaded and DOM is ready  
  console.log("page is loading now"); 
});

$(window).on('load', function(e){
  //when html page complete loaded
  console.log("completely loaded");   
  $("#landing-content").addClass("top-to-center-animation").removeClass("ready-to-appear");
})
$(window).scroll(function() {
  $(".ready-to-appear").each(function(){
    var pos = $(this).offset().top;

    var winTop = $(window).scrollTop();
    if (pos < winTop + 1000) {
      $(this).addClass("top-to-center-animation").removeClass("ready-to-appear");
      console.log('hi')
    }
  });
});
