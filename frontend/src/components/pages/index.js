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
      cards: [],
      showGraph: false,
      boxes: [],
      search: ''

    }
    this.handleKeyUpChange = this.handleKeyUpChange.bind(this)
    this.dataParser = this.dataParser.bind(this)
  }

  handleKeyUpChange(e) {
    console.log(e.target.value)
    this.setState({ search: e.target.value })
  }
  componentDidMount() {

    const token = Auth.getToken()
    axios.get('/api/documents/', this.state, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        this.setState({ cards: res.data })
        this.dataParser()
      })
      .catch(err => console.dir(err))
  }
  dataParser() {
    this.state.cards.forEach(doc => {
      const { id, document, created_at, updated_at, url } = doc
      const graphData = JSON.parse(document)
      const domain = graphData.labelAnnotations.map((value) => {
        return { name: value.description, domain: [0, 1] }
      })
      let graphPlotData = {}
      graphData.labelAnnotations.forEach(item => graphPlotData[item.description] = item.score)
      graphPlotData = [graphPlotData]
      const box = {}
      box.id = id
      box.document = document
      box.created_at = created_at
      box.updated_at = updated_at
      box.url = url
      box.domain = domain
      box.graphPlotData = graphPlotData
      box.graphData = graphData
      this.setState(prevState => ({
        boxes: [...prevState.boxes, box]
      }))
    })
  }


  render() {
    console.log('state after update', this.state)
    return (
      <section className="section">
        <div className="container">
          <h1>This page is the index BTW</h1>
          <div className="field">
            <label className="label">search</label>
            <div className="control">
              <input className="input" type="text" placeholder="paste URL here"
                onKeyUp={this.handleKeyUpChange}
              />
            </div>
          </div>
        </div>
        <section className="section">
          <div className="container">
            {this.state.boxes.map(item =>
              <div key={item.id} className="box">
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-128x128">
                      <img src={item.url} alt="Image" />
                    </figure>
                  </div>
                  <div className="content">
                    <p><strong>{item.url}</strong></p>
                    <p>{Date(item.created_at)}</p>
                    <div className="input-tag">
                      <ul className="input-tag__tags">
                        {item.domain.map((tag, i) => (
                          <li key={i}>
                            {tag.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <nav className="level is-mobile">
                    <div className="level-left">
                      <a className="level-item" aria-label="reply">
                        <span className="icon is-small">
                          <i className="fas fa-reply" aria-hidden="true"></i>
                        </span>
                      </a>
                      <a className="level-item" aria-label="retweet">
                        <span className="icon is-small">
                          <i className="fas fa-retweet" aria-hidden="true"></i>
                        </span>
                      </a>
                      <a className="level-item" aria-label="like">
                        <span className="icon is-small">
                          <i className="fas fa-heart" aria-hidden="true"></i>
                        </span>
                      </a>
                    </div>
                  </nav>

                </article>


              </div>
            )}
          </div>
        </section>
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