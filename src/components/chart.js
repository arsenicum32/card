import React from 'react'
import { connect } from 'react-redux'

import LineChart from 'react-linechart'
import './chart.styl'

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

export default Chart
