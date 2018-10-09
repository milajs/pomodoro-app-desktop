import React, { PureComponent } from 'react'

export default class Switcher extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }
  }

  render() {
    const { active } = this.state

    return (
      <button className={`switcherContainer${active ? ' switcherContainer_active' : ''}`} onClick={this.toggleActive}>
        <div className={`switcherTumblr${active ? ' switcherTumblr_active' : ''}`} />
      </button>
    )
  }

  toggleActive = () =>{
    this.setState({ active: !this.state.active })
  }
}