import React from 'react'
import { CSSTransition } from 'react-transition-group'

import { formatTimeToString } from './utils'

import { WORK_TIME, RELAX_TIME } from '../../constants'

const playIcon = require('../../assets/play.png')
const pauseIcon = require('../../assets/pause.png')

const VIEW_SIDE = 260
const CENTER = VIEW_SIDE / 2
const RADIUS = 121
const CIRCLE_LENGHT = 2 * Math.PI * RADIUS

export default function Timer({ active, time, stage, toggleTimer, skipBreak }) {
  const src = active ? pauseIcon : playIcon
  const formattedTime = formatTimeToString(time)

  const fullTime = stage === 'work' ? WORK_TIME : RELAX_TIME
  const progress = time / fullTime

  const strokeColor = stage === 'work' ? '#EF5350' : '#00BFA5'

  return [
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
        stroke="rgba(255, 255, 255, 0.75)"
      />
      <circle
        r={RADIUS}
        cx={CENTER}
        cy={CENTER}
        fill="none"
        strokeWidth={15}
        stroke={strokeColor}
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
        stroke="rgba(255, 255, 255, 0.3)"
      />
    </svg>,

    <div className="timer" key="timer">
      <p>{formattedTime}</p>
    </div>,

    <div key="buttons" className="btnsRow">
      <button className="startButton" onClick={toggleTimer}>
        <img src={src} alt="play" className={active ? '' : "playOffset"} />
      </button>

      <CSSTransition
        timeout={300}
        unmountOnExit
        classNames="slideIn"
        in={stage === 'relax'}
      >
        <button className="startButton" onClick={skipBreak}>
          Skip break
        </button>
      </CSSTransition>
    </div>
  ]
}
