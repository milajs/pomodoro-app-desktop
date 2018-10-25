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
      <button className={`switcherContainer${active ? ' switcherContainer_active' : ''}`} onClick={this.toggleActive}>
        <div className={`switcherTumblr${active ? ' switcherTumblr_active' : ''}`} />
      </button>
    )
  }

  toggleActive = () =>{
    const active = !this.state.active

    this.setState({ active }, () => {
      this.props.onToggle(active)
    })
  }
}