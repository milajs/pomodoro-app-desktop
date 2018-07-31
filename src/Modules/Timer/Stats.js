import React from 'react'

const tomato = require('../../assets/tomato.png')

const TOTAL = 12

export default function Stats({ total, series }) {
  const icon = <img src={tomato} alt="tomato" />

  const totalPart = total / TOTAL
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
      Total: {total} / {TOTAL}
    </p>,

    <div className="totalRow" key="total-row">
      <div className="total" style={{ width }} />
    </div>
  ]
}
