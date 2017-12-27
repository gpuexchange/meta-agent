import React, { Component } from 'react'

export default class App extends Component {
  render () {
    return <div>
      <p>This is the app</p>
      <p>Storage content: {JSON.stringify(this.props.store.getState())}</p>
      <p>Refresh count: {this.props.count}</p>

      <input onKeyUp={(event) => this.props.store.dispatch({
        type: 'SET',
        path: 'session.test',
        value: event.target.value,
      })}/>
      <input/>
    </div>
  }
}