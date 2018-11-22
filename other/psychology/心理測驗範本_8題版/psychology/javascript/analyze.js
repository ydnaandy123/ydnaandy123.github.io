let students_container, student_container;
let labels = ["主觀幸福", "生活壓力", "壓力抒發", "自我激勵", "同理他人", "同儕相處", "同儕合作", "衝突處理"];
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
    let cur_student = student_container.clone()
    let cur_student_id = i;
    //let cur_student_id = "student_" + score[i]["學號"]
    //cur_student.attr("id", cur_student_id);

    let cur_student_score = ""
    for(let j=0; j<labels.length; j++){
      cur_student_score += labels[j];
      cur_student_score += ": ";
      cur_student_score += String(parseFloat(cur_score_all[j]).toFixed(1));
      cur_student_score += ", ";
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
    }    
    //cur_student.find(".student_id").text(String(i+1) + ". " + score[i]["學號"])
    cur_student.find(".student_id").text(String(i+1) + ". ")
    cur_student.find(".student_score").text(cur_student_score)

    cur_student.find(".chart_container canvas").attr("id", "canvas_" + cur_student_id);
    cur_student.appendTo(students_container);    

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
  for(let i = 0; i < score.length; i++){
    let cur_score_all = [0, 0, 0, 0, 0, 0, 0, 0];
    for(let j = 0; j < quizzes.length; j++){
      let cur_score = score[i][quizzes[j]["題目"]]    
      if(quizzes[j]["正面負面"] == "negative"){
        cur_score = 6 - cur_score;
      }
      if(quizzes[j]["向度"] == "A"){
        cur_score_all[0] += cur_score;
      }
      else if(quizzes[j]["向度"] == "B"){
        cur_score_all[1] += cur_score;
      }
      else if(quizzes[j]["向度"] == "C"){
        cur_score_all[2] += cur_score;
      }
      else if(quizzes[j]["向度"] == "D"){
        cur_score_all[3] += cur_score;
      }
      else if(quizzes[j]["向度"] == "E"){
        cur_score_all[4] += cur_score;
      }    
      else if(quizzes[j]["向度"] == "F"){
        cur_score_all[5] += cur_score;
      }  
      else if(quizzes[j]["向度"] == "G"){
        cur_score_all[6] += cur_score;
      }  
      else if(quizzes[j]["向度"] == "H"){
        cur_score_all[7] += cur_score;
      }    
    }   
    summaryScore[week][i] = cur_score_all;
    let cur_student = student_container.clone()
    let cur_student_id = "student_" + score[i]["學號"]
    cur_student.attr("id", cur_student_id);

    let cur_student_score = ""
      console.log(cur_score_all)
    for(let j=0; j<labels.length; j++){
      cur_student_score += labels[j];
      cur_student_score += ": ";
      cur_student_score += String(cur_score_all[j]);
      cur_student_score += ", ";
      let review_text = "";
      let review_class = ""
      if(cur_score_all[j] > 3){
        review_text = "良好";
        review_class = "review_red";
      }else if(cur_score_all[j] > 2){
        review_text = "尚可";
        review_class = "review_green";
      }else{
        review_text = "待加強";
        review_class = "review_blue";
      }
      cur_student.find(".review" + String(j+1)).text(review_text)
      cur_student.find(".review" + String(j+1)).addClass(review_class)
    }    
    cur_student.find(".student_id").text(String(i+1) + ". " + score[i]["學號"])
    //cur_student.find(".student_id").text(String(i+1) + ". " )
    cur_student.find(".student_score").text(cur_student_score)

    cur_student.find(".chart_container canvas").attr("id", "canvas_" + cur_student_id);
    cur_student.appendTo(students_container);    

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
function analyzeInitial(){
  students_container.children().remove()
  $("#quiz_type1").children().remove()
  $("#quiz_type2").children().remove()
  $("#quiz_type3").children().remove()
  $("#quiz_type4").children().remove()
  $("#quiz_type5").children().remove()
  $("#quiz_type6").children().remove()
  $("#quiz_type7").children().remove()
  $("#quiz_type8").children().remove()
}
function quizAnalyze(quizzes){
  for(let i=0; i<quizzes.length; i++){
    let quiz_element = $("<span></span>").text(quizzes[i]["題目"]).addClass("px-2"); 
    if(quizzes[i]["正面負面"] == "negative"){
      quiz_element.addClass("review_red")
    }
    if(quizzes[i]["向度"] == "A"){
      $("#quiz_type1").append(quiz_element)
    }
    else if(quizzes[i]["向度"] == "B"){
      $("#quiz_type2").append(quiz_element)
    }
    else if(quizzes[i]["向度"] == "C"){
      $("#quiz_type3").append(quiz_element)
    }
    else if(quizzes[i]["向度"] == "D"){
      $("#quiz_type4").append(quiz_element)
    }
    else if(quizzes[i]["向度"] == "E"){
      $("#quiz_type5").append(quiz_element)
    }     
    else if(quizzes[i]["向度"] == "F"){
      $("#quiz_type6").append(quiz_element)
    }   
    else if(quizzes[i]["向度"] == "G"){
      $("#quiz_type7").append(quiz_element)
    }   
    else if(quizzes[i]["向度"] == "H"){
      $("#quiz_type8").append(quiz_element)
    }   
  }
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
  students_container = $("#students_container");
  student_container = $("#student_container_template").clone();
  analyzeInitial();
});
$(window).on('load', function (e) {
})