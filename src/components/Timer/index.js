import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'

import Timer from './Timer'
import Stats from './Stats'

const playIcon = require('../../assets/play.png')
const pauseIcon = require('../../assets/pause.png')

export default class TimernContainer extends PureComponent {
  render() {
    const src = this.props.active ? pauseIcon : playIcon

    return (
      <div className="container">
        <Timer
          time={this.props.time}
          stage={this.props.stage}
        />

        <div key="buttons" className="btnsRow">
          <button className="startButton" onClick={this.props.toggleTimer}>
            <img src={src} alt="play" className={this.props.active ? '' : "playOffset"} />
          </button>

          <CSSTransition
            timeout={300}
            unmountOnExit
            classNames="slideIn"
            in={this.props.stage === 'relax'}
          >
            <button className="startButton" onClick={this.props.skipBreak}>
              Skip break
            </button>
          </CSSTransition>
        </div>

        <Stats
          total={this.props.total}
          series={this.props.series}
          totalGoal={this.props.totalGoal}
          fullSeries={this.props.fullSeries}
        />
      </div>
    )
  }
}
