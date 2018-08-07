var col_template, gallery_row, cur_class;
var gallery_div, gallery_cell_template, gallery_cell_height, cur_class="all";

function filterClass(category_class) {
  cur_class = category_class
  if (cur_class == "all"){
    gallery_row.children().each(function(index) {
        $(this).css({
            "opacity": "1.0"
        })
        //$(this).show()
        $(this).removeClass("d-none").addClass("d-block");
        console.log(index);
    });
  }
  else{
    gallery_row.children().each(function(index) {
        if ($(this).attr("category_class") != cur_class) {
          $(this).css({
              "opacity": "0.0"
          });
          //$(this).hide()
          $(this).removeClass("d-block").addClass("d-none");
          return true;
        }
        $(this).css({
            "opacity": "1.0",
        })
        //$(this).show()
        $(this).removeClass("d-none").addClass("d-block");
    });
  }
  gallery_row.removeClass(gallery_row.attr("cur_class"))
  gallery_row.attr("cur_class", cur_class)
  gallery_row.addClass(cur_class)
}
$(document).ready(function (e) {
  // Debug
  checkDuplicateID();
  // Get elements after document ready.
  col_template = $("#video-template > div").clone();
  gallery_row = $("#gallery_row");

  gallery_div = $("#gallery-div2");
  gallery_cell_template = $("#gallery-cell-template").clone();
  gallery_cell_height = gallery_cell_template.height();
  console.log($("#gallery-cell-template").height())
  //galleryInitial();
  galleryInitial2();
});//------------------------------------------------------------------------

function category(category) {
  cur_category = category;
  filterCategory()
}
function galleryInitial2() {
  gallery_div.children().remove()
  let gallery_videos_len = gallery_videos.length
  for (let i = 0; i < gallery_videos_len; i++) {         
    let cur_gallery_cell = gallery_cell_template.clone();
    console.log(cur_gallery_cell)
    cur_gallery_cell.css({
        "left": (20 + 4) * (i % 4) + 4 + "%",
        "top": (gallery_cell_height + 18) * Math.floor(i / 4)
    });
    // Whole Block Attribute
    cur_gallery_cell.attr("id", "gallery_cell_" + i);

    cur_gallery_cell.appendTo(gallery_div);
  }
  gallery_div.children().each(function(index) {
    console.log($(this))
  });
}
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
    col_cur.attr("category_class", video_category_class)
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
