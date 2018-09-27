import React, { PureComponent } from 'react'

import Timer from './Timer'
import Stats from './Stats'

export default class MainContainer extends PureComponent {
  render() {
    return (
      <div className="container">
        <div className="timer-container">
          <Timer
            time={this.props.time}
            stage={this.props.stage}
            active={this.props.active}
            skipBreak={this.props.skipBreak}
            toggleTimer={this.props.toggleTimer}
          />

          <Stats total={this.props.total} series={this.props.series} />
        </div>
      </div>
    )
  }
}
