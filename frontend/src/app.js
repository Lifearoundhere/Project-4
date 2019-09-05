import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'
import axios from 'axios'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      url: null
    }
    this.handleKeyUpChange = this.handleKeyUpChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleKeyUpChange(e) {
    console.log(e.target.value)
    this.setState({ url: e.target.value })
  }

  handleSubmit() {
    console.log(this.state.url)

    const token = process.env.TOKEN
    axios.post('/api/documents/', this.state, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        this.setState(res.data)
        console.log(res.data)
      })
      .catch(err => console.dir(err))
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <h1>This page works BTW</h1>
        <div className="field">
          <label className="label">URL</label>
          <div className="control">
            <input className="input" type="text" placeholder="paste URL here"
              onKeyUp={this.handleKeyUpChange}
            />
            <button className="button is-primary"
              onClick={this.handleSubmit}
            >Submit</button>
          </div>
          <p className="help">Paste URL above</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)