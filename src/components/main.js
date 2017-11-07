import React from 'react'
import { connect } from 'react-redux'

let Main = ({ main })=>(
  <div className="main">
    <table style={{width:"100%"}}>
      <tbody>
        <tr>
          <th>статистика</th>
          <th>сегодня</th>
          <th>вчера</th>
          <th>позавчера</th>
          <th>за 7 дней</th>
        </tr>
      { main.length ?
        main.map( (d,i)=>(
          <tr key={i}>
            {d.map( (td,n)=>  <td key={n}>{td}</td> ) }
          </tr>
        ))
      : null }
      </tbody>
    </table>
    { main.length ? null : <div className="loading"></div>}
  </div>
)
Main = connect(
  state => ({main: state.data.main})
)(Main)

export default Main
