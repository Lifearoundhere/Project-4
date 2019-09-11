import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { CSVLink, CSVDownload } from 'react-csv'


class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      cards: [],
      showGraph: false,
      boxes: [],
      search: '',
      shownBoxes: [],
      loaded: false
    }
    this.handleKeyUpChange = this.handleKeyUpChange.bind(this)
    this.dataParser = this.dataParser.bind(this)
    this.pageFilter = this.pageFilter.bind(this)
  }

  pageFilter() {
    const regex = new RegExp(this.state.search, 'i')
    const filtered = this.state.boxes.filter(box => {
      return regex.test(box.title)
    })
    return filtered
  }
  handleKeyUpChange(e) {
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
      const regex = new RegExp('^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)', 'ig')
      const regexNamed = new RegExp('^(?:https?:)?(?:\/\/)?(?<title>:[^@\n]+@)?(?:www\.)?([^:\/\n]+)', 'ig')
      graphData.labelAnnotations.forEach(item => graphPlotData[item.description] = item.score)
      graphPlotData = [graphPlotData]
      const box = {}
      box.id = id
      box.document = document
      box.created_at = new Date(created_at).toDateString()
      box.updated_at = new Date(updated_at).toDateString()
      box.url = url
      box.title = url.match(regex)
      box.fTitle = url.replace(regexNamed, '')
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
              <input className="input" type="text" placeholder="search"
                onKeyUp={this.handleKeyUpChange}
              />
              {this.state.loaded && <CSVLink data={this.state.boxes.graphPlotData}>Download me</CSVLink>}
            </div>
          </div>
        </div>
        <section className="section">
          <div className="container">
            {this.pageFilter().map(item =>
              <div key={item.id} className="box">
                <article className="media">
                  <div className="media-left hover03">
                    <figure className="image"
                      style={{ backgroundImage: `url(${item.url})` }}
                      alt={item.id}>
                    </figure>
                  </div>
                  <div className="content">
                    <p><strong>{item.title[0]}</strong></p>
                    <p>{item.created_at}</p>
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
                </article>
              </div>
            )}
          </div>
        </section>
      </section>
    )
  }
}
export default Index