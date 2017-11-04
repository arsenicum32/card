import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.4.1',
  timeout: 5000
});

export default instance
