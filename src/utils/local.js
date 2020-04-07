
/**
 * 对于本地存储操作的封装
 */
export function getSid() {
  return sessionStorage.getItem('sid')
}

// export function setSid(sid) {
//   return Cookies.set("sid",sid)
// }

// export function removeSid() {
//   return Cookies.remove("sid")
// }

export function getKey(Infor) {
  return JSON.parse(sessionStorage.getItem(Infor))
}

export function setKey(key,value) {
  sessionStorage.setItem(key,JSON.stringify(value)) 
}

export function removeKey(key) {
  return sessionStorage.remove(key)
}


