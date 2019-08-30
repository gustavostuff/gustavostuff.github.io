const goTo = url => window.open(url);

(() => {
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
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
          enabled: false
      }
    }
  });
})();
