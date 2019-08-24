const Gordan = {
  addRows(row1, row2, invert1, invert2) {
    let row3 = []

    row3 = row1.map((item, i) => {
      return row1[i] * (invert1 ? -1 : 1) + row2[i] * (invert2 ? -1 : 1)
    })

    return row3
  },
  multiplyRow(row, value) {
    return row.map(item => item * value)
  },
  divideRow(row, value) {
    return row.map(item => item / value)
  },
  short(n, decimals = 3) {
    return Number(n.toFixed(decimals))
  },
  fixedPrecisionMatrix(m) {
    return m.map(item => (
      [
        ...item.splice(0, item.length - 1),
        this.short(item[item.length - 1], 8)
      ]
    ))
  },
  solveByGaussJordan(matrix, index) {
    if (index == matrix.length) {
      return this.fixedPrecisionMatrix(matrix)
    }

    let m = [...matrix]
    let i = index || 0
    let currentRow = m[i]
    let pivot = currentRow[i]

    m[i] = this.divideRow(currentRow, pivot)

    m = m.map((item, mapIndex) => {
      if (mapIndex == i) { // ignore already processed row
        return item
      } else {
        return this.addRows(this.multiplyRow(m[i], -item[i]), item)
      }
    })

    // todo: check for not solvable equations (values like NaN, Infinity, etc.)

    return this.solveByGaussJordan(m, i + 1)
  },
  getSymbolValues(matrix) {
    return this.solveByGaussJordan(matrix).map(row => {
      return row[row.length - 1]
    })
  },
  normalizePoints(points) {
    return points.map(item => {
      return {
        x: item.x || item[0],
        y: item.y || item[1]
      }
    })
  },
  getRegressionCoefficient(rowIndex, power, points) {
    let pts = this.normalizePoints(points)

    return pts.map(p => {
      return Math.pow(p.x, power + rowIndex)
    }).reduce((a, b) => a + b)
  },
  getRegressionResult(power, points) {
    let pts = this.normalizePoints(points)

    return pts.map(p => {
      return Math.pow(p.x, power) * p.y
    }).reduce((a, b) => a + b)
  },
  getRegressionMatrixFromPoints(points, degreeOfEquation) {
    if (degreeOfEquation < 1) {
      return 'Degree of equation must be at least 1'
    }

    let regressionMatrix = []

    for (let i = 0; i <= degreeOfEquation; i++) {
      regressionMatrix[i] = []

      for (let power = 0; power <= degreeOfEquation; power++) {
        regressionMatrix[i].push(this.getRegressionCoefficient(i, power, points))
      }
      regressionMatrix[i].push(this.getRegressionResult(i, points))
    }

    return regressionMatrix
  },
  getRange(points, axis) {
    let normalizedPoints = this.normalizePoints(points).map(item => item[axis])

    return {
      min: Math.min(...normalizedPoints),
      max: Math.max(...normalizedPoints)
    }
  },
  getRegressionPath(points, degreeOfEquation, granularity = 0.1) {
    let curvePoints = []
    let regressionMatrix = this.getRegressionMatrixFromPoints(points, degreeOfEquation)
    let curveCoefficients = this.getSymbolValues(regressionMatrix)
    let range = this.getRange(points, 'x')

    for (let x = range.min; x <= range.max; x += granularity) {
      let y = 0

      for (let i = 0; i < curveCoefficients.length; i++) {
        let c = curveCoefficients[i]
        y += c * Math.pow(x, i)
      }
      curvePoints.push({x, y})
    }

    return curvePoints
  },
  getQuadraticRegressionCurve(points) {
    return this.getRegressionPath(points, 2)
  },
  getLinearRegressionRect(points) {
    return this.getRegressionPath(points, 1)
  }
}
