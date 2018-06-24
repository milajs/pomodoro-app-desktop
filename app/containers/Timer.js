import React, { PureComponent } from 'react'
import { ipcRenderer } from 'electron'

import Timer from '../Components/Timer'
import Stats from '../Components/Stats'

import formatTimeToString from '../utils/timer'

import { WORK_TIME, RELAX_TIME } from '../constants'

const startSound = require('../assets/pomodoro-start.mp3')
const endSound = require('../assets/pomodoro-end.mp3')

function getNewSeries(prevStage, prevSeries) {
  if (prevSeries === 4 && prevStage === 'relax') {
    return 0
  }

  if (prevStage === 'work') {
    return prevSeries + 1
  }

  return prevSeries
}

export default class MainContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      series: 0,
      total: 0,
      active: false,
      time: WORK_TIME,
      stage: 'work'
    }
  }

  render() {
    const { stage } = this.state

    return (
      <div className={`container background-${stage}`}>
        <div className="timer-container">
          <Timer
            time={this.state.time}
            stage={this.state.stage}
            active={this.state.active}
            toggleTimer={this.toggleTimer}
          />

          <Stats
            total={this.state.total}
            series={this.state.series}
          />

          <audio id="audio-end" src={endSound} autostart="false" />
          <audio id="audio-start" src={startSound} autostart="false" />
        </div>
      </div>
    )
  }

  toggleTimer = () => {
    this.setState({ active: !this.state.active }, () => {
      if (this.state.active) {
        if (this.state.time === WORK_TIME) {
          document.getElementById('audio-start').play()
        }
        this.timer = setInterval(this.tick, 1000)
      } else {
        clearInterval(this.timer)
      }
    })
  }

  tick = () => {
    if (this.state.time === 0) {
      const isPomodoroEnd = this.state.stage === 'work'

      if (isPomodoroEnd) {
        document.getElementById('audio-end').play()
      }

      const stage = isPomodoroEnd ? 'relax' : 'work'
      const active = isPomodoroEnd
      const total = isPomodoroEnd ? this.state.total + 1 : this.state.total
      const time = isPomodoroEnd ? RELAX_TIME : WORK_TIME
      const series = getNewSeries(this.state.stage, this.state.series)

      this.setState({ stage, total, time, active, series })

      if (!active) {
        clearInterval(this.timer)
      }
    } else {
      const newTime = this.state.time - 1
      this.setState({ time: newTime }, () => {
        ipcRenderer.send('update-tray-title', formatTimeToString(newTime))
      })
    }
  }
}
