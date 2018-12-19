let labels = [];
let labelSet = new Set();
let score_background;
let summaryScore = [[], [], [], [], []];
function analyzeSummary(){
  analyzeInitial();
  console.log(summaryScore)
  for(let i = 0; i < summaryScore[0].length; i++){
    let cur_score_all = [0, 0, 0, 0, 0, 0, 0, 0];
    for(let j = 0; j < cur_score_all.length; j++){
      for(let k = 0; k < summaryScore.length; k++){
        let weightedScore = (summaryScore[k][i][j]) * 0.2;
        //if(k!=3){
        //  weightedScore *= 0.5;
        //}
        cur_score_all[j] = (cur_score_all[j]) + weightedScore;
      }
    }
    let cur_student = $("#student_container_template").clone()
    let cur_student_id = i;
    let cur_student_id = "student_" + score[i]["學號"]
    cur_student.attr("id", cur_student_id);

    let cur_student_score = ""
    for(let j=0; j<labels.length; j++){
      cur_student_score += labels[j];
      cur_student_score += ": ";
      cur_student_score += String(parseFloat(cur_score_all[j]).toFixed(1));
      cur_student_score += ", ";
      /*
      let review_text = "";
      let review_class = ""
      if(cur_score_all[j] > 4){
        review_text = "良好";
        review_class = "review_red";
      }else if(cur_score_all[j] > 3){
        review_text = "尚可";
        review_class = "review_green";
      }else{
        review_text = "待加強";
        review_class = "review_blue";
      }
      cur_student.find(".review" + String(j+1)).text(review_text)
      cur_student.find(".review" + String(j+1)).addClass(review_class)
      */
    }    
    //cur_student.find(".student_id").text(String(i+1) + ". " + score[i]["學號"])
    console.log(cur_student_score)
    cur_student.find(".student_id").text(String(i+1) + ". ")
    cur_student.find(".student_score").text(cur_student_score)

    cur_student.find(".chart_container canvas").attr("id", "canvas_" + cur_student_id);
    cur_student.appendTo($("#students_container"));    

    let canvas = document.getElementById("canvas_" + cur_student_id);
    let ctx = canvas.getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'radar',    
        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                pointBorderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                data: cur_score_all,
            },{
              borderColor: 'rgba(255, 255, 255, 0)',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              pointRadius: 0,
              data: [5, 0, 0, 0, 0, 0, 0, 0],
          }]
        },    
        // Configuration options go here
        options: {
          scale: {
            display: 10
          },
          legend: {
              display: false,
          }
        }
    });
  }
}
function analyze(quizzes, score, week){
  // For each student 
  for(let i = 0; i < score.length; i++){
    let cur_student = $("#student_container_template").clone()
    cur_student.attr("id", "student_container_" + score[i]["學號"]);
    let cur_score_all = [];
    let cur_score_obj = {}
    // For each answer (in one student response)
    for(let j = 0; j < quizzes.length; j++){
      let cur_score = score[i][quizzes[j]["題目"]]    
      if(quizzes[j]["正面負面"] == "negative"){
        cur_score = 6 - cur_score;
      }
      cur_score_obj[quizzes[j]["向度"]] = cur_score;
    }   
    for (let i=0; i<labels.length; i++) {
      cur_score_all.push(cur_score_obj[labels[i]])
    }
    //console.log(cur_score_obj, cur_score_all)
    summaryScore[week][i] = cur_score_all;

    // Generate Text from score   
    let teacher_review = ""    
    function judgeText(input_score){   
      let review_text = ""
      let review_class = ""
      if(input_score > 3){
        review_text = "良好";
        review_class = "review_red";
      }else if(input_score > 2){
        review_text = "尚可";
        review_class = "review_green";
      }else{
        review_text = "待加強";
        review_class = "review_blue";
      }
      return [review_class, review_text];
    }
    // Generate whole description
    for(let j=0; j<labels.length-1; j++){
      let review_return;
      review_return = judgeText(cur_score_all[j]);
      teacher_review += labels[j] + ": <span class="+ review_return[0] +">";
      teacher_review += review_return[1];
      teacher_review += "</span>，";
    } 
    // Last one    
    let j=labels.length-1;
    let review_return;
    review_return = judgeText(cur_score_all[j]);
    teacher_review += labels[j] + ": <span class="+ review_return[0] +">";
    teacher_review += review_return[1];
    teacher_review += "</span>，";
    cur_student.find(".review").html(teacher_review);
    
    // Edit A4
    //cur_student.find(".student_id").text(String(i+1) + ". " + score[i]["學號"])
    cur_student.find(".student_id").text(score[i]["姓名"])
    cur_student.find(".chart_container canvas").attr("id", "canvas_" + score[i]["學號"]);
    cur_student.appendTo($("#students_container"));    
    // Canvas
    let canvas = document.getElementById("canvas_" + score[i]["學號"]);
    let ctx = canvas.getContext('2d');
    let chart = new Chart(ctx, {
        type: 'radar',    
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                pointBorderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                data: cur_score_all,
            },{
              borderColor: 'rgba(255, 255, 255, 0)',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              pointRadius: 0,
              data: score_background,
          }]
        },    
        // Configuration options go here
        options: {
          scale: {
            display: 10
          },
          legend: {
              display: false,
          }
        }
    });
  }
}
function quizAnalyze(quizzes){
  for(let i=0; i<quizzes.length; i++){
    let quiz_element = $("<span></span>").text(quizzes[i]["題目"]).addClass("px-2"); 
    if(quizzes[i]["正面負面"] == "negative"){
      quiz_element.addClass("review_red")
    }
    if(quizzes[i]["向度"] == "主觀幸福"){
      $("#quiz_type1").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }
    else if(quizzes[i]["向度"] == "生活壓力"){
      $("#quiz_type2").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }
    else if(quizzes[i]["向度"] == "自我反省"){
      $("#quiz_type3").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }
    else if(quizzes[i]["向度"] == "自我接納"){
      $("#quiz_type4").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }
    else if(quizzes[i]["向度"] == "自我情緒察覺"){
      $("#quiz_type5").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }     
    else if(quizzes[i]["向度"] == "壓力抒發"){
      $("#quiz_type6").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }   
    else if(quizzes[i]["向度"] == "自我激勵"){
      $("#quiz_type7").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }   
    else if(quizzes[i]["向度"] == "參照經驗"){
      $("#quiz_type8").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }       
    else if(quizzes[i]["向度"] == "情緒管理"){
      $("#quiz_type9").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }  
    else if(quizzes[i]["向度"] == "同理他人"){
      $("#quiz_type10").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }  
    else if(quizzes[i]["向度"] == "同儕相處"){
      $("#quiz_type11").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }  
    else if(quizzes[i]["向度"] == "同儕合作"){
      $("#quiz_type12").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }  
    else if(quizzes[i]["向度"] == "衝突處理"){
      $("#quiz_type13").append(quiz_element)
      labelSet.add(quizzes[i]["向度"])    
    }  
  }
  labels = Array.from(labelSet)
  // Score background for canvas
  score_background = [5]
  for (let i=1; i<labels.length; i++){
    score_background.push(0)
  }
  //for(let i=0; i<labels.length; i++){
  //  $("#quiz_type1").addClass("quiz-preview-selected")
  //}
}
function analyzeInitial(){
  $("#students_container").children().remove()
  $(".quiz-preview-area").children().remove()
}
function calculateWeek(week_number){  
  analyzeInitial();
  let quizzes_text = document.getElementById("week"+String(week_number)+"_quiz").value;
  let quizzes = JSON.parse(quizzes_text);
  let score_text = document.getElementById("week"+String(week_number)+"_score").value;
  let score = JSON.parse(score_text);
  quizAnalyze(quizzes);
  analyze(quizzes, score, week_number);
}
function checkDuplicateID() {
  // Warning Duplicate IDs
  $('[id]').each(function() {
      let ids = $('[id="' + this.id + '"]');
      if (ids.length > 1 && ids[0] == this)
          console.warn('Multiple IDs #' + this.id);
  });
}
$(document).ready(function (e) {
  // Debug
  checkDuplicateID();
  $("#ClickMEE").click();
});
$(window).on('load', function (e) {
})