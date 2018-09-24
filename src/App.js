import React, { Component } from 'react'

import Timer from './Modules/Timer'
import GearIcon from './icons/gear'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stage: 'work'
    }
  }

  render() {
    return (
      <div className="app">
        <Timer
          stage={this.state.stage}
          toggleStage={this.toggleStage}
        />

        <button className="settingsButton">
          <GearIcon />
        </button>
      </div>
    )
  }

  toggleStage = (stage) => {
    this.setState({ stage })
  }
}

export default App
