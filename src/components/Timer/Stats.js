import React from 'react'

const tomato = require('../../assets/tomato.png')

export default function Stats({ total, series, totalGoal }) {
  const icon = <img src={tomato} alt="tomato" />

  const totalPart = total / totalGoal
  const width = totalPart > 1 ? '300px' : `${totalPart * 300}px`

  return [
    <p className="seriesTitle" key="series-title">
      Series
    </p>,

    <div className="seriesRow" key="series-row">
      {series > 0 ? icon : <div className="series" />}

      {series > 1 ? icon : <div className="series" />}

      {series > 2 ? icon : <div className="series" />}

      {series > 3 ? icon : <div className="series" />}
    </div>,

    <p className="seriesTitle" key="total-title">
      Total: {total} / {totalGoal}
    </p>,

    <div className="totalRow" key="total-row">
      <div className="total" style={{ width }} />
    </div>
  ]
}
