import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Timer from '../components/Timer'

import { loadSettings } from '../actions/settings'

const mapStateToProps = state => {
  return {
    settings: state.settings
  }
}

const mapDispatchToProps = dispatch => ({
  loadSettings() {
    loadSettings(dispatch)
  }
})


class TimernContainer extends PureComponent {
  componentDidMount() {
    this.props.loadSettings()
  }

  render() {
    return (
      <Timer
        time={this.props.time}
        stage={this.props.stage}
        total={this.props.total}
        series={this.props.series}
        active={this.props.active}
        skipBreak={this.props.skipBreak}
        totalGoal={this.props.totalGoal}
        fullSeries={this.props.fullSeries}
        toggleTimer={this.props.toggleTimer}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimernContainer)
