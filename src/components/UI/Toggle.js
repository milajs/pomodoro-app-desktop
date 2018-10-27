import React, { PureComponent } from 'react'

export default class Switcher extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      active: props.active
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.active !== nextProps.active) {
      return { active: nextProps.active }
    }

    return null
  }

  render() {
    const { active } = this.state

    return (
      <div className="toggleContainer">
        <button className={`toggleBtn${active ? ' toggleBtn_active' : ''}`} onClick={this.toggleActive(true)}>
          On
        </button>

        <button className={`toggleBtn${!active ? ' toggleBtn_active' : ''}`} onClick={this.toggleActive(false)}>
          Off
        </button>
      </div>
    )
  }

  toggleActive = (active) => () => {
    this.setState({ active }, () => {
      this.props.onToggle(active)
    })
  }
}
