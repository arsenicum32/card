import React from 'react'
import { connect } from 'react-redux'
import { filter , mfilter , Line , chart  } from '../actions'

import { setCookie , getCookie } from '../helpers/cockie'

import Chance from 'chance'
import moment from 'moment'


const chance = new Chance()

import LineChart from 'react-linechart'
import './chart.styl'

import axios from 'axios'

const uid = getCookie('uid') ? getCookie('uid') :  setCookie( 'uid',  chance.guid() , {
  expires: new Date().getTime() * 1000
});

var ins = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {'X-Custom-Header': 'foobar'}
});

ins.get('/open/'+uid).then(d=>{
  console.log(d.data);
})

window.onbeforeunload = e=> {
  ins.get('/leave/'+uid).then(d=>{
    console.log(d.data);
  })
}

import './style.styl'

let Chart = ({data})=>(
  <LineChart
    width={300}
    height={230}
    hideXLabel={true}
    hideYLabel={true}
    hidePoints={true}
    data={data}
    isDate={false}
    ticks={0}
    showLegends={false}
    //xParser={ x=> ( moment(x).fromNow() ) }
    //yMax={'10'}
    yMin={0}
  />
)

Chart = connect( state=> ({data:state.data.chart}) )(Chart)


let Main = ({ main })=>(
  <div className="main">
    <h2>общая информация</h2>
    { Object.keys(main).map(d=>(
      <div key={d} className="inf">
        <div className="num">{ main[d]}</div>
        <p>{d}</p>
      </div>
    )) }
  </div>
)
Main = connect(
  state => ({main: state.data.main})
)(Main)

let Details = ({table , sw, filter , mfilter , chL , dfil , fil })=> (
  <div className="block">
    <h2>детализация</h2>
    <div className="panel">
      <div className="sw">
        {sw.map( (d,i)=>(
          <span key={d}><a href="#" className={mfilter == i ? "active" : ""}
          onClick={ e=> dfil(i) }
          href="#">{d}</a>&nbsp;</span>
        ))}
      </div>
      <div className="gl">
        {['по дням','по неделям','по месецам'].map((d,i)=> (
          <span key={i}><a className={filter == i ? "active" : ""}
          onClick={ e=> fil(i) }
          href="#">{d}</a>&nbsp;</span>
        ))}
      </div>
    </div>
    <ul>
    {table.map( (d,i)=> (
      <li key={i} onClick={ e=> chL(d.s, i) } style={{cursor:'pointer'}} >
        <div
        style={{background: d.s ? d.c:'none', borderColor: d.s ? d.c:'black'}}
        className="bubl"></div><span>{d.v}</span><span className="d">{d.q}</span>
      </li>
    ))}
    </ul>
  </div>
)
Details = connect(
  state => ({table: state.data.table , sw: state.data.sw, filter: state.data.filter , mfilter: state.data.mfilter }),
  dispatch => ({
    chL: (D,i)=> {
      dispatch(Line(i));
      dispatch(chart());
    },
    fil: e=> dispatch(filter(e)),
    dfil: e=> dispatch(mfilter(e))
  })
)(Details)



const Counter = ()=> (
  <div className="counter">
    <h1>счетчик посещений</h1>
    <hr/>
    <Main />
    <hr/>
    <Details />
    <hr/>
    <div className="block">
      <h2>график</h2>
      <Chart />
      <small style={{position:'relative', top: '-30px'}}>с {moment().lang('ru').subtract(6, 'days').format('LL')}<br/> по {moment().lang('ru').subtract(1, 'days').format('LL')}</small>
    </div>
  </div>
)

const App = () => (
  <div>
    <Counter />
  </div>
)

export default App
