import React, { Component, PropTypes } from 'react'
// components
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
const Cropper = !__SERVER__ && require('react-cropper').default
// actions
import { updateUser } from 'redux/modules/auth'
import { hide as hideModal } from 'redux/modules/modals'
// utils
import responseErrorsParser from 'helpers/responseErrorsParser'

@connect((state) => ({ data: state.modals.data }), { updateUser, hideModal })
export default class Crop extends Component {
  static propTypes = {
    data: PropTypes.object,
    user_id: PropTypes.number,
    updateUser: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired
  }

  static contextTypes = {
    client: React.PropTypes.object.isRequired
  }

  cropImage () {
    const { data: { user_id }, updateUser, hideModal } = this.props
    const cropperCanvas = this.refs.cropper.getCroppedCanvas()
    if (cropperCanvas) {
      const data = { avatar_data_uri: cropperCanvas.toDataURL() }
      return updateUser(data, user_id).then(() => {
        hideModal('crop')
        toastr.success('Success', 'Ваш аватар успешно обновлен')
      }).catch((response) => responseErrorsParser(response))
    }

    return toastr.error('Error', 'Что то пошло не так, попробуйте еще раз')
  }

  render () {
    const { data: { image } } = this.props
    return (
      <div>
        {Cropper && <Cropper
          ref="cropper"
          src={image}
          style={{ height: 400, width: '100%' }}
          aspectRatio={1}
          guides={false}
        />}
        <button className="btn btn-primary mt-10" onClick={::this.cropImage}>Обрезать фото</button>
      </div>
    )
  }
}
