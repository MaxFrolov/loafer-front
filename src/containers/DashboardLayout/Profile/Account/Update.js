import React, { Component, PropTypes } from 'react'
// components
import { ChangePassword } from 'components'
import { showOnly as showModal } from 'redux/modules/modals'
import { connect } from 'react-redux'

@connect(null, { showModal })
export default class Update extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  updatePassword (data) {
    console.log(data)
  }

  render () {
    return (
      <div className="panel b">
        <div className="panel-heading bg-gray-lighter text-bold">
          Обновление аккаунта
        </div>
        <div className="panel-body">
          <ChangePassword onSubmit={::this.updatePassword} />
        </div>
      </div>
    )
  }
}
