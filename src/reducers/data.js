import moment from 'moment'

import fromTo from '../helpers/fromto'

var sub = ['days', 'month', 'week']


const st = {
  error: false,
  main: [],
  table: [],
  sw: [
    moment().locale('ru').subtract(2,'days').format('dddd') , 'вчера', 'сегодня'
  ],
  filter: 0,
  mfilter: 2,
  chart: [],
  datachart: []
}
const data = (state = st, action ) => {
  switch (action.type) {
    case "line":
      const T = JSON.parse(JSON.stringify(state.table));
      T[action.i].s = !T[action.i].s;
      return {...state, table: T }
      break;
    case "filter":
      let nsw = JSON.parse( JSON.stringify(state.sw) );
      nsw = action.i?
      action.i == 1 ?  ['позапрошлая','прошлая','текущая'] :
      nsw = [moment().locale('ru').subtract(2,'month').format('MMMM'), moment().locale('ru').subtract(1,'month').format('MMMM') , moment().locale('ru').format('MMMM')]
      : [moment().locale('ru').subtract(2,'days').format('dddd'), 'вчера', 'сегодня'] ;

      return {...state, filter: parseInt(action.i), sw: nsw }
      break;
    case "mfilter":
      return {...state, mfilter: action.i }
      break;
    case "main":
      const AC = action.tb;
      return {...state, main: AC }
    case "datachart":
      var TB = JSON.parse(JSON.stringify(state.table));
      var ch = action.chart

      for(let i=0;i< TB.length;i++){
        TB[i].s ? ch[i].color = TB[i].c : ch[i].color = 'none';
      }
      return {...state , datachart: action.chart , chart: ch }
      break;
    case "chart":
      var TB = JSON.parse(JSON.stringify(state.table));
      var ch = JSON.parse(JSON.stringify(state.datachart));

      for(let i=0;i< TB.length;i++){
        TB[i].s ? ch[i].color = TB[i].c : ch[i].color = 'none';
      }
      return {...state, chart: ch }
      break;
    case "table":
      return {...state, table: action.table }
    case "error":
      return {...state, error: action.error }
    default:
      return state
  }
}
export default data
