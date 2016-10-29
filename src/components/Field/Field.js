import React from 'react'
import ErrorPointer from './ErrorPointer'

export default function Field ({ field, width, children }) {
  return (
    <div className={field.touched && field.invalid ? 'has-error' : null}>
      {children}
      {field.touched && field.error && field.error.split(';').map((part) => (
        <ErrorPointer
          message={part}
          width={width}
        />
      ))}
    </div>
  )
}

Field.propTypes = {
  children: React.PropTypes.any,
  field: React.PropTypes.object,
  width: React.PropTypes.number
}
