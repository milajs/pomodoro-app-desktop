import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

import Timer from './Modules/Timer'
import Settings from './Modules/Settings'
import GearIcon from './icons/gear'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stage: 'work',
      screen: 'timer'
    }
  }

  render() {
    return (
      <div className={`app ${this.state.stage}Scheme`}>
        <CSSTransition
          timeout={300}
          unmountOnExit
          classNames="translateIn"
          in={this.state.screen === 'timer'}
        >
          <Timer
            stage={this.state.stage}
            toggleStage={this.toggleStage}
          />
        </CSSTransition>

        <CSSTransition
          timeout={300}
          unmountOnExit
          classNames="translateOut"
          in={this.state.screen === 'settings'}
        >
          <Settings />
        </CSSTransition>

        <button className="settingsButton" onClick={this.toggleScreen}>
          <GearIcon />
        </button>
      </div>
    )
  }

  toggleStage = (stage) => {
    this.setState({ stage })
  }

  toggleScreen = () => {
    const screen = this.state.screen === 'timer' ? 'settings' : 'timer'

    this.setState({ screen })
  }
}
