import React, { PureComponent } from 'react'

import Toggle from '../UI/Toggle'
import Counter from '../UI/Counter'

import { getDataFromStorage, setDataToStorage } from '../../utils/storage'

export default class SettingsContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      autoStartAfterBreak: false
    }
  }

  componentDidMount() {
    getDataFromStorage('settings').then((data) => {
      this.setState({
        autoStartAfterBreak: data.autoStartAfterBreak
      })
    })
  }

  render() {
    return (
      <div className="settingsContainer">
        <h1>Settings</h1>

        <div className="setingsItem">
          <p>Total goal</p>
          <Counter
            max={48}
            onInput={this.updateTotalGoal}
            defaultValue={this.props.totalGoal}
          />
        </div>

        <div className="setingsItem">
          <p>Pomodoro per series</p>
          <Counter
            max={6}
            min={2}
            defaultValue={4}
            onInput={this.updateSeriesCount}
          />
        </div>

        <div className="delimeter" />

        <div className="setingsItem">
          <p>Auto start after break</p>
          <Toggle
            active={this.state.autoStartAfterBreak}
            onToggle={this.toggleAutoStartAfterBreak}
          />
        </div>
      </div>
    )
  }

  toggleAutoStartAfterBreak = (active) => {
    this.setState({ autoStartAfterBreak: active }, () => {
      setDataToStorage('settings', {
        autoStartAfterBreak: active,
        totalGoal: this.props.totalGoal
      })
    })
  }

  updateTotalGoal = (totalGoal) => {
    this.props.updateTotalGoal({
      totalGoal,
      autoStartAfterBreak: this.state.autoStartAfterBreak
    })
  }

  updateSeriesCount = () => {
  }
}
