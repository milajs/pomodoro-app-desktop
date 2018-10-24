import React, { PureComponent } from 'react'

export default class Switcher extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      count: 12
    }
  }

  render() {
    const { count } = this.state

    return (
      <div className="counterContainer">
        <button className="counterBtn">-</button>
        <div className="counterBody">{count}</div>
        <button className="counterBtn">+</button>
      </div>
    )
  }
}