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
export default class InnerHeader extends Component {

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
    const fullName = user.resource.full_name
    const authorize = (
      <Navbar default>
        <div className="row pb-15 pt-15">
          <div className="col-sm-4">
            <button type="button" className="btn btn-cta-primary">Создать событие</button>
          </div>
          <div className="col-sm-4">
            <IndexLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="logo" className="img-responsive block-center" style={{ height: '40px' }} />
            </IndexLink>
          </div>
          <div className="col-sm-4">
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer active={false} to="/profile">
                  <NavItem className={cx('navLink', 'avatarLink', 'hidden-xs')}>
                    <img src={avatarPlaceholder} role="presentation"/>
                  </NavItem>
                </LinkContainer>
                <NavDropdown id="nav-dropdown" title={fullName}>
                  <LinkContainer to="/profile">
                    <MenuItem>
                      Профиль
                    </MenuItem>
                  </LinkContainer>
                  <LinkContainer to="/dashboard">
                    <MenuItem>
                      Карта встреч
                    </MenuItem>
                  </LinkContainer>
                  <MenuItem onClick={this.logout}>Выйти</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Navbar>
      )

    return (
      <div className={styles['header-wrapper']}>
        <div className={styles['header-top']}>
          <div className="container-fluid">
            {authorize}
          </div>
        </div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullLeft>
              <LinkContainer to="/dashboard">
                <NavItem>Карта встреч</NavItem>
              </LinkContainer>
              <LinkContainer to="/search">
                <NavItem>Search</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Log in</NavItem>
              </LinkContainer>
              <LinkContainer to="/register">
                <NavItem>Join</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
