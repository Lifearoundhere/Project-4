import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <h1>Hello Django</h1>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)