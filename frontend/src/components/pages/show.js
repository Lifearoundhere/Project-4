import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { format } from 'd3-format'
import { RadarChart } from 'react-vis'


const wideFormat = format('.3r')
class Show extends React.Component {
  constructor() {
    super()
    this.state = {
      url: null,
      document: '',
      showGraph: false,
      graphPlotData: [
        {
          'Text': 0.9638836979866028,
          'Blue': 0.926959753036499,
          'Font': 0.871282696723938,
          'Screenshot': 0.6214386820793152
        }
      ],
      animation: { damping: 9, stiffness: 300 },
      graphData: {
        'labelAnnotations': [
          {
            'Text': 0.9638836979866028,
            'Blue': 0.926959753036499,
            'Font': 0.871282696723938,
            'Screenshot': 0.6214386820793152
          }
        ]
      },
      domain: [
        { name: 'Text', domain: [0, 1] },
        { name: 'Blue', domain: [0, 1] },
        { name: 'Font', domain: [0, 1] },
        { name: 'Screenshot', domain: [0, 1] }
      ]

    }

    this.handleKeyUpChange = this.handleKeyUpChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.dataParser = this.dataParser.bind(this)
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
        this.dataParser()
      })
      .catch(err => console.dir(err))
  }
  dataParser() {
    const graphData = JSON.parse(this.state.document)
    const domain = graphData.labelAnnotations.map((value) => {
      return { name: value.description, domain: [0, 1] }
    })
    let graphPlotData = {}
    graphData.labelAnnotations.forEach(item => graphPlotData[item.description] = item.score)
    graphPlotData = [graphPlotData]
    this.setState({ domain, graphPlotData, graphData, showGraph: true })
  }


  render() {
    console.log('state after update', this.state)
    return (
      <section className="section">
        <div className="container">
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
        <div className="container">
          <img src={this.state.url}></img>
        </div>
        <div className="container is-fluid is-danger">

          {this.state.showGraph &&
            <RadarChart
              data={this.state.graphPlotData}
              tickFormat={t => wideFormat(t)}
              startingAngle={0}
              domains={this.state.domain}
              width={500}
              height={500}
              margin={{ left: 100, right: 100, top: 100, bottom: 100 }}
              colorType="literal"
              style={{
                axes: {
                  line: {
                    fillOpacity: 0.8,
                    strokeWidth: 0.5,
                    strokeOpacity: 0.8
                  },
                  ticks: {
                    fillOpacity: 0,
                    strokeOpacity: 0
                  },
                  text: {}
                },
                labels: {
                  fontSize: 10
                },
                polygons: {
                  strokeWidth: 1,
                  strokeOpacity: 0.8,
                  fillOpacity: 0.8
                }
              }
              }
            />}
        </div>
      </section >
    )
  }
}
export default Show