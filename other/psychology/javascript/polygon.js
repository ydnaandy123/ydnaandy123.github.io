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



  let labels = ["社會接納", "人際適應", "幽默感", "同儕關係", "親密友誼", "幽默感", "同儕關係", "親密友誼"];
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
          display: 10
        },
        legend: {
            display: false,
        }
      }
  });

  labels = ["社會接納", "人際適應", "幽默感", "同儕關係", "親密友誼", "親密友誼"];
  cur_score_all = [5, 3, 5, 8, 5, 2];
  canvas = document.getElementById("canvas_2");
  ctx = canvas.getContext('2d');
  chart = new Chart(ctx, {
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
           data: [10, 0, 0, 0, 0, 0],
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

 labels = ["社會接納", "人際適應", "幽默感", "同儕關係", "親密友誼", "親密友誼", "親密友誼"];
 cur_score_all = [5, 3, 5, 8, 5, 2, 6];
 canvas = document.getElementById("canvas_3");
 ctx = canvas.getContext('2d');
 chart = new Chart(ctx, {
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
          data: [10, 0, 0, 0, 0, 0, 0],
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


 labels = ["社會接納", "人際適應", "幽默感", "同儕關係", "親密友誼", "幽默感", "同儕關係", "親密友誼"];
 cur_score_all = [5, 3, 5, 8, 5,  5, 8, 5];
 canvas = document.getElementById("canvas_4");
 ctx = canvas.getContext('2d');
 chart = new Chart(ctx, {
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
          backgroundColor: 'rgba(132, 99, 255, 0.5)',
          borderColor: 'rgb(132, 99, 255)',
          pointBorderColor: 'rgb(132, 99, 255)',
          pointBackgroundColor: 'rgb(132, 99, 255)',
          data: [0, 8, 0 , 3 , 0, 6, 0, 7],
      },{
          borderColor: 'rgba(255, 255, 255, 0)',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          pointRadius: 0,
          data: [10, 0, 0, 0, 0, 0, 0, 0],
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

labels = ["社會接納", "人際適應", "幽默感", "同儕關係", "親密友誼", "親密友誼"];
cur_score_all = [5, 3, 5, 8, 5, 2];
canvas = document.getElementById("canvas_5");
ctx = canvas.getContext('2d');
chart = new Chart(ctx, {
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
         data: [10, 0, 0, 0, 0, 0],
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

labels = ["社會接納", "人際適應", "幽默感", "同儕關係", "親密友誼", "親密友誼", "親密友誼"];
cur_score_all = [5, 3, 5, 8, 5, 2, 6];
canvas = document.getElementById("canvas_6");
ctx = canvas.getContext('2d');
chart = new Chart(ctx, {
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
        data: [10, 0, 0, 0, 0, 0, 0],
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
});
$(window).on('load', function (e) {
})