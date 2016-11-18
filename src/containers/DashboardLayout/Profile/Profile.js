import React, { Component, PropTypes } from 'react'
// components
import { PersonalDetails, ChangePassword } from 'components'
import { showOnly as showModal } from 'redux/modules/modals'
import { connect } from 'react-redux'

@connect(null, { showModal })
export default class Profile extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired
  }

  updatePersonalDetails (data) {
    console.log(data)
  }

  updatePassword (data) {
    console.log(data)
  }

  uploadModal () {
    const { showModal } = this.props
    showModal('crop')
  }

  render () {
    return (
      <div>
        <div className="container text-center">
          <h1>Профиль</h1>
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    <PersonalDetails onSubmit={::this.updatePersonalDetails} />
                  </div>
                  <div className="col-sm-6">
                    <ChangePassword onSubmit={::this.updatePassword} />
                  </div>
                  <div className="col-sm-12">
                    <button className="btn btn-cta-primary" onClick={::this.uploadModal}>UPLOAD</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
