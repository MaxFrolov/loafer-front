import { toastr } from 'react-redux-toastr'
import _ from 'lodash'

export default function errorsParser (response, errorKeys) {
  if (response) {
    if (response.errors) {
      const result = {}
      if (_.isObject(response.errors) && !_.isArray(response.errors)) {
        _.each(errorKeys, (key) => {
          if (response.errors[key]) {
            toastr.error(_.startCase(key), response.errors[key].join(', '))
          }
        })
        const keys = Object.keys(response.errors)
        keys.forEach((key) => {
          if (_.includes(key, '.')) {
            const parsedKey = key.split('.')
            const origin = parsedKey[0]
            const property = parsedKey[1]
            if (!result[origin]) result[origin] = {}
            result[origin][property] = response.errors[key].join(';')
          } else {
            result[key] = response.errors[key].join(';')
          }
        })
        throw result
      }
      return toastr.error('Error', response.errors.toString())
    }
    toastr.error('Error', response.toString())
  }
  return false
}
