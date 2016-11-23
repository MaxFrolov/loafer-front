import superagent from 'superagent'
import config from '../config'
import { getAuthData, setAuthData } from './authData'
import _ from 'lodash'
import { validateUser, LOGOUT } from 'redux/modules/auth'
import cookies from 'browser-cookies'

const methods = ['get', 'post', 'put', 'patch', 'del']

function formatUrl (path) {
  /*
   * For both client and server add /api to request url
   * Client request must be prefixed with /api to be proxied to API server by node
   * Server request url must be prefixed cause API server expects url to start with api
   */
  const adjustedPath = path[0] !== '/' ? `/${path}` : path
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return `http://${config.apiHost}:${config.apiPort}/api${adjustedPath}`
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return `/api${adjustedPath}`
}

class _ApiClient {
  constructor (authCookie, response) {
    methods.forEach((method) => (
      this[method] = (path, { params, data, auth } = {}) =>
        new Promise((resolve, reject) => {
          const request = superagent[method](formatUrl(path))

          const headers = ['access-token', 'client', 'uid', 'expiry']

          const authDataSource = __SERVER__ ? authCookie : getAuthData()

          // Check if authorize data present and set headers
          if (!_.isEmpty(_.pickBy(authDataSource))) {
            headers.forEach((header) => {
              request.set(header, authDataSource[header])
            })

            request.set('token-type', 'Bearer')
          }

          if (params) {
            request.query(params)
          }

          if (data) {
            request.send(data)
          }

          if (!__SERVER__ && !this.validateUser) this.validateAuthData()

          if (auth) {
            request.end((err, res) => {
              if (err) {
                if (__SERVER__ && err.status === 401) {
                  headers.forEach(header => {
                    response.clearCookie(header)
                  })
                }
                reject(res.body || err)
              } else {
                const data = {}
                headers.forEach(header => {
                  data[header] = res.header[header]
                })
                data.id = _.get(res, 'body.resource.id')
                if (!__SERVER__) setAuthData(data)
                resolve(res.body)
              }
              this.validateUser = false
            })
          } else {
            request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)))
          }
        })
    ))
  }

  setStore = (store) => {
    this.store = store
  }

  validateAuthData = () => {
    const user = this.store.getState().auth.user
    const cookieToken = cookies.get('access-token')
    const cookieId = cookies.get('id')
    if (cookieToken && user && (user.id !== parseInt(cookieId, 10))) {
      this.validateUser = true
      return this.store.dispatch(validateUser(getAuthData()))
    }
    if (!cookieToken && user) {
      return this.store.dispatch({
        type: LOGOUT
      })
    }
    return false
  }
}

const ApiClient = _ApiClient

export default ApiClient
