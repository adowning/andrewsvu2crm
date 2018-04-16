import axios from 'axios'
const token = '?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77'
var BASE_URL = '/humanity'
if (process.env.NODE_ENV == 'development') {
  var BASE_URL = 'https://www.humanity.com/api/v2'
}
console.log(BASE_URL)

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: false
})
// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    /* global window Store */
    config.headers.common['Access-Control-Allow-Origin'] = '*'

    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => response,
  error => {
    console.log(error.config)
    return Promise.reject(error)
  }
)

export default {
  getData(action) {
    let url = `${BASE_URL}`
    url += action + token
    return instance.get(url)
  },
  postData(action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.post(url, data)
  },
  putData(action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.put(url, data)
  },
  deleteData(action) {
    let url = `${BASE_URL}`
    url += action
    return instance.delete(url)
  },
  login(action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.get(url, data)
  }
}
