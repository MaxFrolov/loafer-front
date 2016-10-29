/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect } from 'redux-async-connect'
import useScroll from 'scroll-behavior'

import getRoutes from './routes'

const client = new ApiClient()
const browserHistoryScroll = useScroll(browserHistory, (prevLocation, location) => (
  // Don't scroll if the pathname is the same.
  !prevLocation || location.pathname !== prevLocation.pathname
))
const dest = document.getElementById('content')
const store = createStore(browserHistoryScroll,
  client, window.__data) // eslint-disable-line no-underscore-dangle
const history = syncHistoryWithStore(browserHistoryScroll, store)

const component = (
  <Router
    render={(props) =>
      <ReduxAsyncConnect {...props} helpers={{ client }} filter={item => !item.deferred} />
    } history={history}
  >
    {getRoutes(store, client)}
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    {component}
  </Provider>,
  dest
)

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools')
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  )
}
