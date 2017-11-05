import React from 'react'
import { connect } from 'react-redux'
import { filter , mfilter , Line , chart , MAIN , TABLE, datachart, ERROR  } from '../actions'
import { getCookie } from '../helpers/cockie'

import Chart from './chart'
import Main from './main'

import './style.styl'

import fromTo from '../helpers/fromto'

import Chance from 'chance'
import moment from 'moment'

import ins from '../helpers/rest'


const chance = new Chance()

let Details = ({table , sw, filter , mfilter , chL , dfil , fil })=> (
  <div className="block">
    <h2>детализация</h2>
    <div className="panel">
      <div className="sw">
        {sw.map( (d,i)=>(
          <span key={d}><a href="#" className={mfilter == i ? "active" : ""}
          onClick={ e=> dfil(i , filter) }
          href="#">{d}</a>&nbsp;</span>
        ))}
      </div>
      <div className="gl">
        {['по дням','по неделям','по месецам'].map((d,i)=> (
          <span key={i}><a className={filter == i ? "active" : ""}
          onClick={ e=> fil(i, mfilter) }
          href="#">{d}</a>&nbsp;</span>
        ))}
      </div>
    </div>
    <ul>
    { table.length ? table.map( (d,i)=> (
      <li key={i} onClick={ e=> chL(d.s, i) } style={{cursor:'pointer'}} >
        <div
        style={{background: d.s ? d.c:'none', borderColor: d.s ? d.c:'black'}}
        className="bubl"></div><span>{d.v}</span><span className="d">{d.q}</span>
      </li>
    )) : <div className="loading"></div> }
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
    fil: (i, f)=> {
      dispatch(filter(i))
      let { from , to } = fromTo(i,f);
      ins(`/det/${from}/${to}`).then(d=> {
        dispatch(TABLE(d.data.table))
        dispatch(datachart(d.data.chart))
      } ).catch(e=> dispatch(ERROR(e)) )
    },
    dfil: (i , f)=> {
      dispatch(mfilter(i))
      let { from , to } = fromTo(f,i);
      ins(`/det/${from}/${to}`).then(d=> {
        dispatch(TABLE(d.data.table))
        dispatch(datachart(d.data.chart))
      } ).catch(e=> dispatch(ERROR(e)) )
    }
  })
)(Details)


let Dat = ({m , f })=> (
  <small style={{position:'relative', top: '-30px'}}>
    с { moment().locale('ru').subtract( (2-m) + 1, ['days', 'week', 'month'][f] ).format('LL')}<br/>
    по {moment().locale('ru').subtract( (2-m) , ['days', 'week', 'month'][f] ).format('LL')}
  </small>
)

Dat = connect(
  state=> ({m: state.data.mfilter , f: state.data.filter })
)(Dat)

let Error = ({er})=> (
  <div className="error" style={{display: er ? 'block': 'none'}}>
    <h1>Connect server Error</h1>
    <a href='#' onClick={_=> window.location.reload() }>reload</a>
  </div>
)

Error = connect(state=> ({er: state.data.error}))(Error)


const Counter = ()=> (
  <div className="counter">
    <Error />
    <h1>счетчик посещений</h1>
    <hr/>
    <Main />
    <hr/>
    <Details />
    <hr/>
    <div className="block">
      <h2>график</h2>
      <Chart />
      <Dat />
    </div>
  </div>
)



const App = () => (
  <div>
    <Counter />
    <div className="Cpanel">
      <a href='#' onClick={ e=> ins.get(`/form/${getCookie('uid')}`) } >сформировать</a>
      <a href='#' onClick={ e=> ins.get(`/load/${getCookie('uid')}`) } >загрузить</a>
    </div>
  </div>
)

export default App
