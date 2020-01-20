
const TokenKey = 'Admin-Token'

export function setToken(token) {
  return sessionStorage.set(TokenKey, token)
}
export function getToken() {
  return sessionStorage.get(TokenKey)
  return JSON.parse(val);
}

export function removeToken() {
  return sessionStorage.remove(TokenKey)
}
