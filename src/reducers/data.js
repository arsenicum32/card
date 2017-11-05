const chartgenerator = _ => {
  let points = [];
  for(var i=0;i<10;i++){
    points.push({
      x: ( new Date().getTime() - i*chance.integer({min:1900,max:2000}) ),
      y: chance.integer({min:0,max:20})
    })
  }

  return points
}

const st = {
  background: 'white',
  main: {
  },
  table: [
    {s: false, v: 'просмотры', q: 100, c: 'red'},
    {s: false, v: 'ср. онлайн', q: 10 , c: 'blue'},
    {s: false, v: 'новые посетители', q: 50 , c: 'hotpink'},
    {s: false, v: 'кол. сформированных МРД', q: 80 , c: 'gold'},
    {s: false, v: 'кол. выгруженных в excel', q: 100, c: 'lightgreen'},
  ],
  sw: [
    '1 ноября', 'вчера', 'сегодня'
  ],
  filter: 0,
  mfilter: 2,
  chart: []
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
      action.i == 1 ?  ['позапрошлая','прошлая','текущая'] : nsw= ['июнь', 'июль', 'август']
      : ['1 ноября', 'вчера', 'сегодня'] ;

      return {...state, filter: parseInt(action.i), sw: nsw }
      break;
    case "mfilter":
      return {...state, mfilter: action.i }
      break;
    case "main":
      const AC = action;
      delete AC.type
      return {...state, main: AC }
    case "chart":
      const TB = JSON.parse(JSON.stringify(state.table));
      var ch = []

      for(let i=0;i< TB.length;i++){

        if(TB[i].s){
          ch.push( {
            //id: 'test',
            name: TB[i].v ,
            color: TB[i].c ,
            points: chartgenerator()
          }) //.push( chartgenerator({name: 'TB[i].v' , color: 'red' }) )
        }
      }
      return {...state, chart: ch }
      break;
    default:
      return state
  }
}
export default data
