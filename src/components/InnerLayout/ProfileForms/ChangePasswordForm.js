import React, { Component, PropTypes } from 'react'
// components
import Field from 'components/Field/Field'
import { reduxForm } from 'redux-form'
// styles
import classNames from 'classnames'

@reduxForm({
  form: 'change-password-form',
  fields: ['password', 'current_password', 'password_confirmation']
})
export default class ChangePasswordForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.any
  }

  render () {
    const { fields: { password, current_password, password_confirmation }, handleSubmit, error } = this.props
    return (
      <form className={classNames('form-horizontal', error && 'has-error')} onSubmit={handleSubmit} role="form">
        <div className="form-group">
          <Field field={password}>
            <label className="col-sm-3 control-label text-right">Пароль</label>
            <div className="col-sm-8">
              <input type="text" placeholder="First Name" className="form-control" {...password} />
            </div>
          </Field>
        </div>
        <div className="form-group">
          <Field field={current_password}>
            <label className="col-sm-3 control-label text-right">Текущий пароль</label>
            <div className="col-sm-8">
              <input type="text" placeholder="Last Name" className="form-control" {...current_password} />
            </div>
          </Field>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label text-right">Подтвердите пароль</label>
          <div className="col-sm-8">
            <Field field={password_confirmation}>
              <input type="tel" placeholder="Phone" className="form-control" {...password_confirmation} />
            </Field>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-8 text-center">
            <button className="btn btn-primary mt-lg" type="submit">Сохранить</button>
          </div>
        </div>
      </form>
    )
  }
}
