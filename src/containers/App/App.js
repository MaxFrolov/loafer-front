import React from 'react'
// components
import Helmet from 'react-helmet'
import ReduxToastr from 'react-redux-toastr'
import { Modals } from 'components'
import injectTapEventPlugin from 'react-tap-event-plugin'
// utils
import config from '../../config'
import { asyncConnect } from 'redux-async-connect'
import moment from 'moment'
// styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import styles from './App.scss'

injectTapEventPlugin()

@asyncConnect([{
  promise: () => Promise.resolve()
}])

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object,
    route: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    client: React.PropTypes.object
  };

  getChildContext () {
    return { client: this.props.route.client }
  }

  render () {
    moment.locale('ru')
    return (
      <MuiThemeProvider>
        <div className={styles['app']}>
          <Helmet {...config.app.head} />
          <ReduxToastr timeOut={4000} position="top-right" />
          <Modals />
          <div>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
