const goTo = url => window.open(url);

const $ = q => {
  let results = document.querySelectorAll(q);
  return results.length == 1 ? results[0] : results;
};

const getKeanuCursor = () => $('#keanu');

const toggleKeanu = value => {
  getKeanuCursor().style.display = value ? 'block' : 'none';
  $('#keanu-btn').style.display = value ? 'none' : 'inline-block';
  $('#not-keanu-btn').style.display = value ? 'inline-block' : 'none';
};

const verifyNotMobile = () => {
  if (
    !(navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    )
  ) {
    $('#keanu-btn').style.display = 'inline-block';
  } else {
    $('.keanu-zone').remove();
    $('#find-keanu-span').remove();
  }
};

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

  new Chart($('#chart'), {
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
    const keanu = getKeanuCursor();

    if (keanu.style.display != 'none') {
      keanu.style.left = `${event.pageX}px`;
      keanu.style.top = `${event.pageY - 80}px`;
    }
  };

  window.addEventListener('mousemove', moveKeanu, false);

  verifyNotMobile();
})();
