import React, { Component, PropTypes } from 'react'
// components
import { Link } from 'react-router'
// constants
const avatarPlaceholder = require('../../../../../static/user.svg')

export default class Index extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render () {
    const { user } = this.props
    return (
      <div className="panel b">
        <div className="panel-heading bg-gray-lighter text-bold">
          <div className="container-fluid">
            <div className="row">
              <span>Профиль</span>
              <Link to="/profile/settings/update" className="pull-right">
                <button type="button" className="btn btn-primary">
                  <i className="fa fa-pencil mr"/>
                  Обновить
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-4">
                <img className="img-rounded block-center img-responsive" role="presentation"
                  src={user.avatar_url || avatarPlaceholder} style={{ maxWidth: '150px' }} />
              </div>
              <dvi className="col-sm-8">
                <table className="table">
                  <tbody>
                    <tr>
                      <td><span className="text-bold">Имя:</span></td>
                      <td className="text-right">{user.first_name || '-'}</td>
                    </tr>
                    <tr>
                      <td><span className="text-bold">Фамилия:</span></td>
                      <td className="text-right">{user.last_name || '-'}</td>
                    </tr>
                    <tr>
                      <td><span className="text-bold">Email:</span></td>
                      <td className="text-right">{user.email || '-'}</td>
                    </tr>
                    <tr>
                      <td><span className="text-bold">Телефон:</span></td>
                      <td className="text-right">{user.phone || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </dvi>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
