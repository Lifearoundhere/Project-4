import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'
import Create from './components/pages/create'
import Home from './components/pages/home'
import Index from './components/pages/index'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Navbar from './components/common/navbar'
import Footer from './components/common/footer'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

const pages = ['analyse', 'index', 'login', 'register']
const color = 'warning'

const HomeContainer = () => (
  <div>

    <Route path="/home" component={() => <Home pages={pages} />} />
  </div>
)
const DefaultContainer = () => (
  <div>
    <Navbar pages={pages} color={color} />
    <Route path='/index' component={Index} />
    <Route path='/analyse' component={Create} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
  </div>
)

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Redirect path='/()' to='/home' />
          <Route path="/(home)" component={HomeContainer} />
          <Route component={DefaultContainer} />
        </Switch>
        <Footer />
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)