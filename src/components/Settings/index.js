import React, { PureComponent } from 'react'

import Switcher from '../UI/Switcher'

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
      this.setState({ autoStartAfterBreak: data.autoStartAfterBreak })
    })
  }

  render() {
    console.log(this.state.autoStartAfterBreak)
    return (
      <div className="settingsContainer">
        <h1>Settings</h1>

        <div className="setingsItem">
          <p>Auto start after break</p>
          <Switcher
            active={this.state.autoStartAfterBreak}
            onPress={this.toggleAutoStartAfterBreak}
          />
        </div>
      </div>
    )
  }

  toggleAutoStartAfterBreak = (active) => {
    this.setState({ autoStartAfterBreak: active }, () => {
      setDataToStorage('settings', { autoStartAfterBreak: active })
    })
  }
}
