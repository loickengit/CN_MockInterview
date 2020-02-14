import axios from 'axios'

let env = (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development') ? 'dev':process.env.NODE_ENV

let config_model = require('../../config/index')
let config = config_model.dev
if (env === 'production') {
  // config = config_model.production
}

let host = config.server_host,
    port = config.server_port

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = 'http://' + host + ':' + port + '/'

export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {

  login (username, password) {
    let url = '/user/login?username=' + username + '&password=' + password
    return axios.get(url)
  },

  getLatestWork (username, notateType) {
    let url = '/img/getLatestWork?username=' + username + '&notateType=' + notateType
    return axios.get(url)
  },

  submmitNotation (sample) {
    let url = '/notation/submitNotation'
    return fetch(url, sample)
  },

  getSample (username, sequenceNum, notateType) {
    let url = '/notation/getSample?username=' + username + '&sequenceNum=' + sequenceNum + '&notateType=' + notateType
    return axios.get(url)
  }
}
