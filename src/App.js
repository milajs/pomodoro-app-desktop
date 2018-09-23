import React, { Component } from 'react'

import Timer from './Modules/Timer'
import GearIcon from './icons/gear'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Timer />

        <button className="settingsButton">
          <GearIcon />
        </button>
      </div>
    )
  }
}

export default App
