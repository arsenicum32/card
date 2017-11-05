import React from 'react'
import { connect } from 'react-redux'
import fromTo from '../helpers/fromto'

import LineChart from 'react-linechart'
import './chart.styl'

let Chart = ({data ,m ,f})=>(
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
    xMin={fromTo(m,f).from}
    xMax={fromTo(m,f).to}
    yMin={0}
  />
)

Chart = connect( state=> ({data:state.data.chart , m: state.data.mfilter, f: state.data.filter }) )(Chart)

export default Chart
