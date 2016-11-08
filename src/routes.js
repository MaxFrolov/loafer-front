import React from 'react'
import { IndexRoute, Route, IndexRedirect } from 'react-router'
import { setCurrentUser } from 'redux/modules/auth'
import {
  App,
  Dashboard,
  Home,
  NotFound,
  Login,
  Profile,
  Recovery,
  Register,
  Reset,
  Groups,
  EventsIndex,
  EventsMap,
  InnerLayout,
  LandingLayout
} from 'containers'

export default (store, client) => {
  function preLoadUser (nextState, replace, proceed) {
    const auth = store.getState().auth
    if (!auth.user) {
      if (auth.client && __SERVER__) {
        client.get('auth/validate_token', { data: auth, auth: true }).then(result => {
          store.dispatch(setCurrentUser(result))
          proceed()
        }).catch(() => {
          proceed()
        })
        return
      }
    }
    proceed()
  }

  function requireLogin (nextState, replace) {
    const { user } = store.getState().auth
    if (!user) {
      replace('/login')
    }
  }

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App} client={client} scrollStrategy="none" onEnter={preLoadUser}>
      <Route component={LandingLayout}>
        <IndexRoute component={Home}/>
        <Route path="change_password" component={Reset}/>
        <Route path="login" component={Login}/>
        <Route path="recovery" component={Recovery}/>
        <Route path="register" component={Register}/>
      </Route>
      <Route component={InnerLayout} onEnter={requireLogin}>
        <Route path="dashboard" component={Dashboard}>
          <IndexRedirect to="map"/>
          <Route path="map" component={EventsMap}/>
          <Route path="events" component={EventsIndex}/>
        </Route>
        <Route path="profile" component={Profile}/>
        <Route path="groups" component={Groups}/>
      </Route>
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  )
}
