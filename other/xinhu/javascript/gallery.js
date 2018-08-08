var gallery_div, gallery_cell_template, gallery_cell_height, cur_class="all";

function filterClass(category_class) {
  cur_class = category_class
  if (cur_class == "all"){
    gallery_div.children().each(function(index) {
      console.log(index);
        $(this).css({
            "opacity": "1.0"
        })
        //$(this).show()
    });
  }
  else{
    gallery_div.children().each(function(index) {
        if ($(this).attr("category_class") != cur_class) {
          $(this).css({
              "opacity": "0.0"
          });
          //$(this).hide()
        }
        else{
          $(this).css({
              "opacity": "1.0",
          })
          //$(this).show()
        }
    });
  }
  gallery_div.removeClass(gallery_div.attr("cur_class"))
  gallery_div.attr("cur_class", cur_class)
  gallery_div.addClass(cur_class)
}
$(document).ready(function (e) {
  // Debug
  checkDuplicateID();
  // Get elements after document ready.
  gallery_div = $("#gallery-div2");
  gallery_cell_template = $("#gallery-cell-template").clone();
  gallery_cell_height = $("#gallery-cell-template").height();
  galleryInitial();
});//------------------------------------------------------------------------

function category(category) {
  cur_category = category;
  filterCategory()
}
function galleryInitial() {
  gallery_div.children().remove()
  let gallery_videos_len = gallery_videos.length
  for (let i = 0; i < gallery_videos_len; i++) {         
    let cur_gallery_cell = gallery_cell_template.clone();
    // Position
    if (window.matchMedia("(min-width: 992px)").matches){
      cur_gallery_cell.css({
          "left": (20 + 4) * (i % 4) + 4 + "%",
          "top": (gallery_cell_height + 18) * Math.floor(i / 4)
      });
    }
    else{
      cur_gallery_cell.css({
          "left": "4%",
          "top": (gallery_cell_height + 18) * i
      });
    }
    // Get Metadata
    let cell_video_id = gallery_videos[i]["ID"];
    let cell_category = gallery_videos[i]["category"];
    let cell_category_class = category2class(cell_category)
    // Whole Block Attribute
    cur_gallery_cell.attr("id", "gallery_cell_" + i);
    cur_gallery_cell.attr("title", gallery_videos[i]["title"]);
    cur_gallery_cell.attr("category_class", cell_category_class)

    cur_gallery_cell.appendTo(gallery_div);
  }
}
/*
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
*/
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
