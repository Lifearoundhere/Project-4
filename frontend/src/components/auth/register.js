import React from 'react'
import Auth from '../../lib/Auth'
import axios from 'axios'
import BackgroundImage from '../../assets/kristian-strand-p8gzCnZf39k-unsplash.jpg'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {},
      error: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register/', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token, res.data.message) // store the token in localStorage
        this.props.history.push(`/login`)
      })
      .catch(err => {
        Auth.removeToken() // remove the token from localStorage
        this.setState({ error: 'Invalid Credentials' })
      })

  }

  render() {
    return (
      <section className="section ImageBackground" style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <div className="container">
          <h1 className="title">Register</h1>
          <div className="columns">
            <div className="column">
            </div>
            <div className="column">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input className="input" type="text" placeholder="username"
                    name="username"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input className="input" type="email" placeholder="email"
                    name="email"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input className="input" type="password"
                    name="password"
                    placeholder="••••••••"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input className="input" type="password"
                    name="password_confirmation"
                    placeholder="••••••••"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-success"
                    onClick={this.handleSubmit}
                  >
                    Register
                  </button>
                </p>
              </div>
              {this.state.error && <p className="has-text-danger" >{this.state.error}</p>}
            </div>
          </div>
        </div>
      </section >
    )
  }
}

export default Login