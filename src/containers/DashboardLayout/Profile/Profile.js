import React, { Component, PropTypes, cloneElement } from 'react'
// components
import { connect } from 'react-redux'
import { Link } from 'react-router'
// styles
import styles from './Profile.scss'

@connect((state) => ({ user: state.auth.user }), null)
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    children: PropTypes.object
  }

  render () {
    const { children, user } = this.props
    const content = cloneElement(children, { user })
    return (
      <div>
        <div className="container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3">
                <div className="panel b">
                  <div className="panel-heading bg-gray-lighter text-bold">
                    Персональные настройки
                  </div>
                  <div className="list-group">
                    <Link to="/profile/settings" className="list-group-item"
                      activeClassName={styles['profile-sidebar-active']}>
                      Профиль
                    </Link>
                    <Link to="/profile/account/update" className="list-group-item"
                      activeClassName={styles['profile-sidebar-active']}>
                      Аккаунт
                    </Link>
                    <Link to="/profile/notifications" className="list-group-item"
                      activeClassName={styles['profile-sidebar-active']}>
                      Уведомления
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-9">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
