import React from 'react'

type Props = {
  children: React.Node
}

export default class App extends React.Component<Props> { // eslint-disable-line
  render() {
    return <div>{this.props.children}</div>
  }

  props: Props
}
