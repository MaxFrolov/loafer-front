import React, { Component, PropTypes } from 'react'
// components
import Field from 'components/Field/Field'
import { reduxForm } from 'redux-form'
// styles
import classNames from 'classnames'

@reduxForm({
  form: 'personal-details-form',
  fields: ['first_name', 'last_name', 'email', 'phone']
})
export default class PersonalDetailsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.any
  }

  render () {
    const { fields: { first_name, last_name, email, phone }, handleSubmit, error } = this.props
    return (
      <form className={classNames('form-horizontal', error && 'has-error')} onSubmit={handleSubmit} role="form">
        <div className="form-group">
          <Field field={first_name}>
            <label className="col-sm-3 control-label text-right">Имя</label>
            <div className="col-sm-8">
              <input type="text" placeholder="Имя" className="form-control" {...first_name} />
            </div>
          </Field>
        </div>
        <div className="form-group">
          <Field field={last_name}>
            <label className="col-sm-3 control-label text-right">Фамилия</label>
            <div className="col-sm-8">
              <input type="text" placeholder="Фамилия" className="form-control" {...last_name} />
            </div>
          </Field>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label text-right">Телефон</label>
          <div className="col-sm-8">
            <Field field={phone}>
              <input type="tel" placeholder="Телефон" className="form-control" {...phone} />
            </Field>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label text-right">Email</label>
          <div className="col-sm-8">
            <Field field={email}>
              <input type="email" placeholder="Email" className="form-control" {...email} />
            </Field>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-8">
            <button className="btn btn-primary mt-lg" type="submit">Обновить профиль</button>
          </div>
        </div>
      </form>
    )
  }
}

