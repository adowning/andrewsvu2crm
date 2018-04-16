// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
const awsmobile = {
  aws_app_analytics: 'enable',
  aws_cognito_identity_pool_id: 'us-east-1:8ec0279a-83a6-423e-b860-fbe26ae5c86c',
  aws_cognito_region: 'us-east-1',
  aws_content_delivery: 'enable',
  aws_content_delivery_bucket: 'andrews-hosting-mobilehub-1493081954',
  aws_content_delivery_bucket_region: 'us-east-1',
  aws_content_delivery_cloudfront: 'enable',
  aws_content_delivery_cloudfront_domain: 'd1rv1b8yy7xd36.cloudfront.net',
  aws_mobile_analytics_app_id: 'e842102287054838b3ac80bc8b9111fc',
  aws_mobile_analytics_app_region: 'us-east-1',
  aws_project_id: 'ccba6cda-b952-4336-b4b0-9a4c5376330c',
  aws_project_name: 'andrews',
  aws_project_region: 'us-east-1',
  aws_resource_name_prefix: 'andrews-mobilehub-1493081954',
  aws_sign_in_enabled: 'enable',
  aws_user_files: 'enable',
  aws_user_files_s3_bucket: 'andrews-userfiles-mobilehub-1493081954',
  aws_user_files_s3_bucket_region: 'us-east-1',
  aws_user_pools: 'enable',
  aws_user_pools_id: 'us-east-1_LDuyTsU9m',
  aws_user_pools_web_client_id: '5cbu55avmnlv0d8g6tj3755b0d'
}
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
// import awsExports from './aws-exports'
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

Amplify.configure(awsmobile)
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
