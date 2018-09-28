import React, { PureComponent } from 'react'

import Main from './components/Main'

export default class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      stage: 'work'
    }
  }

  render() {
    return (
      <div className={`app ${this.state.stage}Scheme`}>
        <Main
          stage={this.state.stage}
          toggleStage={this.toggleStage}
        />
      </div>
    )
  }

  toggleStage = (stage) => {
    this.setState({ stage })
  }
}
