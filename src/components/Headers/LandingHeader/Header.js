import React, { Component } from 'react'
import { IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { logout } from 'redux/modules/auth'
import styles from '../Header.scss'
import classNames from 'classnames/bind'

const avatarPlaceholder = require('./../user.svg')
const cx = classNames.bind(styles)
const logo = require('../logo.jpg')

@connect((store) => ({ user: store.auth.user, router: store.routing }), { logout })
export default class LandingHeader extends Component {

  static propTypes = {
    user: React.PropTypes.object,
    logout: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  logout = () => {
    this.props.logout()
    this.context.router.push('/login')
  }

  render () {
    const { user } = this.props
    const authorize = user ?
      <div className={styles['nav-header']}>
        <Nav pullRight className={cx('nav-authorized')}>
          <LinkContainer to="/search">
            <NavItem>Главная</NavItem>
          </LinkContainer>
          <LinkContainer active={false} to="/profile">
            <NavItem className={cx('navLink', 'avatarLink', 'hidden-xs')}>
              <img src={avatarPlaceholder} role="presentation"/>
            </NavItem>
          </LinkContainer>
          <NavDropdown id="nav-dropdown" title={user.full_name}>
            <LinkContainer to="/profile">
              <MenuItem>
                Profile
              </MenuItem>
            </LinkContainer>
            <LinkContainer to="/dashboard">
              <MenuItem>
                Dashboard
              </MenuItem>
            </LinkContainer>
            <MenuItem onClick={this.logout}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </div> :
      <Nav pullRight>
        <LinkContainer to="/">
          <NavItem>Главная</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
          <NavItem>Войти</NavItem>
        </LinkContainer>
        <LinkContainer to="/register">
          <NavItem>Зарегистрироваться</NavItem>
        </LinkContainer>
      </Nav>

    return (
      <div className={styles['header-wrapper']}>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand className="brand-logo">
              <IndexLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="logo" className="img-responsive" style={{ height: '40px' }} />
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {authorize}
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
