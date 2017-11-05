import axios from 'axios'

const ins = axios.create({
  baseURL: 'http://46.101.126.64:5000/',
  headers: {'X-Custom-Header': 'foobar'}
});

export default ins
