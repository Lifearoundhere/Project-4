import React from 'react'
import PropTypes from 'prop-types'

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

export default class Navbar extends React.Component {
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
      <nav className={`navbar is-fixed-top is-${color}`}>
        <div className="navbar-brand">
          <NavbarItem page="logo" />
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