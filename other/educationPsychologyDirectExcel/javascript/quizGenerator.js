let selectNum = 0;
let sampled_quizzes_obj = [];
function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}
function insertQuiz(event){
  let curQuiz = event.data.curQuiz;
  let selectedTable = $("#selectedTable");
  // Create node
  let curSelectedQuiz = $("#selectedQuiz_template").clone(true);
  curSelectedQuiz.attr("id", "selectedQuiz" + selectNum);
  selectNum = selectNum +1;
  // Show quiz
  curSelectedQuiz.find("textarea").text((selectNum) + "." + curQuiz["題目"])
  selectedTable.append(curSelectedQuiz)
  // Store quiz
  sampled_quizzes_obj.push(curQuiz)
  this.setAttribute("style", "display:none");
}
function confirmSelection(){
  // DEEP COPY
  // https://medium.com/@gamshan001/javascript-deep-copy-for-array-and-object-97e3d4bc401a
  let curSampled_quizzes_obj = sampled_quizzes_obj.slice(0);
  // Adding indices
  for(let i = 0; i < curSampled_quizzes_obj.length; i++){
    curSampled_quizzes_obj[i]["題目"]  = String(i+1) + '.' + curSampled_quizzes_obj[i]["題目"] ;
  }                
  // Download link      
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(curSampled_quizzes_obj));
  let dlAnchorElem = document.getElementById('downloadQuizLink');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "quiz_meta.json");
  dlAnchorElem.click();   
}
function initialQuiz(){
  let quizSelectSection = $("#quizSelectSection");
  quizSelectSection.children().remove()
  $("#selectedTable").children().remove()
  selectNum = 0;
  sampled_quizzes_obj = [];
  return quizSelectSection;
}
function quizSampleManually(){  
  // Initial
  let quizSelectSection = initialQuiz();
  let quizzes_text = document.getElementById("input_quizzes").value;
  let quizzes;
  try{
    quizzes = JSON.parse(quizzes_text);
  }
  catch(SyntaxError){
    return;
  }
  // Sort and check area numbers
  quizzes.sort(function (a, b) {
    return a["向度"].localeCompare(b["向度"]);
  });
  let quizAreaSet = new Set()
  for(let i=0; i<quizzes.length; i++){
    quizAreaSet.add(quizzes[i]["向度"]);
  }
  let quizAreaArray = Array.from(quizAreaSet);
  // Display Quizzes
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
      //curQuizBtn.click(curQuizFiltered[j], insertQuiz());
      curQuizBtn.click({curQuiz: curQuizFiltered[j]}, insertQuiz);
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
  // Display confirm button
  let dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("style", "display:block");
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
function inputText(selectNum){
  let dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("style", "display:none");
  if(selectNum == 0){
    document.getElementById("input_quizzes").value = '';
    initialQuiz();
  }
  else if(selectNum == 1){
    document.getElementById("input_quizzes").value = '[{"題目":"勇於面對困難","正面負面":"positive","向度":"主觀幸福"},{"題目":"很滿意學校生活","正面負面":"positive","向度":"主觀幸福"},{"題目":"在校表現不錯","正面負面":"positive","向度":"主觀幸福"},{"題目":"覺得人生充滿希望","正面負面":"positive","向度":"主觀幸福"},{"題目":"學校生活過得充實","正面負面":"positive","向度":"主觀幸福"},{"題目":"在學校表現得自在又快樂","正面負面":"positive","向度":"主觀幸福"},{"題目":"不習慣在不熟的人面前說話","正面負面":"negative","向度":"生活壓力"},{"題目":"寫考卷時，會感到緊張","正面負面":"negative","向度":"生活壓力"},{"題目":"目前的課業學習造成他的壓力","正面負面":"negative","向度":"生活壓力"},{"題目":"無法跟上老師的上課進度","正面負面":"negative","向度":"生活壓力"},{"題目":"發脾氣後會感到懊悔","正面負面":"positive","向度":"自我反省"},{"題目":"在情緒(喜怒哀樂)發生後，能思考情緒反應後的意義","正面負面":"positive","向度":"自我反省"},{"題目":"能思考自己的情緒表達是否恰當","正面負面":"positive","向度":"自我反省"},{"題目":"對現在的自己感到滿意","正面負面":"positive","向度":"自我接納"},{"題目":"能接納目前的自己","正面負面":"positive","向度":"自我接納"},{"題目":"能接納自己過去所有的正負向經驗","正面負面":"positive","向度":"自我接納"},{"題目":"在情緒(喜怒哀樂)發生後，能坦然面對自己的反應","正面負面":"positive","向度":"自我接納"},{"題目":"相信自己有能力應付目前困擾的事情","正面負面":"positive","向度":"自我接納"},{"題目":"能正確地表達出自己的情緒","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"能掌握自己的情緒變化","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"知道自己表達出來的情緒，不是心裡真正的感覺","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"知道自己因為什麼原因而焦躁不安","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"知道自己的情緒表現是否真實","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"知道自己為什麼開心或生氣","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"能用運動、聽音樂等休閒方式調整自己的心情","正面負面":"positive","向度":"壓力抒發"},{"題目":"難過時仍保持樂觀正向的想法","正面負面":"positive","向度":"壓力抒發"},{"題目":"遇到困難時會主動找家人、師長或好友說心裡的想法","正面負面":"positive","向度":"壓力抒發"},{"題目":"會盡力完成被分配到的工作","正面負面":"positive","向度":"自我激勵"},{"題目":"會盡力完成老師交代的事情","正面負面":"positive","向度":"自我激勵"},{"題目":"能夠改進自己的缺點","正面負面":"positive","向度":"自我激勵"},{"題目":"遇到困難時會自己想辦法解決","正面負面":"positive","向度":"自我激勵"},{"題目":"能夠持之以恆地把事情完成","正面負面":"positive","向度":"自我激勵"},{"題目":"當遇到困難時，會嘗試看書本找出解決之道","正面負面":"positive","向度":"參照經驗"},{"題目":"當產生不好的情緒時，他會尋求他人協助以排解不舒服的感覺","正面負面":"positive","向度":"參照經驗"},{"題目":"當出現和過去類似情緒經驗時，他能及時因應","正面負面":"positive","向度":"參照經驗"},{"題目":"不好的情緒產生時能積極面對","正面負面":"positive","向度":"情緒管理"},{"題目":"不開心時不會遷怒別人","正面負面":"positive","向度":"情緒管理"},{"題目":"與同學發生衝突時，不會口出惡言或動手打人","正面負面":"positive","向度":"情緒管理"},{"題目":"遇到困難能以正向態度面對解決","正面負面":"positive","向度":"情緒管理"},{"題目":"能夠在不同情境下(如被誤會時、與人意見不合時或歡樂時刻)，適當的表現出喜怒哀樂的情緒","正面負面":"positive","向度":"情緒管理"},{"題目":"遇事能心情平靜並理智地處理","正面負面":"positive","向度":"情緒管理"},{"題目":"能適當透過語音、語調或面部表情表達內心的喜悅","正面負面":"positive","向度":"情緒管理"},{"題目":"覺得同學不能接納他","正面負面":"negative","向度":"同理他人"},{"題目":"當同學開心時，能發自內心替同學感到開心","正面負面":"positive","向度":"同理他人"},{"題目":"可以從同學的表情，判別對方的感受","正面負面":"positive","向度":"同理他人"},{"題目":"有同學被排擠或取笑時，會感到難過","正面負面":"positive","向度":"同理他人"},{"題目":"能從別人的談話當中，去分辨對方的情緒狀況","正面負面":"positive","向度":"同理他人"},{"題目":"能夠站在別人的立場，去想想對方的感覺","正面負面":"positive","向度":"同理他人"},{"題目":"會善待並關心比他弱勢的同學","正面負面":"positive","向度":"同理他人"},{"題目":"在團體中屬於比較沉默的學生","正面負面":"negative","向度":"同儕相處"},{"題目":"常常和別人吵架","正面負面":"negative","向度":"同儕相處"},{"題目":"跟同學相處融洽","正面負面":"positive","向度":"同儕相處"},{"題目":"喜歡和同學一起做任何事","正面負面":"positive","向度":"同儕相處"},{"題目":"信賴他人","正面負面":"positive","向度":"同儕相處"},{"題目":"有困難時同學會願意對他伸出援手","正面負面":"positive","向度":"同儕相處"},{"題目":"會跟同儕分享心裡的想法","正面負面":"positive","向度":"同儕合作"},{"題目":"會跟同學一起合作來完成事情","正面負面":"positive","向度":"同儕合作"},{"題目":"會和同學互相分享事情或東西","正面負面":"positive","向度":"同儕合作"},{"題目":"主動參與班上及學校活動","正面負面":"positive","向度":"同儕合作"},{"題目":"課程分組時，能配合其他組員，做好自己的本分","正面負面":"positive","向度":"同儕合作"},{"題目":"班級活動時，能領導同學進行討論並完成任務","正面負面":"positive","向度":"同儕合作"},{"題目":"上課能專心聽講，不影響班級秩序","正面負面":"positive","向度":"同儕合作"},{"題目":"會經過同學同意才使用他人的東西","正面負面":"positive","向度":"同儕合作"},{"題目":"和別人互動時，我會注意應對的禮貌(如:微笑、點頭、專注聆聽、注視對方等)","正面負面":"positive","向度":"同儕合作"},{"題目":"當同學有好表現時，能適時給予讚美","正面負面":"positive","向度":"同儕合作"},{"題目":"有一個以上會一起聊天的朋友","正面負面":"positive","向度":"同儕合作"},{"題目":"喜歡幫助有困難的同學","正面負面":"positive","向度":"同儕合作"},{"題目":"同學難過的時候，會去安慰他","正面負面":"positive","向度":"同儕合作"},{"題目":"接受同學的幫助後，會向他道謝","正面負面":"positive","向度":"同儕合作"},{"題目":"和同學交談時能保持好的語氣","正面負面":"positive","向度":"同儕合作"},{"題目":"接受別人的幫助後能主動表達感謝","正面負面":"positive","向度":"同儕合作"},{"題目":"受同學取笑欺負時，會生氣予以反擊","正面負面":"negative","向度":"衝突處理"},{"題目":"當遇到委屈時，會嘗試與他人溝通","正面負面":"positive","向度":"衝突處理"},{"題目":"和同學發生問題時，會主動想辦法解決","正面負面":"positive","向度":"衝突處理"},{"題目":"課堂上能尊重同學發表的看法，不會取笑同學的發言","正面負面":"positive","向度":"衝突處理"}]'
  }
  else if(selectNum == 2){
    document.getElementById("input_quizzes").value = '[{"題目":"我覺得任何困難都能解決","正面負面":"positive","向度":"主觀幸福"},{"題目":"我很滿意現在的生活","正面負面":"positive","向度":"主觀幸福"},{"題目":"我覺得自己的表現不錯","正面負面":"positive","向度":"主觀幸福"},{"題目":"我覺得生活充滿希望","正面負面":"positive","向度":"主觀幸福"},{"題目":"我覺得生活很充實","正面負面":"positive","向度":"主觀幸福"},{"題目":"我覺得生活自在又快樂","正面負面":"positive","向度":"主觀幸福"},{"題目":"在不認識的人面前說話，讓我很有壓力","正面負面":"negative","向度":"生活壓力"},{"題目":"我在寫考卷時，會感到緊張","正面負面":"negative","向度":"生活壓力"},{"題目":"我覺得目前的課業學習是有壓力的","正面負面":"negative","向度":"生活壓力"},{"題目":"我聽不懂老師上課講解的課本內容","正面負面":"negative","向度":"生活壓力"},{"題目":"我如果隨便亂發脾氣，事後會很後悔","正面負面":"positive","向度":"自我反省"},{"題目":"在情緒(喜怒哀樂)發生後，我能情緒反應後的意義","正面負面":"positive","向度":"自我反省"},{"題目":"我會主動反省自己的情緒表達是否恰當","正面負面":"positive","向度":"自我反省"},{"題目":"我對現在的自己感到滿意","正面負面":"positive","向度":"自我接納"},{"題目":"我能接納目前的自我","正面負面":"positive","向度":"自我接納"},{"題目":"我能接納自己過去所有的正負向經驗","正面負面":"positive","向度":"自我接納"},{"題目":"在情緒(喜怒哀樂)發生後，我能坦然面對自己的反應","正面負面":"positive","向度":"自我接納"},{"題目":"即使現在的情緒讓我困擾，但我相信自己有能力應付","正面負面":"positive","向度":"自我接納"},{"題目":"我能夠正確地表達出自己的情緒。","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"我能掌握自己的情緒變化","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"我知道有時候我表達出來的情緒感覺，不是心裡真正的感覺","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"我知道自己為什麼焦躁不安","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"我知道自己的情緒表現是否真實","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"我知道自己為什麼開心或生氣","正面負面":"positive","向度":"自我情緒覺察"},{"題目":"當心情不好時，我會用運動、散步、聽音樂或玩手機等方式讓心情變好","正面負面":"positive","向度":"壓力抒發"},{"題目":"難過的時候，我會想一些開心的事情","正面負面":"positive","向度":"壓力抒發"},{"題目":"遇到困難時，我會主動找家人、師長或好友說心裡的想法","正面負面":"positive","向度":"壓力抒發"},{"題目":"我會盡力完成被分配到的工作","正面負面":"positive","向度":"自我激勵"},{"題目":"我會盡力完成老師交代的事情","正面負面":"positive","向度":"自我激勵"},{"題目":"我能夠改進自己的缺點","正面負面":"positive","向度":"自我激勵"},{"題目":"遇到困難，我會想辦法解決","正面負面":"positive","向度":"自我激勵"},{"題目":"我能夠持之以恆地把事情完成","正面負面":"positive","向度":"自我激勵"},{"題目":"當我遇到困難時，我會試著從書本中找出解決的方法","正面負面":"positive","向度":"參照經驗"},{"題目":"當我有不好情緒反應時，會尋求他人協助以排除不舒服感","正面負面":"positive","向度":"參照經驗"},{"題目":"當出現和過去類似情緒經驗時，我能回想所學的因應方式","正面負面":"positive","向度":"參照經驗"},{"題目":"當我產生不好的情緒時，能積極面對不逃避","正面負面":"positive","向度":"情緒管理"},{"題目":"我不開心時，不會遷怒別人","正面負面":"positive","向度":"情緒管理"},{"題目":"我與同學發生衝突時，不會口出惡言或動手打人","正面負面":"positive","向度":"情緒管理"},{"題目":"當我遇到困難時，我能以正向態度面對解決","正面負面":"positive","向度":"情緒管理"},{"題目":"我能夠在不同情境下(如被誤會時、與人意見不合時或歡樂時刻)，適當的表現出喜怒哀樂的情緒","正面負面":"positive","向度":"情緒管理"},{"題目":"我遇事心情平靜，能理智地分析表達","正面負面":"positive","向度":"情緒管理"},{"題目":"我能透過語音、語調或面部表情表達內心的喜悅","正面負面":"positive","向度":"情緒管理"},{"題目":"我覺得同學不喜歡我","正面負面":"negative","向度":"同理他人"},{"題目":"當同學開心時，我也會替對方感到開心","正面負面":"positive","向度":"同理他人"},{"題目":"我看到同學的表情，我可以知道他生氣了","正面負面":"positive","向度":"同理他人"},{"題目":"當我看到有同學被排擠或取笑時，我會感到難過","正面負面":"positive","向度":"同理他人"},{"題目":"我能從別人的談話當中，去分辨他們的情緒狀況","正面負面":"positive","向度":"同理他人"},{"題目":"我能夠站在別人的立場，去想想他們的感覺","正面負面":"positive","向度":"同理他人"},{"題目":"我會善待並關心那些比我不幸的同學","正面負面":"positive","向度":"同理他人"},{"題目":"與別人相處時，我是屬於比較沉默的一方","正面負面":"negative","向度":"同儕相處"},{"題目":"我常常和別人吵架","正面負面":"negative","向度":"同儕相處"},{"題目":"我跟同學相處融洽","正面負面":"positive","向度":"同儕相處"},{"題目":"我喜歡和同學一起做任何事","正面負面":"positive","向度":"同儕相處"},{"題目":"我相信同學告訴我的事","正面負面":"positive","向度":"同儕相處"},{"題目":"當我有困難的時候，同學會願意幫助我","正面負面":"positive","向度":"同儕相處"},{"題目":"我會跟同學分享心裡的想法","正面負面":"positive","向度":"同儕合作"},{"題目":"我會跟同學一起合作來完成事情","正面負面":"positive","向度":"同儕合作"},{"題目":"我會和同學互相分享事情或東西","正面負面":"positive","向度":"同儕合作"},{"題目":"我會主動參與班上與學校活動","正面負面":"positive","向度":"同儕合作"},{"題目":"課程分組時，我會配合其他組員，做好自己的本分","正面負面":"positive","向度":"同儕合作"},{"題目":"在班級活動的時候，我能帶領同學進行討論並完成任務","正面負面":"positive","向度":"同儕合作"},{"題目":"上課時，我會專心聽講，不會影響班級秩序","正面負面":"positive","向度":"同儕合作"},{"題目":"我會經過同學同意後才使用他的東西","正面負面":"positive","向度":"同儕合作"},{"題目":"和別人互動時，我會注意應對的禮貌(如:微笑、點頭、專注聆聽、注視對方等)","正面負面":"positive","向度":"同儕合作"},{"題目":"在團體競賽或課程活動中，同學有好表現時，我會給予讚美","正面負面":"positive","向度":"同儕合作"},{"題目":"在學校裡，我有一個以上可以一起聊天的朋友","正面負面":"positive","向度":"同儕合作"},{"題目":"我喜歡幫助有困難的同學","正面負面":"positive","向度":"同儕合作"},{"題目":"同學難過時，我會去安慰他(她)","正面負面":"positive","向度":"同儕合作"},{"題目":"接受同學的幫助後，我會向他道謝","正面負面":"positive","向度":"同儕合作"},{"題目":"和同學交談時，我會保持好的語氣","正面負面":"positive","向度":"同儕合作"},{"題目":"在接受別人的幫助後，我會表達感謝","正面負面":"positive","向度":"同儕合作"},{"題目":"同學取笑我、欺負我的時候，我會生氣罵回去","正面負面":"negative","向度":"衝突處理"},{"題目":"當我因為別人的話感到生氣時，我會試著告訴他我的想法","正面負面":"positive","向度":"衝突處理"},{"題目":"當我和同學發生問題時，我會嘗試去解決","正面負面":"positive","向度":"衝突處理"},{"題目":"在課堂上，我能尊重同學的意見，不會隨意取笑同學","正面負面":"positive","向度":"衝突處理"}]'
  }
}
$("textarea").on("focus", function () {
  $(this).select();
});
function checkDuplicateID() {
  // Warning Duplicate IDs
  $('[id]').each(function() {
      let ids = $('[id="' + this.id + '"]');
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