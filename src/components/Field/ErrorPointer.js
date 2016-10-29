import React from 'react'
import classNames from 'classnames/bind'
import styles from './ErrorPointer.scss'

const cx = classNames.bind(styles)

export default function ErrorPointer ({ message, width }) {
  const errorWidth = width ? `col-sm-offset${12 - width} col-sm-${width}` : undefined
  return (
    <div className={cx('error', 'text-danger', errorWidth)} role="alert">
      <i className="glyphicon glyphicon-remove" aria-hidden="true"/>&nbsp;
      {message}
    </div>
  )
}

ErrorPointer.propTypes = {
  message: React.PropTypes.string,
  width: React.PropTypes.number
}
