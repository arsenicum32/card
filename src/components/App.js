import React from 'react'
import { connect } from 'react-redux'
import { filter , mfilter , Line , chart , MAIN , TABLE, datachart, ERROR  } from '../actions'
import { getCookie } from '../helpers/cockie'


// Импортим компоненты
import Chart from './chart'
import Main from './main'

import './style.styl'

import fromTo from '../helpers/fromto'

import Chance from 'chance'
import moment from 'moment'

import ins from '../helpers/rest'


const chance = new Chance()


// Отображать таблицу

let Details = ({table , filter , mfilter , chL , dfil , fil })=> (
  <div className="block">
    <h2>детализация</h2>
    <div className="panel">
      <div className="gl">
        {['по дням','по неделям','по месяцам'].map((d,i)=> (
          <span key={i}><a className={filter == i ? "active" : ""}
          onClick={ e=> fil(i, mfilter) }
          href="#">{d}</a>&nbsp; / </span>
        ))}
      </div>
    </div>
    <p>показывать на графике:</p>
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
  state => ({table: state.data.table, filter: state.data.filter , mfilter: state.data.mfilter }),
  dispatch => ({
    chL: (D,i)=> {
      dispatch(Line(i));
      dispatch(chart());
    },
    fil: (i, f)=> {
      dispatch(filter(i))
      let { from , to } = fromTo(i,f);
      ins(`/chart.php?from=${from}&to=${to}`).then(d=> {
        dispatch(TABLE(d.data.table))
        dispatch(datachart(d.data.chart))
      } ).catch(e=> dispatch(ERROR(e)) )
    },
    dfil: (i , f)=> {
      dispatch(mfilter(i))
      let { from , to } = fromTo(f,i);
      ins(`/chart.php?from=${from}&to=${to}`).then(d=> {
        dispatch(TABLE(d.data.table))
        dispatch(datachart(d.data.chart))
      } ).catch(e=> dispatch(ERROR(e)) )
    }
  })
)(Details)

// Указание дат (снизу слева) в таблице

let Dat = ({m , f })=> (
  <small style={{position:'relative', top: '-30px'}}>
    с {moment().locale('ru').subtract( (2-m) + 1, ['days', 'week', 'month'][f] ).format('LL')}<br/>
    по {moment().locale('ru').subtract( (2-m) , ['days', 'week', 'month'][f] ).format('LL')}
  </small>
)

Dat = connect(
  state=> ({m: state.data.mfilter , f: state.data.filter })
)(Dat)

// Блок ошибки

let Error = ({er})=> (
  <div className="error" style={{display: er ? 'block': 'none'}}>
    <h1>Connect server Error</h1>
    <a href='#' onClick={_=> window.location.reload() }>reload</a>
  </div>
)

Error = connect(state=> ({er: state.data.error}))(Error)



// Основной блок счетчика

const Counter = ()=> (
  <div className="counter">
    <Error />
    <h1>Карьерная карта ГАЗ</h1>
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
  </div>
)

export default App
