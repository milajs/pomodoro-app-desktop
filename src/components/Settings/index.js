import React, { PureComponent } from 'react'

import Switcher from '../UI/Switcher'

export default class MainContainer extends PureComponent {
  render() {
    return (
      <div className="settingsContainer">
        <h1>Settings</h1>

        <div className="setingsItem">
          <p>Auto start after break</p>
          <Switcher />
        </div>
      </div>
    )
  }
}
