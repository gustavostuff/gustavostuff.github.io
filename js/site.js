const VIEWPORT_GRANULARITY = 50;
const MAX_POINTS_ALLOWED = 40;

const goTo = url => window.open(url);

const $ = q => {
  let results = document.querySelectorAll(q);
  return results.length == 1 ? results[0] : results;
};

const calculateGranularity = () => {
  let xAxisMin = interactiveChart.scales['x-axis-1'].min;
  let xAxisMax = interactiveChart.scales['x-axis-1'].max;
  let granularity = (xAxisMax - xAxisMin) / VIEWPORT_GRANULARITY;

  return granularity;
};

const refreshCurves = (pts, granularity = 0.1) => {
  let rect = Gordan.getLinearRegressionRect(pts, 1, granularity);
  let curve = Gordan.getQuadraticRegressionCurve(pts, 2, granularity);
  let gradeSixCurve = Gordan.getRegressionPath(pts, 6, granularity);

  interactiveChart.data.datasets[1].data = rect;
  interactiveChart.data.datasets[2].data = curve;
  interactiveChart.data.datasets[3].data = gradeSixCurve;
};

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

let interactiveChart;

const toggleDarkTheme = () => {
  document.querySelector('body').classList.toggle('dark-theme');
};

(() => {
  let pointsCopy = [...points];
  let rect = Gordan.getLinearRegressionRect(pointsCopy);
  let curve = Gordan.getQuadraticRegressionCurve(pointsCopy);
  let gradeSixCurve = Gordan.getRegressionPath(pointsCopy, 6);
  let canvas = $('#chart');

  document.addEventListener("dblclick", function() {
    toggleDarkTheme();
  });

  interactiveChart = new Chart(canvas, {
    type: 'scatter',
    title: 'sddfsdfsf',
    data: {
      datasets: [{
        label: 'The points',
        data: Gordan.normalizePoints(pointsCopy),
        backgroundColor: '#f00'
      }, {
        label: 'Linear regression rect',
        data: rect,
        backgroundColor: 'rgba(204, 0, 0, 0.3)'
      }, {
        label: 'Quadratic regression curve',
        data: curve,
        backgroundColor: 'rgba(0, 126, 51, 0.3)'
      }, {
        label: 'Grade 6 regression curve',
        data: gradeSixCurve,
        backgroundColor: 'rgba(0, 153, 204, 0.3)'
      }]
    },
    options: {
      grid: {
        color: '#f00'
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      onTouchstart: function () {
        alert('test');
      },
      onClick: function (element) {
        if (this.data.datasets[0].data.length >= MAX_POINTS_ALLOWED) {
          alert("OK, that's enough.");
          return;
        }

        let scaleRef, valueX, valueY;

        // transform/translate red points coords
        for (var scaleKey in this.scales) {
          scaleRef = this.scales[scaleKey];

          if (scaleRef.isHorizontal() && scaleKey == 'x-axis-1') {
            valueX = scaleRef.getValueForPixel(element.offsetX);
          } else if (scaleKey == 'y-axis-1') {
            valueY = scaleRef.getValueForPixel(element.offsetY);
          }
        }

        // red points
        this.data.datasets[0].data.push({
          x: valueX,
          y: valueY
        });

        pointsCopy = this.data.datasets[0].data;
        refreshCurves(pointsCopy, calculateGranularity());
        this.update();
      }
    }
  });

  $('#reset-points').onclick = () => {
    let originalPoints = points;
    interactiveChart.data.datasets[0].data = Gordan.normalizePoints(originalPoints);
    refreshCurves(originalPoints);
    interactiveChart.update();
  };

  fetch('https://api.github.com/repos/tavuntu/gooi')
    .then(res => res.json())
    .then(data => document.querySelector('#stars').innerHTML = data.stargazers_count)
    .catch(error => console.error(error));
})();
