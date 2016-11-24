import React from 'react'
// styles
import classNames from 'classnames/bind'
import styles from './ImageUpload.scss'
// constants
const avatarPlaceholder = require('../../../../static/user.svg')
const cx = classNames.bind(styles)

export default class ImageUpload extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    uploadImage: React.PropTypes.func.isRequired
  };

  render () {
    const { uploadImage, user } = this.props
    return (
      <div className="text-center">
        <img className="img-rounded block-center img-responsive" role="presentation"
          src={user.avatar_url || avatarPlaceholder} style={{ maxWidth: '150px' }} />
        <div className={cx('btn btn-default mt-10', 'upload-button-wrapper')}>
          <input className={cx('fa fa-upload mr', 'upload')} type="file" onChange={uploadImage} />
          <span className="icon-span-filestyle fa fa-upload mr" />
          <span className="buttonText">Обновить аватар</span>
        </div>
      </div>
    )
  }
}
