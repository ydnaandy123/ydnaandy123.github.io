var col_template, gallery_row;
$(document).ready(function (e) {
  // Debug
  checkDuplicateID();
  // Get elements after document ready.
  col_template = $("#video-template > div").clone();
  gallery_row = $("#gallery-div > .container > .row");
  galleryInitial();
});
function galleryInitial(){
  gallery_row.children().remove();
  let gallery_videos_len = gallery_videos.length
  for (let i = 0; i < gallery_videos_len; i++) {
    let col_cur = col_template.clone()
    let video_id = gallery_videos[i]["ID"];
    let video_category = gallery_videos[i]["category"];
    let video_category_class = category2class(video_category)
    // Whole Block
    col_cur.attr("title", gallery_videos[i]["title"]);
    // Image
    col_cur.find("a").attr("href", "http://www.youtube.com/watch?v=" + video_id);
    col_cur.find("img").attr("src", "https://img.youtube.com/vi/" + video_id + "/mqdefault.jpg");
    // Description
    col_cur.find(".video-title").text(gallery_videos[i]["title"]);
    col_cur.find(".video-date").text(gallery_videos[i]["year"] + "-" + gallery_videos[i]["month"] + "-" + gallery_videos[i]["day"]);
    col_cur.find(".video-category").text(video_category);
    col_cur.appendTo(gallery_row);
  }
}

//------------------------------------------------------------------------
function checkDuplicateID() {
  // Warning Duplicate IDs
  $('[id]').each(function() {
      var ids = $('[id="' + this.id + '"]');
      if (ids.length > 1 && ids[0] == this)
          console.warn('Multiple IDs #' + this.id);
  });
}
// Animation after web loaded
$(window).on('load', function (e) {
  animatedObjectCheck();
})
function animatedObjectCheck(){  
  let winTop = $(window).scrollTop();
  // Check all ready-to-appear elements
  $(".ready-to-appear").each(function () {
    let pos = $(this).offset().top;
    if (pos < winTop + window.innerHeight && pos > winTop) {
      $(this).addClass("top-to-center-animation").removeClass("ready-to-appear");
    }
  });
  $(".ready-to-appear2").each(function () {
    let pos = $(this).offset().top;
    if (pos < winTop + window.innerHeight && pos > winTop) {
      $(this).addClass("down-to-center-animation").removeClass("ready-to-appear2");
    }
  });
}
