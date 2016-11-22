import React from 'react'
// styles
import classNames from 'classnames/bind'
import styles from './ImageUpload.scss'

const avatarPlaceholder = require('../../../../static/user.svg')

const cx = classNames.bind(styles)
export default class ImageUpload extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    uploadImage: React.PropTypes.func.isRequired
  };

  render () {
    const { user, uploadImage } = this.props
    return (
      <div className={cx('image-container', 'avatar', 'img-responsive')}>
        <img
          className={cx('img-rounded', 'avatar-img')}
          role="presentation"
          src={user.avatar_url || avatarPlaceholder}
          style={{ maxWidth: '50px' }}
        />
        <div>
          <div className={cx('upload-button', 'text-center')}>
            <span className="btn-primary">Upload</span>
            <input
              className={'input'}
              type="file"
              onChange={uploadImage}
            />
          </div>
        </div>
      </div>
    )
  }
}
