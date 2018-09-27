import React from 'react'

import { formatTimeToString } from '../../utils/timer'

import { WORK_TIME, RELAX_TIME } from '../../constants'

const VIEW_SIDE = 260
const CENTER = VIEW_SIDE / 2
const RADIUS = 121
const CIRCLE_LENGHT = 2 * Math.PI * RADIUS

export default function Timer({ time, stage }) {
  const formattedTime = formatTimeToString(time)

  const fullTime = stage === 'work' ? WORK_TIME : RELAX_TIME
  const progress = time / fullTime

  return (
    <div className="timerContainer">
      <svg
        height={VIEW_SIDE}
        width={VIEW_SIDE}
        className="rotate90"
        key="timer-wrapper"
      >
        <circle
          r={RADIUS}
          cx={CENTER}
          cy={CENTER}
          fill="none"
          strokeWidth={15}
          strokeDasharray={[5, 5]}
          className="strokeMain"
          stroke="#E53935"
        />
        <circle
          r={RADIUS}
          cx={CENTER}
          cy={CENTER}
          fill="none"
          strokeWidth={15}
          className="strokeBg"
          strokeDasharray={CIRCLE_LENGHT}
          strokeDashoffset={-CIRCLE_LENGHT * (1 - progress)}
        />
        <circle
          r={RADIUS}
          cx={CENTER}
          cy={CENTER}
          fill="none"
          strokeWidth={15}
          strokeDasharray={[5, 5]}
          className="strokeLight"
        />
      </svg>

      <div className="timer" key="timer">
        <p>{formattedTime}</p>
      </div>
    </div>
  )
}
