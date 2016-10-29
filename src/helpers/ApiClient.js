import superagent from 'superagent'
import config from '../config'
import { getAuthData, setAuthData } from './authData'

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
  constructor (authCookie) {
    methods.forEach((method) => (
      this[method] = (path, { params, data, auth } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path))

        const headers = ['access-token', 'client', 'uid', 'expiry']

        const authDataSource = __SERVER__ ? authCookie : getAuthData()

        headers.forEach((header) => {
          request.set(header, authDataSource[header])
        })

        request.set('token-type', 'Bearer')

        if (params) {
          request.query(params)
        }

        if (data) {
          request.send(data)
        }

        if (auth) {
          request.end((err, res) => {
            if (err) {
              reject(res.body || err)
            } else {
              const data = {
                client: res.header['client'],
                uid: res.header['uid'],
                expiry: res.header['expiry'],
                'access-token': res.header['access-token']
              }
              if (!__SERVER__) setAuthData(data)
              resolve(res.body)
            }
          })
        } else {
          request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)))
        }
      })))
  }
}

const ApiClient = _ApiClient

export default ApiClient
