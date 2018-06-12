import React from 'react'

const TOTAL = 12

export default function Stats({ total, series }) {
  const tomato = <img src="/tomato.png" alt="tomato" />

  const totalPart = total / TOTAL
  const width = totalPart > 1 ? '300px' : `${totalPart * 300}px`

  return [
    <p className="series-title" key="series-title">Series</p>,

    <div className="series-row" key="series-row">
      {series > 0 ? tomato : <div className="series" />}

      {series > 1 ? tomato : <div className="series" />}

      {series > 2 ? tomato : <div className="series" />}

      {series > 3 ? tomato : <div className="series" />}
    </div>,

    <p className="series-title" key="total-title">Total: {total} / {TOTAL}</p>,

    <div className="total-row" key="total-row">
      <div className="total" style={{ width }} />
    </div>
  ]
}
