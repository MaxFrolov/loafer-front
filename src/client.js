/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'
import { Provider } from 'react-redux'
import { Router, browserHistory, match } from 'react-router'
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

const routes = getRoutes(store, client)

match({ history, routes }, (error, redirectLocation, renderProps) => {
  const component = (
    <Router
      {...renderProps}
      render={(props) =>
        <ReduxAsyncConnect {...props} helpers={{ client }} filter={item => !item.deferred}/>
      }
      history={history}
      routes={routes}
    />
  )

  ReactDOM.render(
    <Provider store={store} key="provider">
      {component}
    </Provider>,
    dest
  )

  if (process.env.NODE_ENV !== 'production') {
    window.React = React // enable debugger

    if (!dest || !dest.firstChild || !dest.firstChild.attributes
      || !dest.firstChild.attributes['data-react-checksum']) {
      console.error('Server-side React render was discarded. Make sure ' +
        'that your initial render does not contain any client-side code.')
    }
  }

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
})
