import React, { PureComponent } from 'react'

export default class Switcher extends PureComponent {
  static defaultProps = {
    min: 0,
    max: 99,
    defaultValue: 0
  }

  constructor(props) {
    super(props)

    this.state = {
      count: props.defaultValue
    }
  }

  render() {
    return (
      <div className="counterContainer">
        <button className="counterBtn" onClick={this.decrease}>-</button>

        <div className="counterBody">{this.state.count}</div>

        <button className="counterBtn" onClick={this.increase}>+</button>
      </div>
    )
  }

  increase = () => {
    if (this.state.count + 1 <= this.props.max) {
      this.setState({ count: this.state.count + 1 }, )
    }
  }

  decrease = () => {
    if (this.state.count - 1 >= this.props.min) {
      this.setState({ count: this.state.count - 1 })
    }
  }
}