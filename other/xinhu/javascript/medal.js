var sorting_div, sorting_btn, gallery_div, gallery_cell_template, gallery_cell_height, cur_class="classColorAll";

function filterClassSort() {
  let existed_index = 0;
    gallery_div.children().each(function(index) {
      if ($(this).attr("category_class") != cur_class  && cur_class != "classColorAll") {
        $(this).css({
            "opacity": "0.0"
        });
        $(this).hide()
      }
      else{
        $(this).show()
        // Position
        if (window.matchMedia("(min-width: 992px)").matches){
          $(this).css({
              "opacity": "1.0",
              "left": (19 + 1) * (existed_index % 5) + 0.5 + "%",
              "top": (gallery_cell_height + 18) * Math.floor(existed_index / 5)
          });
        }
        else{
          $(this).css({
              "opacity": "1.0",
              "top": (gallery_cell_height + 18) * existed_index
          });
        }
        existed_index++;
      }
    });
  gallery_div.removeClass(gallery_div.attr("data-cur-class"))
  gallery_div.addClass(cur_class)
  sorting_div.removeClass(gallery_div.attr("data-cur-class"))
  sorting_div.addClass(cur_class)
  sorting_btn.removeClass(gallery_div.attr("data-cur-class"))
  sorting_btn.addClass(cur_class)
  gallery_div.attr("data-cur-class", cur_class)
  if (window.matchMedia("(min-width: 992px)").matches){
    gallery_div.css({
        "height": (gallery_cell_height + 18) * Math.ceil(existed_index / 5)
    })
  }
  else{
    gallery_div.css({
        "height": (gallery_cell_height + 18) * existed_index
    })
  }
}
//------------------------------------------------------------------------
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
function category2class(category) {
  if (category == "健康促進類") {
      return "classColor1"
  } else if (category == "數學類") {
      return "classColor2"
  } else if (category == "民俗體育類") {
      return "classColor3"
  } else if (category == "體育類") {
      return "classColor4"
  } else if (category == "其他") {
      return "classColor5"
  }
}
function changeTopBackground(){
  if (cur_class == "classColorAll") {
    $("#top-div").css("background-image", "url(src/aa10.jpg)")
  } else if (cur_class == "classColor1") {
    $("#top-div").css("background-image", "url(src/kid10.jpg)")
  } else if (cur_class == "classColor2") {
    $("#top-div").css("background-image", "url(src/kid6.jpg)")
  } else if (cur_class == "classColor3") {
    $("#top-div").css("background-image", "url(src/kid7.jpg)")
  } else if (cur_class == "classColor4") {
    $("#top-div").css("background-image", "url(src/aa14.jpg)")
  } else if (cur_class == "classColor5") {
    $("#top-div").css("background-image", "url(src/kid6.jpg)")
  }
}
function filterClass(category_class) {
  cur_class = category_class
  changeTopBackground();
  filterClassSort();
}
function galleryInitial() {
  gallery_div.children().remove()
  let gallery_videos_len = gallery_videos.length
  for (let i = 0; i < gallery_videos_len; i++) {         
    let cur_gallery_cell = gallery_cell_template.clone();
    // Position
    if (window.matchMedia("(min-width: 992px)").matches){
      cur_gallery_cell.css({
          "left": (19 + 1) * (i % 5) + 0.5 + "%",
          "top": (gallery_cell_height + 18) * Math.floor(i / 5)
      });
    }
    else{
      cur_gallery_cell.css({
          "top": (gallery_cell_height + 18) * i
      });
    }
    // Get Metadata
    let cell_category = gallery_videos[i]["類別"];
    let cell_category_class = category2class(cell_category);
    let cell_date = gallery_videos[i]["year"] + "-" + gallery_videos[i]["month"] + "-" + gallery_videos[i]["day"];
    // Whole Block Attribute
    cur_gallery_cell.attr("id", "gallery_cell_" + i);
    cur_gallery_cell.attr("title", gallery_videos[i]["獎項名稱"]);
    cur_gallery_cell.attr("category_class", cell_category_class)
    // Image
    cur_gallery_cell.find("img").attr("src", "src/medal.jpg");
    cur_gallery_cell.find(".modal-link").attr("data-target", "#exampleModal" + i);
    cur_gallery_cell.find(".modal").attr("id", "exampleModal" + i)
    // Description
    cur_gallery_cell.find(".cell-title").text(gallery_videos[i]["獎項名稱"]);
    cur_gallery_cell.find(".cell-rank span").text(gallery_videos[i]["名次"]);
    cur_gallery_cell.find(".cell-rank").attr("title", gallery_videos[i]["名次"]);
    cur_gallery_cell.find(".cell-unit span").text(gallery_videos[i]["頒獎單位"]);
    cur_gallery_cell.find(".cell-unit").attr("title", gallery_videos[i]["頒獎單位"]);
    cur_gallery_cell.find(".cell-date").text(cell_date).attr("title", cell_date);
    cur_gallery_cell.find(".cell-category > button").text(cell_category).addClass(cell_category_class).attr("title", cell_category).attr('onClick',"filterClass('"+ cell_category_class +"')");        

    cur_gallery_cell.appendTo(gallery_div);
  }
  if (window.matchMedia("(min-width: 992px)").matches){
    gallery_div.css({
        "height": (gallery_cell_height + 18) * Math.ceil(gallery_videos_len / 5)
    })
  }
  else{
    gallery_div.css({
        "height": (gallery_cell_height + 18) * gallery_videos_len
    })
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
  gallery_div = $("#gallery-div");
  gallery_cell_template = $("#gallery-cell-template").clone();
  gallery_cell_height = $("#gallery-cell-template").height();
  galleryInitial();
  animatedObjectCheck();
})
