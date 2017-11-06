import axios from 'axios'

const ins = axios.create({
  baseURL: BASE,
  headers: {'X-Custom-Header': 'foobar'}
});

export default ins
