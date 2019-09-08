import jwt from 'jsonwebtoken'

class Auth {
  static setToken(token, message) {
    localStorage.setItem('token', token)
    localStorage.setItem('message', message)
  }

  static getToken() {
    return localStorage.getItem('token')
  }
  static getUserInfo() {
    return localStorage.getItem('message')
  }

  static removeToken() {
    localStorage.removeItem('token')
    localStorage.removeItem('message')
  }

  static getPayload() {
    return jwt.decode(this.getToken())
  }

  static isAuthenticated() {
    const payload = this.getPayload()
    const now = Math.round(Date.now() / 1000)
    return payload && now < payload.exp
  }

  static isCurrentUser(user) {
    const payload = this.getPayload()
    return payload && user._id === payload.sub
  }
}

export default Auth