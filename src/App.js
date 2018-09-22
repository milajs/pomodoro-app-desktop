import React, { Component } from 'react'

import Timer from './Modules/Timer'

const gearIcon = require('./assets/gear.png')

class App extends Component {
  render() {
    return (
      <div className="app">
        <Timer />

        <button className="settingsButton">
          <img src={gearIcon} alt="gear" />
        </button>
      </div>
    )
  }
}

export default App
