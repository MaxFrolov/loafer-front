import React, { Component, PropTypes } from 'react'
// components
import { PersonalDetails, ChangePassword, ImageUploader } from 'components'
import { showOnly as showModal } from 'redux/modules/modals'
import { connect } from 'react-redux'

@connect((state) => ({ user: state.auth.user.resource }), { showModal })
export default class Profile extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  updatePersonalDetails (data) {
    console.log(data)
  }

  updatePassword (data) {
    console.log(data)
  }

  uploadModal (file) {
    const { showModal, user } = this.props
    console.log(user)
    const reader = new FileReader()
    reader.readAsDataURL(file.target.files[0])
    reader.onload = (e) => {
      const data = {
        user_id: user.id,
        image: e.target.result
      }
      showModal('crop', data)
    }
  }

  render () {
    const { user } = this.props
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
                    <ImageUploader uploadImage={::this.uploadModal} user={user} />
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
