import React, { PureComponent } from 'react'

import Switcher from '../UI/Switcher'

const storage = window.require('electron-json-storage')

function getDataFromStorage(key) {
  return new Promise((resolve, reject) => {
    storage.get(key, (err, data) => {
        if (err) reject(err)
        resolve(data)
    })
  })
}

export default class SettingsContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      autoStartAfterBreak: false
    }
  }

  async componentDidMount() {
    const data = await getDataFromStorage('settings')
    console.log(data)

    this.setState({ autoStartAfterBreak: data.autoStartAfterBreak })
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
      storage.set('settings', { autoStartAfterBreak: active })
    })
  }
}
