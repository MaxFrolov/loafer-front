import React, { Component } from 'react'
// components
import { IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { logout } from 'redux/modules/auth'
// styles
import styles from '../Header.scss'
import classNames from 'classnames/bind'
// utils
import moment from 'moment'
// constants
const avatarPlaceholder = require('../../../../static/user.svg')
const cx = classNames.bind(styles)
const logo = require('../logo-transparent.png')

@connect((store) => ({ user: store.auth.user, router: store.routing,
  participantEvents: store.reduxAsyncConnect.participant_events }), { logout })
export default class InnerHeader extends Component {

  static propTypes = {
    user: React.PropTypes.object,
    logout: React.PropTypes.func.isRequired,
    participantEvents: React.PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  logout = () => {
    this.props.logout()
    this.context.router.push('/login')
  }

  render () {
    const { user, participantEvents } = this.props
    const fullName = user && user.full_name
    const authorize = (
      <Navbar default>
        <div className="row pb-15 pt-15">
          <div className="col-sm-4">
            <LinkContainer to="/event">
              <button type="button" className="btn btn-cta-grey">Создать событие</button>
            </LinkContainer>
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
                    <img src={user.avatar_url || avatarPlaceholder} role="presentation"/>
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
                <NavItem>Поиск событий</NavItem>
              </LinkContainer>
              <LinkContainer to="/groups">
                <NavItem>Круги</NavItem>
              </LinkContainer>
              <LinkContainer to="/profile">
                <NavItem>Архив</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {participantEvents.resources.length && <div className={styles['upcoming-events-wrapper']}>
          <div className="container">
            <div className={styles['upcoming-events-header']}>
              <h3>Ближайшее событие</h3>
            </div>
            <div className="container-fluid mt-15">
              {participantEvents.resources.map((item, idx) => (
                <div className={cx('row text-center', 'upcoming-events-body')} key={idx}>
                  <div className="col-sm-4">
                    <i className="fa fa-user mr-10 fs-18"/>
                    <span className="fs-16">{item.owner.full_name}</span>
                  </div>
                  <div className="col-sm-4">
                    <i className="fa fa-map-marker mr-10 fs-18"/>
                    <span className="fs-16">{item.address}</span>
                  </div>
                  <div className="col-sm-4">
                    <i className="fa fa-calendar mr-10 fs-18"/>
                    <span className="fs-16">{moment(item.start_date).format('D MMMM Y HH:mm')}</span>
                  </div>
                  <div className="col-sm-12">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>}
      </div>
    )
  }
}
