import React, { Component, PropTypes } from 'react'
// components
import { reduxForm } from 'redux-form'
import Field from 'components/Field/Field'

@reduxForm({
  form: 'dashboardFilterForm',
  fields: ['circles', 'followers']
})

export default class DashboardForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    error: PropTypes.any,
    submitting: PropTypes.bool
  };

  render () {
    const { fields: { circles, followers }, handleSubmit, error } = this.props
    return (
      <form className={error && 'has-error'} onSubmit={handleSubmit} role="form">
        <div className="checkbox c-checkbox mt-20">
          <Field field={circles}>
            <label>
              <input type="checkbox" {...circles}/>
              <em className="fa fa-check"/>
              <strong>Друзья</strong>
            </label>
          </Field>
        </div>
        <div className="checkbox c-checkbox mt-20">
          <Field field={followers}>
            <label>
              <input type="checkbox" {...followers} />
              <em className="fa fa-check"/>
              <strong>Интересные люди</strong>
            </label>
          </Field>
        </div>
      </form>
    )
  }
}
