import cookies from 'browser-cookies'

const keys = ['uid', 'access-token', 'client', 'expiry']

export function setAuthData (data) {
  if (data) {
    keys.forEach((key) => {
      cookies.set(key, data[key].toString(), { expires: 14 })
    })
  }
}

export function getAuthData () {
  const data = {}
  keys.forEach((key) => {
    data[key] = cookies.get(key)
    data.id = cookies.get('id')
  })
  return data
}

export function setCurrentUserId(id) {
  cookies.set('id', id.toString(), { expires: 14 })
}

export function clearData () {
  keys.forEach((key) => cookies.erase(key))
  cookies.erase('id')
}
