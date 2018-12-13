function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}
function quizSampleManually(){  
  let quizzes_text = document.getElementById("input_quizzes").value;
  let quizzes = JSON.parse(quizzes_text);
  quizzes.sort(function (a, b) {
    return a["向度"].localeCompare(b["向度"]);
  });
  let quizAreaSet = new Set()
  for(let i=0; i<quizzes.length; i++){
    quizAreaSet.add(quizzes[i]["向度"]);
  }
  let quizAreaArray = Array.from(quizAreaSet);
  let quizSelectSection = $("#quizSelectSection");
  quizSelectSection.children().remove()
  for(let i=0; i<quizAreaArray.length; i++){
    let curArea = quizAreaArray[i];
    let curQuizFiltered = quizzes.filter(function(quiz){return quiz["向度"] ==  curArea});
    // Create node
    let curQuizSection = $("#quizSection_template").clone(true);
    curQuizSection.attr("id", "quizSection" + i);
    curQuizSection.find(".quizCollapse").attr("id", "quizCollapse"+i);
    curQuizSection.find(".quizSection_areaText").text((i+1) + "." +curArea).attr("data-target", "#quizCollapse"+i);    
    
    let curQuizBtnRow = curQuizSection.find(".quizSection_btnRow");
    for(let j=0; j<curQuizFiltered.length; j++){        
      let curQuizBtn = $("#quizButton_template").clone(true);
      curQuizBtn.attr("id", "quizBtn" + i).find("button").text(curQuizFiltered[j]["題目"]);
      curQuizBtnRow.append(curQuizBtn);
    }
    // Whole Block Attribute
    //cur_gallery_cell.attr("id", "gallery_cell_" + i);
    //cur_gallery_cell.attr("title", gallery_videos[i]["title"]);
    //cur_gallery_cell.attr("category_class", cell_category_class)
    // Image
    //cur_gallery_cell.find("a").attr("href", cell_video_url);
    //cur_gallery_cell.find("img").attr("src", "https://img.youtube.com/vi/" + cell_video_id + "/mqdefault.jpg");
    // Description

    quizSelectSection.append(curQuizSection)
  }
}
function quizSample(){
  return;
  let quizzes_text = document.getElementById("input_quizzes").value;
  let quizzes = JSON.parse(quizzes_text);
  quizzes.sort(function (a, b) {
    return a["向度"].localeCompare(b["向度"]);
  });
  // count different field quiz numbers
  return;
  let fields_count = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < quizzes.length; i++) {
    if(quizzes[i]["向度"]=="A"){
      fields_count[0]++;
    }else if(quizzes[i]["向度"]=="B"){
      fields_count[1]++;
    }else if(quizzes[i]["向度"]=="C"){
      fields_count[2]++;
    }else if(quizzes[i]["向度"]=="D"){
      fields_count[3]++;
    }else if(quizzes[i]["向度"]=="E"){
      fields_count[4]++;
    }else if(quizzes[i]["向度"]=="F"){
      fields_count[5]++;
    }else if(quizzes[i]["向度"]=="G"){
      fields_count[6]++;
    }else if(quizzes[i]["向度"]=="H"){
      fields_count[7]++;
    }
  }
  let fields_count_acc = [fields_count[0], fields_count[0]+fields_count[1], fields_count[0]+fields_count[1]+fields_count[2], fields_count[0]+fields_count[1]+fields_count[2]+fields_count[3]
  , fields_count[0]+fields_count[1]+fields_count[2]+fields_count[3]+fields_count[4], fields_count[0]+fields_count[1]+fields_count[2]+fields_count[3]+fields_count[4]+fields_count[5], fields_count[0]+fields_count[1]+fields_count[2]+fields_count[3]+fields_count[4]+fields_count[5]+fields_count[6]];
  // sample 2 from A
  let sampled_quiz_A = [];
  let sample_num = 1;
  while(sampled_quiz_A.length < sample_num){
      var randomnumber = Math.floor(Math.random() * fields_count[0]);
      if(sampled_quiz_A.indexOf(randomnumber) > -1) continue;
      sampled_quiz_A[sampled_quiz_A.length] = randomnumber;
  }
  // sample 2 from B
  let sampled_quiz_B = [];
  while(sampled_quiz_B.length < sample_num){
      var randomnumber = Math.floor(Math.random() * fields_count[1]);
      if(sampled_quiz_B.indexOf(randomnumber) > -1) continue;
      sampled_quiz_B[sampled_quiz_B.length] = randomnumber;
  }
  // sample 2 from C
  let sampled_quiz_C = [];
  while(sampled_quiz_C.length < sample_num){
      var randomnumber = Math.floor(Math.random() * fields_count[2]);
      if(sampled_quiz_C.indexOf(randomnumber) > -1) continue;
      sampled_quiz_C[sampled_quiz_C.length] = randomnumber;
  }
  // sample 2 from D
  let sampled_quiz_D = [];
  while(sampled_quiz_D.length < sample_num){
      var randomnumber = Math.floor(Math.random() * fields_count[3]);
      if(sampled_quiz_D.indexOf(randomnumber) > -1) continue;
      sampled_quiz_D[sampled_quiz_D.length] = randomnumber;
  }
  // sample 2 from E
  let sampled_quiz_E = [];
  while(sampled_quiz_E.length < sample_num){
      var randomnumber = Math.floor(Math.random() * fields_count[4]);
      if(sampled_quiz_E.indexOf(randomnumber) > -1) continue;
      sampled_quiz_E[sampled_quiz_E.length] = randomnumber;
  }
  // sample 2 from F
  let sampled_quiz_F = [];
  while(sampled_quiz_F.length < sample_num){
      var randomnumber = Math.floor(Math.random() * fields_count[5]);
      if(sampled_quiz_F.indexOf(randomnumber) > -1) continue;
      sampled_quiz_F[sampled_quiz_F.length] = randomnumber;
  }
  // sample 2 from G
  let sampled_quiz_G = [];
  while(sampled_quiz_G.length < sample_num){
      var randomnumber = Math.floor(Math.random() * fields_count[6]);
      if(sampled_quiz_G.indexOf(randomnumber) > -1) continue;
      sampled_quiz_G[sampled_quiz_G.length] = randomnumber;
  }
  // sample 2 from H
  let sampled_quiz_H = [];
  while(sampled_quiz_H.length < sample_num){
      var randomnumber = Math.floor(Math.random() * fields_count[7]);
      if(sampled_quiz_H.indexOf(randomnumber) > -1) continue;
      sampled_quiz_H[sampled_quiz_H.length] = randomnumber;
  }
  let sampled_quiz_index = [sampled_quiz_A[0], 
                            sampled_quiz_B[0]+fields_count_acc[0], 
                            sampled_quiz_C[0]+fields_count_acc[1], 
                            sampled_quiz_D[0]+fields_count_acc[2], 
                            sampled_quiz_E[0]+fields_count_acc[3], 
                            sampled_quiz_F[0]+fields_count_acc[4], 
                            sampled_quiz_G[0]+fields_count_acc[5], 
                            sampled_quiz_H[0]+fields_count_acc[6], ];
  // sampled 8 objects
  let sampled_quizzes_obj = [];
  for(let i = 0; i < 8; i++){
    sampled_quizzes_obj.push(quizzes[sampled_quiz_index[i]]);
  } 
  let sampled_quiz_text = "";                 
  for(let i = 0; i < 8; i++){
    sampled_quizzes_obj[i]["題目"]  = String(i+1) + '.' + sampled_quizzes_obj[i]["題目"] ;
    sampled_quiz_text += ("<textarea cols='50' rows='1'>" + sampled_quizzes_obj[i]["題目"] + "</textarea><br/>")
  }                      
  document.getElementById("sampled_quizzes").innerHTML = sampled_quiz_text;
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sampled_quizzes_obj));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "quiz_meta.json");
  //dlAnchorElem.click(); 
  dlAnchorElem.setAttribute("style", "display:block");
  
  $("textarea").on("click", function () {
    $(this).select();
  });
  $("textarea").on("focus", function () {
    $(this).select();
  });
}
$("textarea").on("focus", function () {
  $(this).select();
});
function checkDuplicateID() {
  // Warning Duplicate IDs
  $('[id]').each(function() {
      var ids = $('[id="' + this.id + '"]');
      if (ids.length > 1 && ids[0] == this)
          console.warn('Multiple IDs #' + this.id);
  });
}
$(document).ready(function (e) {
  checkDuplicateID();
  //$("#button_manually").click();
});
$(window).on('load', function (e) {
})