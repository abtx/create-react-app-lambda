import React, { Component } from "react"
import netlifyIdentity from "netlify-identity-widget"
import logo from "./logo.svg"
import "./App.css"


class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })

    fetch("http://localhost:9000/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}

class App extends Component {

  componentDidMount() {
    netlifyIdentity.init();
  }
  handleIdentity = (e) => {
    e.preventDefault();
    netlifyIdentity.open();
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p><button onClick={this.handleIdentity}>User Status</button></p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
