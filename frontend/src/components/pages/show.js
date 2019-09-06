import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Show extends React.Component {
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

    const token = Auth.getToken()
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
export default Show