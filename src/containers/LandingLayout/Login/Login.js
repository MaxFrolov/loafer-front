import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { Link } from 'react-router'
import { login } from 'redux/modules/auth'
import Field from 'components/Field/Field'
import responseErrorsParser from 'helpers/responseErrorsParser'

@connect(null, { login })
export default class Login extends React.Component {

  static propTypes = {
    login: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static Form = reduxForm({
    form: 'login',
    fields: ['email', 'password', 'remember_me']
  })(
    ({ handleSubmit, fields: { email, password, remember_me }, error, submitting, dirty }) =>
      <form className={`mb-lg ${error && 'has-error'}`} onSubmit={handleSubmit} role="form">
        <div className="form-group has-feedback">
          <Field field={email}>
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
        <div className="form-group has-feedback">
          <Field field={password}>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              required="required"
              className="form-control"
              {...password}
            />
            <span className="fa fa-lock form-control-feedback text-muted"/>
          </Field>
        </div>
        <div className="clearfix">
          <Field field={remember_me}>
            <div className="checkbox c-checkbox pull-left mt0">
              <label>
                <input type="checkbox" value="" name="remember" {...remember_me}/>
                <em className="fa fa-check"/>Remember Me</label>
            </div>
          </Field>
          <div className="pull-right">
            <Link to="/recovery" className="text-muted">
              Forgot your password?
            </Link>
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting || !dirty}
          className="btn btn-block btn-primary mt-lg"
        >
          Login
        </button>
        <p className="pt-lg text-center">Need to Signup?</p>
        <Link to="register" className="btn btn-block btn-cta-primary">
          Register Now
        </Link>
      </form>
  );

  onSubmit = (data) => {
    const { login } = this.props
    return login(data).then(() => {
      toastr.success('You successfully logged in')
      this.context.router.push('/profile')
    }, (response) => responseErrorsParser(response))
  }

  render () {
    return (
      <div className="block-center mt-xl wd-xl animated fadeIn">
        <div className="panel panel-dark panel-default">
          <div className="panel-body">
            <p className="text-center pv">SIGN IN TO CONTINUE</p>
            <Login.Form onSubmit={this.onSubmit}/>
          </div>
        </div>
      </div>
    )
  }
}
