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
function quizSample(){
  
  let quizzes_text = document.getElementById("input_quizzes").value;
  let quizzes = JSON.parse(quizzes_text);
  // count different field quiz numbers
  let fields_count = [0, 0, 0, 0, 0];
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
    }
  }
  let fields_count_acc = [fields_count[0], fields_count[0]+fields_count[1], fields_count[0]+fields_count[1]+fields_count[2], fields_count[0]+fields_count[1]+fields_count[2]+fields_count[3]];
  // sample 2 from A
  let sampled_quiz_A = [];
  while(sampled_quiz_A.length < 2){
      var randomnumber = Math.floor(Math.random() * fields_count[0]);
      if(sampled_quiz_A.indexOf(randomnumber) > -1) continue;
      sampled_quiz_A[sampled_quiz_A.length] = randomnumber;
  }
  // sample 2 from B
  let sampled_quiz_B = [];
  while(sampled_quiz_B.length < 2){
      var randomnumber = Math.floor(Math.random() * fields_count[1]);
      if(sampled_quiz_B.indexOf(randomnumber) > -1) continue;
      sampled_quiz_B[sampled_quiz_B.length] = randomnumber;
  }
  // sample 2 from C
  let sampled_quiz_C = [];
  while(sampled_quiz_C.length < 2){
      var randomnumber = Math.floor(Math.random() * fields_count[2]);
      if(sampled_quiz_C.indexOf(randomnumber) > -1) continue;
      sampled_quiz_C[sampled_quiz_C.length] = randomnumber;
  }
  // sample 2 from D
  let sampled_quiz_D = [];
  while(sampled_quiz_D.length < 2){
      var randomnumber = Math.floor(Math.random() * fields_count[3]);
      if(sampled_quiz_D.indexOf(randomnumber) > -1) continue;
      sampled_quiz_D[sampled_quiz_D.length] = randomnumber;
  }
  // sample 2 from E
  let sampled_quiz_E = [];
  while(sampled_quiz_E.length < 2){
      var randomnumber = Math.floor(Math.random() * fields_count[4]);
      if(sampled_quiz_E.indexOf(randomnumber) > -1) continue;
      sampled_quiz_E[sampled_quiz_E.length] = randomnumber;
  }
  let sampled_quiz_index = [sampled_quiz_A[0], sampled_quiz_A[1],
                            sampled_quiz_B[0]+fields_count_acc[0], sampled_quiz_B[1]+fields_count_acc[0],
                            sampled_quiz_C[0]+fields_count_acc[1], sampled_quiz_C[1]+fields_count_acc[1],
                            sampled_quiz_D[0]+fields_count_acc[2], sampled_quiz_D[1]+fields_count_acc[2],
                            sampled_quiz_E[0]+fields_count_acc[3], sampled_quiz_E[1]+fields_count_acc[3]];
  // sampled 10 objects
  let sampled_quizzes_obj = [];
  for(let i = 0; i < 10; i++){
    sampled_quizzes_obj.push(quizzes[sampled_quiz_index[i]]);
  }                      
  console.log(shuffle(sampled_quizzes_obj));    
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sampled_quizzes_obj));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "quiz_meta.json");
  //dlAnchorElem.click(); 
  dlAnchorElem.setAttribute("style", "display:block");
  let sampled_quiz_text = "";
  for(let i = 0; i < 10; i++){
    sampled_quiz_text += (String(i+1) + "." + sampled_quizzes_obj[i]["題目"] + "<br/>")
  }
  document.getElementById("sampled_quizzes").innerHTML = sampled_quiz_text;
}
function checkDuplicateID() {
  // Warning Duplicate IDs
  $('[id]').each(function() {
      var ids = $('[id="' + this.id + '"]');
      if (ids.length > 1 && ids[0] == this)
          console.warn('Multiple IDs #' + this.id);
  });
}
$(document).ready(function (e) {
  // Debug
  checkDuplicateID();
});
$(window).on('load', function (e) {
})