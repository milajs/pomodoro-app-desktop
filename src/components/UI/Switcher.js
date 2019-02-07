import React, { PureComponent } from 'react'

export default class Switcher extends PureComponent {
  render() {
    const { active } = this.props

    return (
      <button
        className={`switcherContainer${active ? ' switcherContainer_active' : ''}`}
        onClick={this.toggleActive}
      >
        <div className={`switcherTumblr${active ? ' switcherTumblr_active' : ''}`} />
      </button>
    )
  }

  toggleActive = () =>{
    this.props.onToggle(!this.props.active)
  }
}