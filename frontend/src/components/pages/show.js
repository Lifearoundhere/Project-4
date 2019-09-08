import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { format } from 'd3-format'
import { RadarChart } from 'react-vis'

const DATA = [
  {
    name: 'Mercedes',
    mileage: 7,
    price: 10,
    safety: 8,
    performance: 9,
    interior: 7,
    warranty: 7
  },
  {
    name: 'Honda',
    mileage: 8,
    price: 6,
    safety: 9,
    performance: 6,
    interior: 3,
    warranty: 9
  },
  {
    name: 'Chevrolet',
    mileage: 5,
    price: 4,
    safety: 6,
    performance: 4,
    interior: 5,
    warranty: 6
  }
]
const basicFormat = format('.2r')
const wideFormat = format('.3r')
class Show extends React.Component {
  constructor() {
    super()
    this.state = {
      url: null,
      document: ''

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

  render() {
    <div>loading...</div>
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
        <img src={this.state.url}></img>
        <RadarChart
          data={DATA}
          tickFormat={t => wideFormat(t)}
          startingAngle={0}
          domains={[
            { name: 'mileage', domain: [0, 10] },
            {
              name: 'price',
              domain: [2, 16],
              tickFormat: t => `$${basicFormat(t)}`,
              getValue: d => d.price
            },
            { name: 'safety', domain: [5, 10], getValue: d => d.safety },
            { name: 'performance', domain: [0, 10], getValue: d => d.performance },
            { name: 'interior', domain: [0, 7], getValue: d => d.interior },
            { name: 'warranty', domain: [10, 2], getValue: d => d.warranty }
          ]}
          width={400}
          height={300}
        />
      </div>
    )
  }
}
export default Show