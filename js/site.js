const goTo = url => window.open(url);

  // chart.js stuff:

  let points = [
    [1, 2],
    [1.5, 4],
    [2, 2.4],
    [3, 5],
    [4, 3],
    [5.5, 9.3],
    [5, 6],
    [6, 10],
    [6.5, 8.5],
    [6.5, 13],
    [7, 12.5]
  ];

  let rect = Gordan.getLinearRegressionRect(points);
  let curve = Gordan.getQuadraticRegressionCurve(points);
  let gradeSixCurve = Gordan.getRegressionPath(points, 6);

  let chart = new Chart(document.getElementById('chart'), {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'The points',
        data: Gordan.normalizePoints(points),
        backgroundColor: '#f40'
      }, {
        label: 'Linear regression rect',
        data: rect,
        backgroundColor: '#fcc'
      }, {
        label: 'Quadratic regression curve',
        data: curve,
        backgroundColor: '#cfc'
      }, {
        label: 'Grade 6 regression curve',
        data: gradeSixCurve,
        backgroundColor: '#ccf'
      }]
    },
    options: {
      responsive: false,
      legend: {
        display: false
      },
      tooltips: {
          enabled: false
      }
    }
  });

  // other things

  let cubeIframe = document.getElementById('cube-iframe');
  cubeIframe.setAttribute('src', "https://ruwix.com/widget/3d/?alg=F%20R'%20U2%20M%20x%20Rw%20U+D%20D%3E%3E&colored=F*&solved=B*&setupmoves=F%20R'%20U2%20M%20x%20Rw%20U+D%20D%3E%3E&tweaks=XxX:UFR&hover=4&speed=700&flags=showalg&colors=F:#00ffaf&pov=Fdl&algdisplay=rotations");

  let fightFrame = document.getElementById('fight-iframe');
  fightFrame.setAttribute('src', 'https://www.youtube.com/embed/pgAsbQxWB6w');
  