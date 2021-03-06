import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { format } from 'd3-format'
import { RadarChart } from 'react-vis'
import regex from '../../lib/regex-weburl'
import Face from '../common/face'
const ConsoleLog = ({ children }) => {
  console.log(children)
  return false
}
const wideFormat = format('.3r')
class Create extends React.Component {
  constructor() {
    super()
    this.state = {
      url: null,
      badUrl: null,
      document: '',
      showFace: false,
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
      ],
      fullTextAnnotation: false,
      reqType: 'label'

    }

    this.handleKeyUpChange = this.handleKeyUpChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.dataParser = this.dataParser.bind(this)
  }
  handleSelectChange(e) {
    console.log(e.target.value)
    this.setState({ reqType: e.target.value })
  }
  handleKeyUpChange(e) {
    if (regex.regex.test(e.target.value)) {
      this.setState({ url: e.target.value, badUrl: false })
    } else {
      this.setState({ badUrl: true })
    }

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
    if (graphData.error) return this.setState({ error: graphData.error })
    if (graphData.fullTextAnnotation) return this.setState({ fullTextAnnotation: graphData.fullTextAnnotation })
    if (graphData.faceAnnotations) return this.setState({ faceAnnotations: graphData.faceAnnotations, showFace: true })
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
        <div className="container create">
          <div className="box">
            <div className="field is-horizontal">
              <div className="inputPadding">
                <label className="label">URL: </label>
              </div>
              <input className="input" type="text" placeholder="paste URL here"
                onKeyUp={this.handleKeyUpChange}
              />
              <div className="select is-fullwidth">
                <select onChange={this.handleSelectChange}>
                  <option defaultValue value="label">Label</option>
                  <option defaultValue value="properties">Image Properties</option>
                  <option value="faces">Face Recognition</option>
                  <option value="text">OCR font</option>
                  <option value="handwriting">OCR handwritten</option>
                  <option value="Web">Web Tracing</option>
                </select>
              </div>

              <button className="button is-primary"
                onClick={this.handleSubmit}
              >Submit</button>
            </div>
          </div>
          {this.state.badUrl && <p className="help has-text-danger">Invalid URL</p>}
        </div>
        <div className="columns">
          <div className="column">
            <div className="container">
              <img src={this.state.url}></img>
            </div>
          </div>
          <div className="column">


            <div className="container is-fluid is-danger">
              {this.state.fullTextAnnotation && <div>
                <h2 className="title">{this.state.fullTextAnnotation.text.replace(/\n/ig, '\n') || null}</h2>
                <ConsoleLog>{this.state.fullTextAnnotation.text}</ConsoleLog>
              </div>}
              {this.state.showFace && <Face attributes={this.state.faceAnnotations} />}
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
          </div>
        </div>
      </section >
    )
  }
}
export default Create