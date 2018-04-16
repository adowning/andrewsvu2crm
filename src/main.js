// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from '@/router'
import store from '@/store'
import api from './utils/backend-api'
import humanity from './utils/humanity-api'
import appUtil from './utils/app-util'
import Amplify, { Auth, Logger } from 'aws-amplify'
import VueProgressBar from 'vue-progressbar'
import awsExports from './aws-exports'
var Parse = require('parse')
Parse.initialize('11a962c545d719a4778b5bf4720997488fe1e4f3')
Parse.serverURL = 'http://34.207.78.48:80/parse'

const options = {
  color: '#2196f3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.1s',
    opacity: '0.5s',
    termination: 400
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

Vue.use(Vuetify)
Vue.config.productionTip = false

Amplify.configure(awsExports)
Amplify.Logger.LOG_LEVEL = 'WARN'
const logger = new Logger('main')
Auth.currentUserInfo()
  .then(user => logger.debug(user))
  .catch(err => logger.debug(err))

window.Store = store
Vue.prototype.api = api
Vue.prototype.appUtil = appUtil
Vue.prototype.humanity = humanity
Vue.prototype.parse = Parse
Vue.prototype.amplify = Amplify

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  // template: '<App/>',
  // components: { App }
})
