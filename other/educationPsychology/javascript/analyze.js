let labels, labelSet, score_background;
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
    function judgeText(input_score){   
      let review_text = ""
      let review_class = ""
      if(input_score > 3){
        review_text = "良好";
        review_class = "review_blue";
      }else if(input_score > 2){
        review_text = "尚可";
        review_class = "review_green";
      }else{
        review_text = "危險";
        review_class = "review_red";
      }
      return [review_class, review_text];
    }
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
      cur_score_obj[quizzes[j]["向度"]] = cur_score;
    }   
    for (let i=0; i<labels.length; i++) {
      cur_score_all.push(cur_score_obj[labels[i]])
    }
    // Generate Text from score   
    let teacher_review = ""    
    function judgeText(input_score){   
      let review_text = ""
      let review_class = ""
      if(input_score > 3){
        review_text = "良好";
        review_class = "review_blue";
      }else if(input_score > 2){
        review_text = "尚可";
        review_class = "review_green";
      }else{
        review_text = "危險";
        review_class = "review_red";
      }
      return [review_class, review_text];
    }
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
    cur_student.find(".student_id").text(score[i]["姓名"])
    cur_student.find(".chart_container canvas").attr("id", "canvas_" + score[i]["學號"]);
    cur_student.appendTo($("#students_container"));     
    // Canvas Radar
    drawChart(score[i]["學號"], cur_score_all)
    // Canvas SkillBar
    drawChart2(cur_student, score[i]["學號"], cur_score_all)
    if(document.getElementById("radio_chart_radar").checked) {        
      // Canvas Radar
      //drawChart(score[i]["學號"], cur_score_all)
      cur_student.find(".a4-chart").show();
      cur_student.find(".a4-chart2").hide();
    }
    else if(document.getElementById("radio_chart_skillBar").checked){
      // Canvas SkillBar
      //drawChart2(cur_student, score[i]["學號"], cur_score_all)
      cur_student.find(".a4-chart2").show();
      cur_student.find(".a4-chart").hide();
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
  labels.sort();
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
    quizzes = JSON.parse(quizzes_text);
    score_text = document.getElementById("week"+String(week_number)+"_score").value;
    score = JSON.parse(score_text);
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
  return all_score_all;
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
    document.getElementById("week0_quiz").value = '[{"題目":"1.覺得同學不能接納他","正面負面":"negative","向度":"同理他人"},{"題目":"2.在團體中屬於比較沉默的學生","正面負面":"negative","向度":"同儕相處"},{"題目":"3.會跟同儕分享心裡的想法","正面負面":"positive","向度":"同儕合作"},{"題目":"4.當遇到困難時，會嘗試看書本找出解決之道","正面負面":"positive","向度":"參照經驗"},{"題目":"5.勇於面對困難","正面負面":"positive","向度":"主觀幸福"}]';
    document.getElementById("week0_score").value = '[{"Timestamp":"12/14/2018 15:27:37","學號":70101,"姓名":"王小華","1.覺得同學不能接納他":5,"2.在團體中屬於比較沉默的學生":4,"3.會跟同儕分享心裡的想法":3,"4.當遇到困難時，會嘗試看書本找出解決之道":3,"5.勇於面對困難":2},{"Timestamp":"12/14/2018 15:49:03","學號":70102,"姓名":"張大華","1.覺得同學不能接納他":3,"2.在團體中屬於比較沉默的學生":2,"3.會跟同儕分享心裡的想法":1,"4.當遇到困難時，會嘗試看書本找出解決之道":1,"5.勇於面對困難":3},{"Timestamp":"12/14/2018 15:49:29","學號":70103,"姓名":"李小花","1.覺得同學不能接納他":5,"2.在團體中屬於比較沉默的學生":5,"3.會跟同儕分享心裡的想法":4,"4.當遇到困難時，會嘗試看書本找出解決之道":1,"5.勇於面對困難":1},{"Timestamp":"12/14/2018 15:50:01","學號":70104,"姓名":"林大玲","1.覺得同學不能接納他":2,"2.在團體中屬於比較沉默的學生":1,"3.會跟同儕分享心裡的想法":4,"4.當遇到困難時，會嘗試看書本找出解決之道":1,"5.勇於面對困難":2},{"Timestamp":"12/14/2018 15:50:30","學號":70105,"姓名":"陳筱英","1.覺得同學不能接納他":2,"2.在團體中屬於比較沉默的學生":4,"3.會跟同儕分享心裡的想法":5,"4.當遇到困難時，會嘗試看書本找出解決之道":1,"5.勇於面對困難":1}]';    
    document.getElementById("week4_quiz").value = '[{"題目":"1.我覺得任何困難都能解決","正面負面":"positive","向度":"主觀幸福"},{"題目":"2.當我遇到困難時，我會試著從書本中找出解決的方法","正面負面":"positive","向度":"參照經驗"},{"題目":"3.我會跟同學分享心裡的想法","正面負面":"positive","向度":"同儕合作"},{"題目":"4.與別人相處時，我是屬於比較沉默的一方","正面負面":"negative","向度":"同儕相處"},{"題目":"5.我覺得同學不喜歡我","正面負面":"negative","向度":"同理他人"}]';
    document.getElementById("week4_score").value = '[{"Timestamp":"12/14/2018 15:27:37","學號":70101,"姓名":"王小華","1.我覺得任何困難都能解決":5,"2.當我遇到困難時，我會試著從書本中找出解決的方法":4,"3.我會跟同學分享心裡的想法":3,"4.與別人相處時，我是屬於比較沉默的一方":3,"5.我覺得同學不喜歡我":2},{"Timestamp":"12/14/2018 15:49:03","學號":70102,"姓名":"張大華","1.我覺得任何困難都能解決":3,"2.當我遇到困難時，我會試著從書本中找出解決的方法":2,"3.我會跟同學分享心裡的想法":1,"4.與別人相處時，我是屬於比較沉默的一方":1,"5.我覺得同學不喜歡我":3},{"Timestamp":"12/14/2018 15:49:29","學號":70103,"姓名":"李小花","1.我覺得任何困難都能解決":5,"2.當我遇到困難時，我會試著從書本中找出解決的方法":5,"3.我會跟同學分享心裡的想法":4,"4.與別人相處時，我是屬於比較沉默的一方":1,"5.我覺得同學不喜歡我":1},{"Timestamp":"12/14/2018 15:50:01","學號":70104,"姓名":"林大玲","1.我覺得任何困難都能解決":2,"2.當我遇到困難時，我會試著從書本中找出解決的方法":1,"3.我會跟同學分享心裡的想法":4,"4.與別人相處時，我是屬於比較沉默的一方":1,"5.我覺得同學不喜歡我":2},{"Timestamp":"12/14/2018 15:50:30","學號":70105,"姓名":"陳筱英","1.我覺得任何困難都能解決":2,"2.當我遇到困難時，我會試著從書本中找出解決的方法":4,"3.我會跟同學分享心裡的想法":5,"4.與別人相處時，我是屬於比較沉默的一方":1,"5.我覺得同學不喜歡我":1}]'; 
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
  //$("#ClickMEE2").click();
  //$("#ClickMEE").click();
  $("div a[href='#main-body']").on('click', function (event) {
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
})