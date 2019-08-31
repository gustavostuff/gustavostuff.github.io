const goTo = url => window.open(url);

let keanuActivated = false;

const getKeanu = () => document.querySelector('#keanu');

// ugly JS starts

const toggleKeanu = () => {
  keanuActivated = !keanuActivated;

  if (keanuActivated) {
    getKeanu().style.display = 'block';

    const cursorBtn = document.querySelector("#cursor-btn");

    cursorBtn.classList.remove('btn-danger');
    cursorBtn.classList.add('btn-info');
    cursorBtn.innerHTML = 'Normal cursor';

    document.querySelectorAll('*').forEach(item => {
      item.setAttribute('style', 'cursor: none !important');
    });
  } else {
    getKeanu().style.display = 'none';

    const cursorBtn = document.querySelector("#cursor-btn");

    cursorBtn.classList.remove('btn-info');
    cursorBtn.classList.add('btn-danger');
    cursorBtn.innerHTML = 'Keanu cursor';
    
    document.querySelectorAll('*').forEach(item => {
      if (item.getAttribute('id') != 'keanu') {
        item.setAttribute('style', 'cursor: default');
      }
    });
  }
};

// ugly JS ends

;(() => {
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
  
  let chart = new Chart(document.querySelector('#chart'), {
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

  // keanu cursor movement

  const moveKeanu = event => {
    const keanu = getKeanu();

    keanu.style.left = `${event.pageX}px`;
    keanu.style.top = `${event.pageY - 80}px`;
  };

  window.addEventListener("mousemove", moveKeanu, false);

})()
