import React, { PureComponent } from 'react'

import Timer from './Timer'
import Stats from './Stats'

import { formatTimeToString, getNewSeries } from './utils'

import { WORK_TIME, RELAX_TIME } from '../../constants'

const { ipcRenderer } = window.require("electron")

const startSound = require('../../assets/pomodoro-start.mp3')
const endSound = require('../../assets/pomodoro-end.mp3')

const INITIAL_TIME = formatTimeToString(WORK_TIME)

const initialState = {
  series: 0,
  total: 0,
  active: false,
  time: WORK_TIME,
  stage: 'work'
}

export default class MainContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = initialState
  }

  componentDidMount() {
    ipcRenderer.on('toggle-timer', () => {
      this.toggleTimer()
    })

    ipcRenderer.on('reset-timer', () => {
      this.resetTimer()
    })

    ipcRenderer.on('skip-break', () => {
      this.skipBreak()
    })
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
            skipBreak={this.skipBreak}
            toggleTimer={this.toggleTimer}
          />

          <Stats total={this.state.total} series={this.state.series} />

          <audio id="audio-end" src={endSound} autostart="false" />
          <audio id="audio-start" src={startSound} autostart="false" />
        </div>
      </div>
    )
  }

  toggleTimer = () => {
    const time = formatTimeToString(this.state.time)

    this.setState({ active: !this.state.active }, () => {
      if (this.state.active) {
        ipcRenderer.send('update-workt-status', 'Stop', time)

        // if (this.state.time === WORK_TIME) {
        //   document.getElementById('audio-start').play()
        // }

        this.timer = setInterval(this.tick, 1000)
      } else {
        ipcRenderer.send('update-workt-status', 'Start', time)
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

      this.setState({ stage, total, time, active, series }, () => {
        ipcRenderer.send('update-stage', stage, formatTimeToString(time))
      })

      if (!active) {
        ipcRenderer.send('update-workt-status', 'Start', INITIAL_TIME)
        clearInterval(this.timer)
      }
    } else {
      const newTime = this.state.time - 1
      this.setState({ time: newTime }, () => {
        ipcRenderer.send('update-tray-title', formatTimeToString(newTime))
      })
    }
  }

  skipBreak = () => {
    this.setState({
        active: false,
        time: WORK_TIME,
        stage: 'work'
      }, () => {
        clearInterval(this.timer)
        ipcRenderer.send('update-workt-status', 'Start', INITIAL_TIME)
      }
    )
  }

  resetTimer = () => {
    this.setState(initialState, () => {
      clearInterval(this.timer)
      ipcRenderer.send('update-tray-title', INITIAL_TIME)
    })
  }
}
