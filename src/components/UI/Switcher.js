import React, { PureComponent } from 'react'

export default class Switcher extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }
  }

  render() {
    return (
      <button className="swicherContainer" onClick={this.toggleActive}>
        <div className="switcherTumblr" />
      </button>
    )
  }

  toggleActive = () =>{
    this.setState({ active: !this.state.active })
  }
}