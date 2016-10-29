import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { registration } from 'redux/modules/auth'
import { showOnly as showModal } from 'redux/modules/modals'
import Helmet from 'react-helmet'
import Field from 'components/Field/Field'
import { toastr } from 'react-redux-toastr'
import styles from './Register.scss'
import classNames from 'classnames/bind'
import responseErrorsParser from 'helpers/responseErrorsParser'

const cx = classNames.bind(styles)
@connect(null, { registration, showModal })
export default class Join extends React.Component {
  static propTypes = {
    registration: React.PropTypes.func.isRequired,
    showModal: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static Form = reduxForm({
    form: 'registration',
    fields: ['email', 'password', 'first_name', 'last_name']
  })(
    ({ handleSubmit, fields: { email, password, first_name, last_name },
      error, submitting, dirty }) =>
      <form className={`mb-lg ${error && 'has-error'}`} onSubmit={handleSubmit} role="form">
        <div className="form-group has-feedback">
          <Field field={first_name}>
            <input
              type="text"
              placeholder="First name"
              autoComplete="off"
              required="required"
              className="form-control"
              {...first_name}
            />
            <span className="fa fa-user form-control-feedback text-muted"/>
          </Field>
        </div>
        <div className="form-group has-feedback">
          <Field field={last_name}>
            <input
              type="text"
              placeholder="Last name"
              autoComplete="off"
              required="required"
              className="form-control"
              {...last_name}
            />
            <span className="fa fa-user form-control-feedback text-muted"/>
          </Field>
        </div>
        <div className="form-group has-feedback">
          <Field field={email}>
            <input
              type="email"
              placeholder="Email"
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
              placeholder="Password"
              autoComplete="off"
              required="required"
              className="form-control"
              {...password}
            />
            <span className="fa fa-lock form-control-feedback text-muted"/>
          </Field>
        </div>
        <button
          type="submit"
          disabled={submitting || !dirty}
          className="btn btn-block btn-primary"
        >
          Sign Up For Free
        </button>
      </form>
  );

  onSubmit = (data) => {
    const { registration } = this.props
    return registration(data).then(() => {
      toastr.success('You successfully signed up')
      this.context.router.push('/profile')
    }, (response) => responseErrorsParser(response))
  }

  render () {
    const { showModal } = this.props
    return (
      <div className="animated fadeIn">
        <Helmet title="Join"/>
        <div className="container">
          <div className={cx('registration-wrapper')}>
            <div className="row">
              <h3 className="text-center">
                Get trading Experience with Auction simulator
              </h3>
              <div className="col-sm-offset-1 col-sm-6">
                <div className={cx('list-wrapper')}>
                  <div className={cx('list-item')}>
                    <i className={cx('list-item-icon', 'fa', 'fa-fw', 'fa-home', 'fa-3x')}/>
                    <strong className={cx('list-item-label')}>
                      More than 20,000 real estate properties in our database
                    </strong>
                  </div>
                  <div className={cx('list-item')}>
                    <i className={cx('list-item-icon', 'fa', 'fa-fw', 'fa-users', 'fa-3x')}/>
                    <strong className={cx('list-item-label')}>
                      Community of auction's experts
                    </strong>
                  </div>
                  <div className={cx('list-item')}>
                    <i className={cx('list-item-icon', 'fa', 'fa-fw', 'fa-building-o', 'fa-3x')}/>
                    <strong className={cx('list-item-label')}>
                      Archive expert skills for luxury properties in Australia
                    </strong>
                  </div>
                  <div className={cx('list-item')}>
                    <i className={cx('list-item-icon', 'fa', 'fa-fw', 'fa-user-secret', 'fa-3x')}/>
                    <strong className={cx('list-item-label')}>
                      Agent and real estate expert engagement platform
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className={cx('social-buttons-wrapper')}>
                  <button className="btn btn-block btn-social btn-facebook">
                    <span className="fa fa-facebook"/>
                    Sign Up With Facebook
                  </button>
                  <button className="btn btn-block btn-social btn-google">
                    <span className="fa fa-google-plus"/>
                    Sign Up Google+
                  </button>
                  <button className="btn btn-block btn-social btn-linkedin">
                    <span className="fa fa-linkedin"/>
                    Sign Up With LinkedIn
                  </button>
                </div>
                <div className={cx('text-center', 'or')}>
                  -OR-
                </div>
                <Join.Form onSubmit={this.onSubmit}/>
                <div className={cx('text-center', 'terms')}>
                  {'By clicking you agree the '}
                  <a onClick={() => showModal('terms')}>
                    Terms and Conditions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
