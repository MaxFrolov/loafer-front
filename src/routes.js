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
  ProfileSettings,
  ProfileSettingsUpdate,
  ProfileAccountUpdate,
  ProfileNotifications,
  Recovery,
  Register,
  Reset,
  Groups,
  EventsIndex,
  EventCreate,
  EventsMap,
  InnerLayout,
  LandingLayout
} from 'containers'

export default (store, client, authData) => {
  function preLoadUser (nextState, replace, proceed) {
    const auth = store.getState().auth
    if (!auth.user) {
      if (authData && authData.client && __SERVER__) {
        client.get('auth/validate_token', { auth: true }).then(result => {
          store.dispatch(setCurrentUser(result.resource))
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
        <Route path="profile" component={Profile}>
          <IndexRedirect to="settings" />
          <Route path="settings" component={ProfileSettings}/>
          <Route path="settings/update" component={ProfileSettingsUpdate}/>
          <Route path="account/update" component={ProfileAccountUpdate}/>
          <Route path="notifications" component={ProfileNotifications}/>
        </Route>
        <Route path="groups" component={Groups}/>
        <Route path="event">
          <IndexRedirect to="new" />
          <Route path="new" component={EventCreate}/>
          <Route path="show" component={EventCreate}/>
        </Route>
      </Route>
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  )
}
