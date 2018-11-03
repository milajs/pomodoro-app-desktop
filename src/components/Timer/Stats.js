import React from 'react'

const tomato = require('../../assets/tomato.png')

export default function Stats({ total, series, totalGoal, fullSeries }) {
  const totalPart = total / totalGoal
  const width = totalPart > 1 ? '300px' : `${totalPart * 300}px`

  const seriesList = [...Array(fullSeries).keys()].map((key) => {
    return series > key ? <img key={`${key}-tomato`} src={tomato} alt="tomato" />
      : <div key={`${key}-series`} className="series" />
  })

  return [
    <p className="seriesTitle" key="series-title">
      Series
    </p>,

    <div className="seriesRow" key="series-row">
      {seriesList}
    </div>,

    <p className="seriesTitle" key="total-title">
      Total: {total} / {totalGoal}
    </p>,

    <div className="totalRow" key="total-row">
      <div className="total" style={{ width }} />
    </div>
  ]
}
