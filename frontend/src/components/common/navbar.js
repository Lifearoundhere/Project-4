import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'


const NavbarItem = props => (
  <a className="navbar-item is-capitalized" href={`#${props.page}`}>
    {props.page}
  </a>
)

const NavbarBurger = props => (
  <button
    onClick={props.toggleMenu}
    className={`button navbar-burger ${props.active ? 'is-active' : ''}`}
  >
    <span />
    <span />
    <span />
  </button>
)

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      activeMenu: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState({
      activeMenu: !this.state.activeMenu
    })
  }
  render() {
    const { pages, color } = this.props
    const navbarItems = pages.map(page => <NavbarItem page={page} key={page} />)
    return (
      <nav className={`navbar is-fixed-top is-${color}`} ref={this.refOfPage}>
        <div className="navbar-brand">
          <NavbarItem page="home" />
          <NavbarBurger
            active={this.state.activeMenu}
            toggleMenu={this.toggleMenu}
          />
        </div>
        <div
          className={`navbar-menu ${this.state.activeMenu ? 'is-active' : ''}`}
        >
          <div className="navbar-start">{navbarItems}</div>
        </div>
      </nav>
    )
  }
}
Navbar.propTypes = {
  pages: PropTypes.array.isRequired,
  color: PropTypes.string
}

export default withRouter(Navbar)