import React from 'react'
import { connect } from 'react-redux'
import { filter , mfilter , Line , chart , MAIN  } from '../actions'

import Chart from './chart'
import Main from './main'

import './style.styl'

import Chance from 'chance'
import moment from 'moment'


const chance = new Chance()

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


const Dat = ()=> (
  <small style={{position:'relative', top: '-30px'}}>с 
    { moment().lang('ru').subtract(6, 'days').format('LL')}<br/>
    по {moment().lang('ru').subtract(1, 'days').format('LL')}
  </small>
)

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
