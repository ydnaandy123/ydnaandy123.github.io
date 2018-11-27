var sorting_div, sorting_btn, gallery_div, gallery_div_row, gallery_cell_template, cur_class="classColorAll";

function sortGallery(sortOrder) {
  if (sortOrder == "newest") {
      gallery_videos.sort(function(b, a) {
      return (a.year != b.year) ? (a.year - b.year) : (a.month != b.month) ? (a.month - b.month) : (a.day != b.day) ? (a.day - b.day) : 0
    })
  } else if (sortOrder == "oldest") {
      gallery_videos.sort(function(a, b) {
      return (a.year != b.year) ? (a.year - b.year) : (a.month != b.month) ? (a.month - b.month) : (a.day != b.day) ? (a.day - b.day) : 0
    })
  }
  galleryInitial();
  filterClassSort();
}
function topCoverChange(){
  $("#top-div img").css({
    "opacity": "0.0"
  });
  if (cur_class=="classColorAll"){
    $("#top-img0").css({
      "opacity": "1.0"
    });
  }
  else if(cur_class=="classColor1"){
    $("#top-img1").css({
      "opacity": "1.0"
    });
  }
  else if(cur_class=="classColor2"){
    $("#top-img2").css({
      "opacity": "1.0"
    });
  }
  else if(cur_class=="classColor3"){
    $("#top-img3").css({
      "opacity": "1.0"
    });
  }
  else if(cur_class=="classColor4"){
    $("#top-img4").css({
      "opacity": "1.0"
    });
  }
  else if(cur_class=="classColor5"){
    $("#top-img5").css({
      "opacity": "1.0"
    });
  }
  else if(cur_class=="classColor6"){
    $("#top-img6").css({
      "opacity": "1.0"
    });
  }
}
function filterClass(category_class) {
  cur_class = category_class
  topCoverChange();
  filterClassSort();
}
function filterClassSort() {
  gallery_div_row.children().each(function(index) {
      if ($(this).attr("category_class") != cur_class  && cur_class != "classColorAll") {
        $(this).css({
          "display": "none"
        });
      }
      else{
        $(this).css({
          "display": "block"
        });
      }
    });
  gallery_div_row.removeClass(gallery_div_row.attr("data-cur-class"))
  gallery_div_row.addClass(cur_class)
  sorting_div.removeClass(gallery_div_row.attr("data-cur-class"))
  sorting_div.addClass(cur_class)
  sorting_btn.removeClass(gallery_div_row.attr("data-cur-class"))
  sorting_btn.addClass(cur_class)
  gallery_div.removeClass(gallery_div_row.attr("data-cur-class"))
  gallery_div.addClass(cur_class)
  gallery_div_row.attr("data-cur-class", cur_class)
}
function galleryInitial() {
  gallery_div_row.children().remove()
  let gallery_videos_len = gallery_videos.length
  for (let i = 0; i < gallery_videos_len; i++) {         
    let cur_gallery_cell = gallery_cell_template.clone();
    // Get Metadata
    let cell_video_id = gallery_videos[i]["ID"];
    let cell_video_url = "http://www.youtube.com/watch?v=" + cell_video_id
    let cell_category = gallery_videos[i]["category"];
    let cell_category_class = category2class(cell_category)
    // Whole Block Attribute
    cur_gallery_cell.attr("id", "gallery_cell_" + i);
    cur_gallery_cell.attr("title", gallery_videos[i]["title"]);
    cur_gallery_cell.attr("category_class", cell_category_class)
    // Image
    cur_gallery_cell.find("a").attr("href", cell_video_url);
    cur_gallery_cell.find("img").attr("src", "https://img.youtube.com/vi/" + cell_video_id + "/mqdefault.jpg");
    // Description
    cur_gallery_cell.find(".cell-title").attr("href", cell_video_url).find("h6").text(gallery_videos[i]["title"]);
    let date_string = gallery_videos[i]["year"] + "-" + gallery_videos[i]["month"] + "-" + gallery_videos[i]["day"];
    cur_gallery_cell.find(".cell-date").text(date_string).attr("title", date_string);
    cur_gallery_cell.find(".cell-category > button").text(cell_category).addClass(cell_category_class).attr("title", cell_category).attr('onClick',"filterClass('"+ cell_category_class +"')");        

    cur_gallery_cell.appendTo(gallery_div_row);
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
$(document).ready(function (e) {
  // Debug
  checkDuplicateID();
  // Smooth Scroll
  $("footer a[href='#top-div']").on('click', function (event) {
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
});
$(window).on('load', function (e) {
    // Pre sort videos newset
    gallery_videos.sort(function(b, a) {
      return (a.year != b.year) ? (a.year - b.year) : (a.month != b.month) ? (a.month - b.month) : (a.day != b.day) ? (a.day - b.day) : 0
    })
    // Get elements after document ready.
    sorting_div = $("#sorting-div");
    sorting_btn = $("#sorting-btn");
    gallery_div_row = $("#gallery-div .container .row");
    gallery_div = $("#gallery-div");
    gallery_cell_template = $("#gallery-cell-template").clone();
    galleryInitial();
    animatedObjectCheck();
})
function category2class(category) {
  if (category == "活動") {
      return "classColor1"
  } else if (category == "體育") {
      return "classColor2"
  } else if (category == "音樂") {
      return "classColor3"
  } else if (category == "美術") {
      return "classColor4"
  } else if (category == "教育") {
      return "classColor5"
  } else if (category == "其他") {
      return "classColor6"
  }
}