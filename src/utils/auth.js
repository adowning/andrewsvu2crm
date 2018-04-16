/* globals Store */
import api from './backend-api'
import { Auth } from 'aws-amplify';

export default {
  loginAmplify (uname, pass, cb){
    Auth.signIn(uname, pass)
    .then(amplifyUser => {
      console.log(amplifyUser)
      Store.dispatch('user/updateUserAmplify', {amplifyUser})
      if (cb) cb(true, null)
    })
    .catch(err => console.log(err));
  },
  login (username, pass, cb) {
    cb = arguments[arguments.length - 1]
    // let data = 'username=' + username + '&password=' + pass
    let data = {
      username: username,
      pass: pass
    }
    api.login(data).then((res) => {
      const token = res.attributes.sessionToken
      const user = res
      Store.dispatch('user/updateUser', {user, token})
      if (cb) cb(true, null)
      this.onChange(true)
    }, (err) => {
      console.log(err)
      if (cb) cb(false, err)
      this.onChange(false)
    })
  },
  getToken () {
    return Store.state.user.token
  },
  logout (cb) {
    Store.dispatch('user/logout')
    if (cb) cb(false)
    this.onChange(false)
  },
  loggedIn () {
    return !!Store.state.user.token
  },
  onChange () {}
}
