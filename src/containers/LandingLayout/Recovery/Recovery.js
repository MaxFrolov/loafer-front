import React, { Component } from 'react'
import { recoveryPassword } from 'redux/modules/auth'
import { connect } from 'react-redux'
import { reduxForm, reset } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import Field from 'components/Field/Field'
import responseErrorsParser from 'helpers/responseErrorsParser'

@connect(null, { recoveryPassword, reset })
export default class Recovery extends Component {
  static propTypes = {
    recoveryPassword: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired
  };

  static Form = reduxForm({
    form: 'recovery',
    fields: ['email']
  })(
    ({ handleSubmit, fields: { email }, error, submitting, dirty }) =>
      <form className={`mb-lg ${error && 'has-error'}`} onSubmit={handleSubmit} role="form">
        <div className="form-group has-feedback">
          <Field field={email}>
            <label className="text-muted">Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              required="required"
              className="form-control"
              {...email}
            />
            <span className="fa fa-envelope form-control-feedback text-muted"/>
          </Field>
        </div>
        <button
          type="submit"
          disabled={submitting || !dirty}
          className="btn btn-block btn-danger mt-lg"
        >
          Reset
        </button>
      </form>
  );

  onSubmit = (data) => {
    const { recoveryPassword, reset } = this.props
    return recoveryPassword(data).then(() => {
      toastr.success('Recovery', 'Password successfully send')
      reset('recovery')
    }, (response) => responseErrorsParser(response))
  }

  render () {
    return (
      <div className="block-center mt-xl wd-xl animated fadeIn">
        <div className="panel panel-dark panel-default">
          <div className="panel-body">
            <p className="text-center pv">PASSWORD RESET</p>
            <p className="text-center">
              Fill with your mail to receive instructions on how to reset your password.
            </p>
            <Recovery.Form onSubmit={this.onSubmit}/>
          </div>
        </div>
      </div>
    )
  }
}
