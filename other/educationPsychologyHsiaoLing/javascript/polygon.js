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


  Chart.defaults.global.defaultFontSize = 5;
  let labels = ["主觀幸福", "生活壓力", "壓力抒發", "自我激勵", "同理他人", "同儕相處", "同儕合作", "衝突處理"];
  let cur_score_all = [5, 3, 5, 8, 5, 5, 8, 5];
  let canvas = document.getElementById("canvas_1");
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
            data: [10, 0, 0, 0, 0,  0, 0, 0],
        }]
      },    
      // Configuration options go here
      options: {
        scale: {
          display: true
        },
        legend: {
            display: false
        }
      }
  });
});
$(window).on('load', function (e) {
})