import axios from 'axios'
const token = '?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77'
const BASE_URL = 'https://www.humanity.com/api/v2/'


const instance = axios.create({
  baseURL: BASE_URL,
  timeout: false,
  params: {} // do not remove this, its added to add params later in the config
})

instance.interceptors.response.use((response) => response, (error) => {
  console.log(error.config)
  return Promise.reject(error)
})

export default {
  getData (action) {
    let url = `${BASE_URL}`
    url += action + token
    return instance.get(url)
  },
  postData (action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.post(url, data)
  },
  putData (action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.put(url, data)
  },
  deleteData (action) {
    let url = `${BASE_URL}`
    url += action
    return instance.delete(url)
  },
  login (action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.get(url, data)
  }
}
