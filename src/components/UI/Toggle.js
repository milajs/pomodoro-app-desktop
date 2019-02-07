import React, { PureComponent } from 'react'

export default class Switcher extends PureComponent {
  render() {
    const { active } = this.props

    return (
      <div className="toggleContainer">
        <button
          className={`toggleBtn${active ? ' toggleBtn_active' : ''}`}
          onClick={this.toggleActive(true)}
        >
          On
        </button>

        <button
          className={`toggleBtn${!active ? ' toggleBtn_active' : ''}`}
          onClick={this.toggleActive(false)}
        >
          Off
        </button>
      </div>
    )
  }

  toggleActive = (active) => () => {
    this.props.onToggle(active)
  }
}
