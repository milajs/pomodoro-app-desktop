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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.defaultValue !== nextProps.defaultValue) {
      return { count: nextProps.defaultValue }
    }

    return null
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
    const count = this.state.count + 1

    if (count <= this.props.max) {
      this.updateCount(count)
    }
  }

  decrease = () => {
    const count = this.state.count - 1

    if (count >= this.props.min) {
      this.updateCount(count)
    }
  }

  updateCount = (count) => {
    this.setState({ count }, () => {
      this.props.onInput(count)
    })
  }
}
