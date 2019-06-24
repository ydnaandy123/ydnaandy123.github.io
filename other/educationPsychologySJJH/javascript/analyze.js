let labels, labelSet, score_background;
let general_option = {
  scale: {
    display: true,
    angleLines :{
      display: true,
      lineWidth: 1,
      color: 'rgba(0, 0, 0, 0.3)'
    },
    gridLines: {
      display: true,
      lineWidth: 1,
      color: 'rgba(0, 0, 0, 0.3)',
      borderDash: [5]
    },
    pointLabels: {
      fontSize: 12,
      fontStyle: 'normal',
      fontFamily: '微軟正黑體',
      fontColor: 'rgba(0, 0, 0, 0.7)'
    },
    ticks: {
      display: false,
      max: 5,
      min: 0,
      stepSize: 1,
      fontSize: 12,
      fontColor: 'rgba(0,0,0,0.9)',
      backdropColor: 'rgba(255, 0, 0, 0.0)'
    },
    points: {
      hoverRadius: 6
    }
  },
  legend: {
    display: false
  }
}
function csv2json(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
  for(var i=1;i<lines.length-1;i++){

	  var obj = {};
	  var currentline=lines[i].split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }  
  //return result; //JavaScript object
  //return JSON.stringify(result); //JSON
  return result
}    
function judgeText(input_score){   
  let review_text = ""
  let review_class = ""
  if(input_score >= 4){
    review_text = "良好";
    review_class = "review_blue";
  }else if(input_score >= 2.5){
    review_text = "尚可";
    review_class = "review_green";
  }else{
    review_text = "較弱";
    review_class = "review_red";
  }
  return [review_class, review_text];
}
function selectChart(chart_type){
  if(chart_type=="radar"){
    $(".a4-chart").show();
    $(".a4-chart2").hide();
  }
  else if(chart_type=="skillBar"){
    $(".a4-chart2").show();
    $(".a4-chart").hide();
  }
}
function drawChart(score_id, cur_score_all){  
  let canvas = document.getElementById("canvas_" + score_id);
  let ctx = canvas.getContext('2d');
  let chart = new Chart(ctx, {
      type: 'radar',    
      data: {
          labels: labels,
          datasets: [{
            backgroundColor: 'rgba(244, 204, 116, 0.4)',
            borderColor: 'rgb(244, 204, 116)',
            pointBorderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',            
            pointRadius: 3,
            data: cur_score_all,
          },{
            borderColor: 'rgba(255, 255, 255, 0)',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            pointRadius: 0,
            data: score_background,
        }]
      },    
      // Configuration options go here
      options: general_option
  });
}
function drawChart2(cur_student, score_id, cur_score_all){  
  for(let i=0; i<cur_score_all.length; i++){        
    let cur_skillBar_img = $("#a4-skill-template").clone()
    cur_skillBar_img.attr("id", score_id + "_skillBar_img_" + i);
    cur_skillBar_img.find(".a4-skillBar").css("height", ((1 - cur_score_all[i]/5) * 100 + 20) + "%")
    cur_student.find(".a4-skillbar-imgs").append(cur_skillBar_img);

    let cur_skillBar_name = document.createElement("th");  
    cur_skillBar_name.innerHTML = labels[i]
    cur_student.find(".a4-skillbar-names").append(cur_skillBar_name);
  }
}
function drawChartParallel(score_id, cur_score_all_student, cur_score_all_teacher){  
  let canvas1 = document.getElementById("canvas1_" + score_id);
  let ctx1 = canvas1.getContext('2d');
  let chart1 = new Chart(ctx1, {
      type: 'radar',    
      data: {
          labels: labels,
          datasets: [{
            backgroundColor: 'rgba(244, 204, 116, 0.4)',
            borderColor: 'rgb(244, 204, 116)',
            pointBorderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',            
            pointRadius: 3,
            data: cur_score_all_student,
          },{
            borderColor: 'rgba(255, 255, 255, 0)',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            pointRadius: 0,
            data: score_background,
        }]
      },    
      // Configuration options go here
      options: general_option
  });
  // SECOND CHART
  let canvas2 = document.getElementById("canvas2_" + score_id);
  let ctx2 = canvas2.getContext('2d');
  let chart2 = new Chart(ctx2, {
      type: 'radar',    
      data: {
          labels: labels,
          datasets: [{
            backgroundColor: 'rgba(244, 204, 116, 0.4)',
            borderColor: 'rgb(244, 204, 116)',
            pointBorderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',            
            pointRadius: 3,
            data: cur_score_all_teacher,
          },{
            borderColor: 'rgba(255, 255, 255, 0)',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            pointRadius: 0,
            data: score_background,
        }]
      },    
      // Configuration options go here
      options: general_option
  });
}
function analyzeSummary(){
  let summaryScore = []
  summaryScore.push(calculateWeek(0));
  summaryScore.push(calculateWeek(4));
  let cur_labels = labels;
  analyzeInitial();
  labels = cur_labels;
  // For each student
  for(let i=0; i<summaryScore[0].length; i++){    
    let cur_student = $("#student_container_template").clone()
    cur_student.attr("id", "student_container_" + summaryScore[0][i]["studentID"]);
    let cur_score_all = [];
    // For each answer
    for (let j=0; j<cur_labels.length; j++) {
      let cur_score_weighted = summaryScore[0][i][cur_labels[j]]*0.6 + summaryScore[1][i][cur_labels[j]]*0.4
      cur_score_all.push(cur_score_weighted)
    }
    // Generate Text from score   
    let teacher_review = ""    
    // Generate whole description
    for(let j=0; j<labels.length; j++){
      let review_return;
      review_return = judgeText(cur_score_all[j]);
      teacher_review += labels[j] + ":<span class="+ review_return[0] +">";
      teacher_review += review_return[1];
      if(j!=labels.length-1){
        teacher_review += "</span>，";
      }
      else{
        teacher_review += "</span>。";
      }
    } 
    cur_student.find(".review").html(teacher_review);
    // Edit A4
    cur_student.find(".student_id").text(summaryScore[0][i]["studentName"])
    cur_student.find(".chart_container canvas").attr("id", "canvas_" + summaryScore[0][i]["studentID"]);
    cur_student.appendTo($("#students_container"));     
    // Canvas Radar
    drawChart(summaryScore[0][i]["studentID"], cur_score_all)
    // Canvas SkillBar
    drawChart2(cur_student, summaryScore[0][i]["studentID"], cur_score_all)
    if(document.getElementById("radio_chart_radar").checked) {        
      // Canvas Radar
      cur_student.find(".a4-chart").show();
      cur_student.find(".a4-chart2").hide();
    }
    else if(document.getElementById("radio_chart_skillBar").checked){
      // Canvas SkillBar
      cur_student.find(".a4-chart2").show();
      cur_student.find(".a4-chart").hide();
    }
  }
  // Success
  $("#execution-msg").show();
  $("#execution-msg-correct").show();
  $("#execution-msg-wrong").hide();
  $("#execution-msg-event").text('老師學生加權綜合評量');
}
function analyzeParallel(){
  let summaryScore = []
  let temp_results = calculateWeek(4);
  summaryScore.push(temp_results[0]);
  summaryScore.push(calculateWeek(0)[0]);
  let cur_labels = labels;
  analyzeInitial();
  quizAnalyze(temp_results[1])
  labels = cur_labels;
  // For each student
  for(let i=0; i<summaryScore[0].length; i++){    
    let cur_student = $("#student_container_template").clone()
    cur_student.attr("id", "student_container_" + summaryScore[0][i]["studentID"]);
    let cur_score_all_student = [];
    let cur_score_all_teacher = [];
    // For each answer
    for (let j=0; j<cur_labels.length; j++) {
      cur_score_all_student.push(summaryScore[0][i][cur_labels[j]])
      cur_score_all_teacher.push(summaryScore[1][i][cur_labels[j]])
    }
    // Generate whole description
    for(let j=0; j<labels.length; j++){     
      cur_student.find(".a4-review".concat(j+1, "-name")).text(labels[j]);
      cur_student.find(".a4-review".concat(j+1, "-student")).text(judgeText(cur_score_all_student[j])[1]);
      cur_student.find(".a4-review".concat(j+1, "-teacher")).text(judgeText(cur_score_all_teacher[j])[1]);
    } 
    // Edit A4
    cur_student.find(".student_class").text(summaryScore[0][i]["studentID"].substring(0,3))
    cur_student.find(".student_number").text(summaryScore[0][i]["studentID"].substring(3,5))
    cur_student.find(".student_id").text(summaryScore[0][i]["studentName"])
    cur_student.find(".chart_container1 canvas").attr("id", "canvas1_" + summaryScore[0][i]["studentID"]);
    cur_student.find(".chart_container2 canvas").attr("id", "canvas2_" + summaryScore[0][i]["studentID"]);
    cur_student.appendTo($("#students_container"));     
    // Canvas Radar
    //drawChart(summaryScore[0][i]["studentID"], cur_score_all)
    drawChartParallel(summaryScore[0][i]["studentID"], cur_score_all_student, cur_score_all_teacher);
  }
  // Success
  $("#execution-msg").show();
  $("#execution-msg-correct").show();
  $("#execution-msg-wrong").hide();
  $("#execution-msg-event").text('學生老師並列');
}
function analyze(quizzes, score, week){
  // For each student 
  let all_score_all = []
  for(let i = 0; i < score.length; i++){
    let cur_student = $("#student_container_template").clone()
    cur_student.attr("id", "student_container_" + score[i]["學號"]);
    let cur_score_all = [];
    let cur_score_obj = {'studentName':score[i]["姓名"], 'studentID':score[i]["學號"]}
    // For each answer (in one student response)
    for(let j = 0; j < quizzes.length; j++){
      let cur_score = score[i][quizzes[j]["題目"]]    
      if(quizzes[j]["正面負面"] == "negative"){
        cur_score = 6 - cur_score;
      }
      if(cur_score_obj[quizzes[j]["向度"]]==undefined){
        cur_score_obj[quizzes[j]["向度"]] = parseInt(cur_score);
      }
      else{
        cur_score_obj[quizzes[j]["向度"]] = parseInt(cur_score_obj[quizzes[j]["向度"]]) + parseInt(cur_score);  
      }      
    }   
    // FIX 3 QUIZZES PER FIELD
    for (let i=0; i<labels.length; i++) {
      cur_score_obj[labels[i]] = (cur_score_obj[labels[i]] / 3 ) 
    }    
    // PUT IN
    for (let i=0; i<labels.length; i++) {
      cur_score_all.push(cur_score_obj[labels[i]])
    }
    all_score_all.push(cur_score_obj);
  }
  // Success
  $("#execution-msg").show();
  $("#execution-msg-correct").show();
  $("#execution-msg-wrong").hide();
  if (week==0){
    $("#execution-msg-event").text('老師他評');
  }
  else if(week==4){
    $("#execution-msg-event").text('學生自評');
  }
  return all_score_all;
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
    else if(quizzes[i]["向度"] == "自我情緒覺察"){
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
  //console.log(quizzes)
  // Score background for canvas
  score_background = [5]
  for (let i=1; i<labels.length; i++){
    score_background.push(0)
  }
}
function analyzeInitial(){
  labels = [];
  labelSet = new Set();
  $("#execution-msg").hide();
  $("#students_container").children().remove();
  $(".quiz-preview-area").children().remove();
}
function calculateWeek(week_number){  
  analyzeInitial();
  let quizzes_text, quizzes, score_text, score;
  try{
    quizzes_text = document.getElementById("week"+String(week_number)+"_quiz").value;
    //quizzes = JSON.parse(quizzes_text);
    quizzes = csv2json(quizzes_text);   
    score_text = document.getElementById("week"+String(week_number)+"_score").value;
    //score = JSON.parse(score_text);
    score = csv2json(score_text);
  }
  catch(SyntaxError){    
    $("#execution-msg").show();
    $("#execution-msg-correct").hide();
    $("#execution-msg-wrong").show();
    console.log('err in function calculateWeek()')
    return;
  }
  quizAnalyze(quizzes);
  let all_score_all;
  all_score_all = analyze(quizzes, score, week_number);
  return [all_score_all, quizzes];
}
function inputText(selectNum){
  analyzeInitial();
  if(selectNum == 0){
    document.getElementById("week0_quiz").value = '';
    document.getElementById("week0_score").value = '';    
    document.getElementById("week4_quiz").value = '';
    document.getElementById("week4_score").value = ''; 
  }
  else if(selectNum == 1){    
    document.getElementById("week0_quiz").value = '題目	正面負面	向度\n 1.有同學被排擠或取笑時，會感到難過。	positive	同理他人\n 2.能從別人的談話當中，去分辨對方的情緒狀況。	positive	同理他人\n 3.能夠站在別人的立場，去想想他們的感覺。	positive	同理他人\n 4.跟同學相處融洽。	positive	同儕相處\n 5.喜歡和同學一起做任何事。	positive	同儕相處\n 6.有困難時同學會願意對他伸出援手。	positive	同儕相處\n 7.課程分組時，能配合其他組員，做好自己的本分。	positive	同儕合作\n 8.和別人互動時，會注意應對的禮貌(如:微笑、點頭、專注聆聽、注視對方等)。	positive	同儕合作\n 9.喜歡幫助需要幫助的同學。	positive	同儕合作\n 10.受同學取笑欺負時，不會生氣予以反擊。	positive	衝突處理\n 11.當遇到委屈時，會嘗試與他人溝通。	positive	衝突處理\n 12.課堂上能尊重同學發表的看法，不會取笑同學的發言。	positive	衝突處理\n';
    document.getElementById("week0_score").value = '學號	姓名	1.有同學被排擠或取笑時，會感到難過。	2.能從別人的談話當中，去分辨對方的情緒狀況。	3.能夠站在別人的立場，去想想他們的感覺。	4.跟同學相處融洽。	5.喜歡和同學一起做任何事。	6.有困難時同學會願意對他伸出援手。	7.課程分組時，能配合其他組員，做好自己的本分。	8.和別人互動時，會注意應對的禮貌(如:微笑、點頭、專注聆聽、注視對方等)。	9.喜歡幫助需要幫助的同學。	10.受同學取笑欺負時，不會生氣予以反擊。	11.當遇到委屈時，會嘗試與他人溝通。	12.課堂上能尊重同學發表的看法，不會取笑同學的發言。\n 70301	王童怡	5	2	4	3	1	5	3	2	1	5	3	2\n 70302	白愛綸	4	4	1	5	4	5	4	4	1	4	5	3\n 70303	江若維	2	1	4	5	5	4	2	3	1	4	4	5\n 70304	吳旻潔	5	2	5	2	4	1	3	1	3	1	4	3\n 70305	李若妍	3	2	5	4	4	5	1	4	5	4	2	2\n 70306	林子薰	5	4	4	4	3	5	2	4	4	1	3	1\n 70307	高珮慈	2	1	2	2	2	1	1	2	5	4	5	4\n 70308	陳恩葇	3	2	3	2	3	2	4	5	2	1	1	4\n 70309	董世霈	1	2	4	1	2	3	5	3	1	4	4	5\n 70310	劉俞杉	4	3	5	4	1	4	5	4	4	1	3	2\n 70311	謝怡軒	2	2	1	3	1	4	4	1	2	3	4	4\n 70312	蘇宥安	5	4	4	1	3	1	4	2	4	4	1	2\n 70326	朱威綜	4	2	5	4	5	4	2	5	1	2	4	1\n 70327	何富俊	5	5	2	1	1	4	2	3	2	3	1	4\n 70328	李冠霖	2	3	1	4	4	5	1	1	2	4	3	5\n 70329	林宇晨	3	1	3	1	4	3	4	4	3	5	2	2\n 70330	哈博瀚	1	4	5	4	2	2	5	2	2	1	1	1\n 70331	徐柏睿	1	4	4	5	2	5	2	2	3	2	4	4\n 70332	高丞佑	3	1	4	3	2	5	4	1	2	3	5	1\n 70333	高睿凱	5	4	2	2	4	4	4	4	1	4	5	2\n 70334	曾俊曄	2	2	1	1	1	2	2	3	1	4	4	3\n 70335	黃靖詠	2	3	2	4	2	3	2	1	3	1	4	5\n 70336	葉書瑋	1	2	3	5	2	4	1	4	5	4	2	1\n 70337	鄭丞智	4	1	4	5	3	5	4	2	4	5	3	1\n ';    
    document.getElementById("week4_quiz").value = '題目	正面負面	向度\n 1.當我看到有同學被排擠或取笑時，我會感到難過。	positive	同理他人\n 2.我能從別人的談話當中，去分辨他們的情緒狀況。	positive	同理他人\n 3.我能夠站在別人的立場，去想想他們的感覺。	positive	同理他人\n 4.我跟同學相處融洽。	positive	同儕相處\n 5.我喜歡和同學一起做任何事。	positive	同儕相處\n 6.當我有困難的時候，同學會願意幫助我。	positive	同儕相處\n 7.課程分組時，我會配合其他組員，做好自己的本分。	positive	同儕合作\n 8.和別人互動時，我會注意應對的禮貌(如:微笑、點頭、專注聆聽、注視對方等)。	positive	同儕合作\n 9.我喜歡幫助需要幫助的同學。	positive	同儕合作\n 10.同學取笑我、欺負我的時候，我不會生氣罵回去。	positive	衝突處理\n 11.當我因為別人的話感到生氣時，我會試著告訴他我的想法。	positive	衝突處理\n 12.在課堂上，我能尊重同學的意見，不會隨意取笑同學。	positive	衝突處理\n';
    document.getElementById("week4_score").value = '學號	姓名	1.當我看到有同學被排擠或取笑時，我會感到難過。	2.我能從別人的談話當中，去分辨他們的情緒狀況。	3.我能夠站在別人的立場，去想想他們的感覺。	4.我跟同學相處融洽。	5.我喜歡和同學一起做任何事。	6.當我有困難的時候，同學會願意幫助我。	7.課程分組時，我會配合其他組員，做好自己的本分。	8.和別人互動時，我會注意應對的禮貌(如:微笑、點頭、專注聆聽、注視對方等)。	9.我喜歡幫助需要幫助的同學。	10.同學取笑我、欺負我的時候，我不會生氣罵回去。	11.當我因為別人的話感到生氣時，我會試著告訴他我的想法。	12.在課堂上，我能尊重同學的意見，不會隨意取笑同學。\n 70301	王童怡	4	3	2	4	3	1	3	3	3	3	5	4\n 70302	白愛綸	5	4	4	2	2	3	1	5	4	4	1	2\n 70303	江若維	4	2	5	3	3	1	3	2	1	2	4	1\n 70304	吳旻潔	5	5	2	1	1	4	2	3	2	3	1	4\n 70305	李若妍	2	3	1	4	4	5	1	1	2	4	3	5\n 70306	林子薰	3	1	3	1	4	3	4	4	3	5	2	2\n 70307	高珮慈	1	4	5	4	2	2	5	2	2	1	1	1\n 70308	陳恩葇	4	5	4	2	2	3	2	2	3	2	4	4\n 70309	董世霈	1	4	1	4	1	3	1	1	2	3	5	2\n 70310	劉俞杉	4	4	1	5	4	5	4	4	1	4	5	3\n 70311	謝怡軒	2	1	4	5	5	4	2	3	1	4	4	5\n 70312	蘇宥安	5	2	5	2	4	1	3	1	3	1	4	3\n 70326	朱威綜	3	2	5	4	4	5	1	4	5	4	2	2\n 70327	何富俊	4	5	2	5	5	4	4	5	4	2	2	3\n 70328	李冠霖	2	4	4	4	4	1	1	4	1	4	1	3\n 70329	林宇晨	3	1	5	4	4	1	4	4	1	5	4	5\n 70330	哈博瀚	4	3	2	1	2	4	2	1	4	5	5	4\n 70331	徐柏睿	5	2	3	2	3	1	5	2	5	2	4	1\n 70332	高丞佑	1	1	1	2	4	3	5	4	4	5	4	4\n 70333	高睿凱	2	4	4	3	5	2	2	1	2	2	1	2\n 70334	曾俊曄	3	5	2	2	1	1	3	2	3	3	2	3\n 70335	黃靖詠	1	2	2	3	2	4	1	2	4	1	2	4\n 70336	葉書瑋	4	1	1	2	3	5	4	3	5	4	3	5\n 70337	鄭丞智	2	4	4	1	4	5	2	2	1	2	2	1\n '; 
  }
  else if(selectNum == 2){    
    document.getElementById("week0_quiz").value = '[{"題目":"1.受同學取笑欺負時，會生氣予以反擊","正面負面":"negative","向度":"衝突處理"},{"題目":"2.會盡力完成被分配到的工作","正面負面":"positive","向度":"自我激勵"},{"題目":"3.對現在的自己感到滿意","正面負面":"positive","向度":"自我接納"},{"題目":"4.能正確地表達出自己的情緒","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"5.發脾氣後會感到懊悔","正面負面":"positive","向度":"自我反省"},{"題目":"6.不習慣在不熟的人面前說話","正面負面":"negative","向度":"生活壓力"},{"題目":"7.不好的情緒產生時能積極面對","正面負面":"positive","向度":"情緒管理"},{"題目":"8.能用運動、聽音樂等休閒方式調整自己的心情","正面負面":"positive","向度":"壓力抒發"}]';
    document.getElementById("week0_score").value = '[{"Timestamp":"12/20/2018 8:43:50","學號":80101,"姓名":"劉德華","1.受同學取笑欺負時，會生氣予以反擊":1,"2.會盡力完成被分配到的工作":5,"3.對現在的自己感到滿意":5,"4.能正確地表達出自己的情緒":4,"5.發脾氣後會感到懊悔":5,"6.不習慣在不熟的人面前說話":2,"7.不好的情緒產生時能積極面對":4,"8.能用運動、聽音樂等休閒方式調整自己的心情":5},{"Timestamp":"12/20/2018 8:44:27","學號":80102,"姓名":"張學友","1.受同學取笑欺負時，會生氣予以反擊":5,"2.會盡力完成被分配到的工作":2,"3.對現在的自己感到滿意":4,"4.能正確地表達出自己的情緒":2,"5.發脾氣後會感到懊悔":5,"6.不習慣在不熟的人面前說話":4,"7.不好的情緒產生時能積極面對":2,"8.能用運動、聽音樂等休閒方式調整自己的心情":3},{"Timestamp":"12/20/2018 8:45:55","學號":80103,"姓名":"郭富城","1.受同學取笑欺負時，會生氣予以反擊":3,"2.會盡力完成被分配到的工作":3,"3.對現在的自己感到滿意":2,"4.能正確地表達出自己的情緒":2,"5.發脾氣後會感到懊悔":3,"6.不習慣在不熟的人面前說話":5,"7.不好的情緒產生時能積極面對":2,"8.能用運動、聽音樂等休閒方式調整自己的心情":2}]';    
    document.getElementById("week4_quiz").value = '[{"題目":"1.同學取笑我、欺負我的時候，我會生氣罵回去","正面負面":"negative","向度":"衝突處理"},{"題目":"2.我會盡力完成被分配到的工作","正面負面":"positive","向度":"自我激勵"},{"題目":"3.我對現在的自己感到滿意","正面負面":"positive","向度":"自我接納"},{"題目":"4.我能夠正確地表達出自己的情緒。","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"5.我如果隨便亂發脾氣，事後會很後悔","正面負面":"positive","向度":"自我反省"},{"題目":"6.在不認識的人面前說話，讓我很有壓力","正面負面":"negative","向度":"生活壓力"},{"題目":"7.當我產生不好的情緒時，能積極面對不逃避","正面負面":"positive","向度":"情緒管理"},{"題目":"8.當心情不好時，我會用運動、散步、聽音樂或玩手機等方式讓心情變好","正面負面":"positive","向度":"壓力抒發"}]';
    document.getElementById("week4_score").value = '[{"Timestamp":"12/20/2018 8:47:09","學號":80101,"姓名":"劉德華","1.同學取笑我、欺負我的時候，我會生氣罵回去":2,"2.我會盡力完成被分配到的工作":5,"3.我對現在的自己感到滿意":1,"4.我能夠正確地表達出自己的情緒。":4,"5.我如果隨便亂發脾氣，事後會很後悔":5,"6.在不認識的人面前說話，讓我很有壓力":1,"7.當我產生不好的情緒時，能積極面對不逃避":4,"8.當心情不好時，我會用運動、散步、聽音樂或玩手機等方式讓心情變好":5},{"Timestamp":"12/20/2018 8:47:38","學號":80102,"姓名":"張學友","1.同學取笑我、欺負我的時候，我會生氣罵回去":2,"2.我會盡力完成被分配到的工作":3,"3.我對現在的自己感到滿意":3,"4.我能夠正確地表達出自己的情緒。":2,"5.我如果隨便亂發脾氣，事後會很後悔":4,"6.在不認識的人面前說話，讓我很有壓力":2,"7.當我產生不好的情緒時，能積極面對不逃避":3,"8.當心情不好時，我會用運動、散步、聽音樂或玩手機等方式讓心情變好":3},{"Timestamp":"12/20/2018 8:48:06","學號":80103,"姓名":"郭富城","1.同學取笑我、欺負我的時候，我會生氣罵回去":5,"2.我會盡力完成被分配到的工作":2,"3.我對現在的自己感到滿意":1,"4.我能夠正確地表達出自己的情緒。":2,"5.我如果隨便亂發脾氣，事後會很後悔":4,"6.在不認識的人面前說話，讓我很有壓力":5,"7.當我產生不好的情緒時，能積極面對不逃避":2,"8.當心情不好時，我會用運動、散步、聽音樂或玩手機等方式讓心情變好":2}]'; 
  }
  else if(selectNum == 3){    
    document.getElementById("week0_quiz").value = '[{"題目":"1.覺得同學不能接納他","正面負面":"negative","向度":"同理他人"},{"題目":"2.在團體中屬於比較沉默的學生","正面負面":"negative","向度":"同儕相處"},{"題目":"3.會跟同儕分享心裡的想法","正面負面":"positive","向度":"同儕合作"},{"題目":"4.當遇到困難時，會嘗試看書本找出解決之道","正面負面":"positive","向度":"參照經驗"}]';
    document.getElementById("week0_score").value = '[{"Timestamp":"12/14/2018 15:27:37","學號":70101,"姓名":"王小華","1.覺得同學不能接納他":5,"2.在團體中屬於比較沉默的學生":4,"3.會跟同儕分享心裡的想法":3,"4.當遇到困難時，會嘗試看書本找出解決之道":3},{"Timestamp":"12/14/2018 15:49:03","學號":70102,"姓名":"張大華","1.覺得同學不能接納他":3,"2.在團體中屬於比較沉默的學生":2,"3.會跟同儕分享心裡的想法":1,"4.當遇到困難時，會嘗試看書本找出解決之道":1},{"Timestamp":"12/14/2018 15:49:29","學號":70103,"姓名":"李小花","1.覺得同學不能接納他":5,"2.在團體中屬於比較沉默的學生":5,"3.會跟同儕分享心裡的想法":4,"4.當遇到困難時，會嘗試看書本找出解決之道":1},{"Timestamp":"12/14/2018 15:50:01","學號":70104,"姓名":"林大玲","1.覺得同學不能接納他":2,"2.在團體中屬於比較沉默的學生":1,"3.會跟同儕分享心裡的想法":4,"4.當遇到困難時，會嘗試看書本找出解決之道":1},{"Timestamp":"12/14/2018 15:50:30","學號":70105,"姓名":"陳筱英","1.覺得同學不能接納他":2,"2.在團體中屬於比較沉默的學生":4,"3.會跟同儕分享心裡的想法":5,"4.當遇到困難時，會嘗試看書本找出解決之道":1}]'; 
    document.getElementById("week4_quiz").value = '[{"題目":"2.當我遇到困難時，我會試著從書本中找出解決的方法","正面負面":"positive","向度":"參照經驗"},{"題目":"3.我會跟同學分享心裡的想法","正面負面":"positive","向度":"同儕合作"},{"題目":"4.與別人相處時，我是屬於比較沉默的一方","正面負面":"negative","向度":"同儕相處"},{"題目":"5.我覺得同學不喜歡我","正面負面":"negative","向度":"同理他人"}]';
    document.getElementById("week4_score").value = '[{"Timestamp":"12/14/2018 15:27:37","學號":70101,"姓名":"王小華","2.當我遇到困難時，我會試著從書本中找出解決的方法":4,"3.我會跟同學分享心裡的想法":3,"4.與別人相處時，我是屬於比較沉默的一方":3,"5.我覺得同學不喜歡我":2},{"Timestamp":"12/14/2018 15:49:03","學號":70102,"姓名":"張大華","2.當我遇到困難時，我會試著從書本中找出解決的方法":2,"3.我會跟同學分享心裡的想法":1,"4.與別人相處時，我是屬於比較沉默的一方":1,"5.我覺得同學不喜歡我":3},{"Timestamp":"12/14/2018 15:49:29","學號":70103,"姓名":"李小花","2.當我遇到困難時，我會試著從書本中找出解決的方法":5,"3.我會跟同學分享心裡的想法":4,"4.與別人相處時，我是屬於比較沉默的一方":1,"5.我覺得同學不喜歡我":1},{"Timestamp":"12/14/2018 15:50:01","學號":70104,"姓名":"林大玲","2.當我遇到困難時，我會試著從書本中找出解決的方法":1,"3.我會跟同學分享心裡的想法":4,"4.與別人相處時，我是屬於比較沉默的一方":1,"5.我覺得同學不喜歡我":2},{"Timestamp":"12/14/2018 15:50:30","學號":70105,"姓名":"陳筱英","2.當我遇到困難時，我會試著從書本中找出解決的方法":4,"3.我會跟同學分享心裡的想法":5,"4.與別人相處時，我是屬於比較沉默的一方":1,"5.我覺得同學不喜歡我":1}]';        
  }
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
  $("#ClickMEE2").click();
  $("#ClickMEE").click();
  $("div a[href='#main-body']").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;$('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 300, function () {
        window.location.hash = hash;
      });
    }
  });
});
$(window).on('load', function (e) {
})