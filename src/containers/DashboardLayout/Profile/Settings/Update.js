import React, { Component, PropTypes } from 'react'
// components
import { PersonalDetails, ImageUploader } from 'components'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
// actions
import { updateUser } from 'redux/modules/auth'
import { showOnly as showModal } from 'redux/modules/modals'
// utils
import responseErrorsParser from 'helpers/responseErrorsParser'

@connect(null, { showModal, updateUser })
export default class Update extends Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  updatePersonalDetails (data) {
    const { updateUser, user } = this.props

    updateUser(data, user.id).then(() => {
      toastr.success('Success', 'Ваш профиль успешно обновлен')
    }).catch((response) => responseErrorsParser(response))
  }

  uploadModal (file) {
    const { showModal, user } = this.props
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
    const initialValues = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone
    }
    return (
      <div className="panel b">
        <div className="panel-heading bg-gray-lighter text-bold">
          Обновление профиля
        </div>
        <div className="panel-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-4">
                <ImageUploader uploadImage={::this.uploadModal} user={user} />
              </div>
              <div className="col-sm-8">
                <PersonalDetails onSubmit={::this.updatePersonalDetails} initialValues={initialValues} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
