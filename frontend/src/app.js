import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'
import Show from './components/pages/show'
import Login from './components/auth/login'
import Register from './components/auth/register'
import { HashRouter, Route, Switch } from 'react-router-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
    }

  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/documents' component={Show} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)