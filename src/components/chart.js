import React from 'react'
import { connect } from 'react-redux'
import fromTo from '../helpers/fromto'

import LineChart from 'react-linechart'
import './chart.styl'


// Компонента которая отображает график (библиотека LineChart )

let Chart = ({data ,m ,f})=>(
  <LineChart
    width={window.innerWidth*.6 > 500 ? 500 : window.innerWidth*.8 }
    height={230}
    hideXLabel={true}
    hideYLabel={true}
    hidePoints={true}
    data={data}
    isDate={false}
    ticks={0}
    showLegends={false}
    interpolate={'linear'}
    //xParser={ x=> ( moment(x).fromNow() ) }
    yMax={'10'}
    //xMin={fromTo(m,f).from + 1000}
    //xMax={fromTo(m,f).to - 1000}
    yMin={0}
  />
)

Chart = connect( state=> ({data:state.data.chart , m: state.data.mfilter, f: state.data.filter }) )(Chart)

export default Chart
