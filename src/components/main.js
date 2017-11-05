import React from 'react'
import { connect } from 'react-redux'

let Main = ({ main })=>(
  <div className="main">
    <h2>общая информация</h2>
    { Object.keys(main).length ?  Object.keys(main).map(d=>(
      <div key={d} className="inf">
        <div className="num">{ main[d]}</div>
        <p>{d}</p>
      </div>
    )) : <div className="loading"></div> }
  </div>
)
Main = connect(
  state => ({main: state.data.main})
)(Main)

export default Main
