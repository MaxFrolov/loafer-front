import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { setCurrentUser } from 'redux/modules/auth'
import Field from 'components/Field/Field'
import responseErrorsParser from 'helpers/responseErrorsParser'

@connect((store) => ({ user: store.auth.user }), { setCurrentUser })
export default class Reset extends Component {

  static propTypes = {
    setCurrentUser: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
    params: React.PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    client: React.PropTypes.object.isRequired
  };

  static Form = reduxForm({
    form: 'reset',
    fields: ['password', 'password_confirmation']
  })(
    ({ handleSubmit, fields: { password, password_confirmation }, error, submitting, dirty }) =>
      <form className={`mb-lg ${error && 'has-error'}`} onSubmit={handleSubmit} role="form">
        <div className="form-group has-feedback">
          <Field field={password}>
            <label className="text-muted">Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              autoComplete="off"
              required="required"
              className="form-control"
              {...password}
            />
            <span className="fa fa-lock form-control-feedback text-muted"/>
          </Field>
        </div>
        <div className="form-group has-feedback">
          <Field field={password_confirmation}>
            <label className="text-muted">Password confirmation</label>
            <input
              type="password"
              placeholder="Enter new password"
              autoComplete="off"
              required="required"
              className="form-control"
              {...password_confirmation}
            />
            <span className="fa fa-lock form-control-feedback text-muted"/>
          </Field>
        </div>
        <button
          type="submit"
          disabled={submitting || !dirty}
          className="btn btn-block btn-primary mt-lg"
        >
          Confirm
        </button>
      </form>
  );

  componentDidMount () {
    const { client } = this.context
    if (!this.props.user) {
      const { query } = this.props.location
      const data = {
        client: query.client_id,
        uid: query.uid,
        'access-token': query.token
      }
      client.get('auth/validate_token', { data, auth: true }).then(result => {
        this.props.setCurrentUser(result.data)
      })
    }
  }

  onSubmit = (data) => {
    const { client, router } = this.context
    return client.put('/auth/password', { data }).then(() => {
      toastr.success('Reset Password', 'You successfully changed password')
      router.push('/profile')
    }, (response) => responseErrorsParser(response))
  }

  render () {
    return (
      <div className="block-center mt-xl wd-xl animated fadeIn">
        <div className="panel panel-dark panel-default">
          <div className="panel-body">
            <p className="text-center pv">RECOVERY PASSWORD</p>
            <p className="text-center">
              Please enter a new password and press confirm to change your password.
            </p>
            <Reset.Form onSubmit={this.onSubmit}/>
          </div>
        </div>
      </div>
    )
  }
}
