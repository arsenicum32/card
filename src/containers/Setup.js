import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setupSwitch , setupColor , setupBr , setupMode , setupLoad } from '../actions'
import instance from '../helpers/rest'
import { modes } from '../helpers/arch'


const mapStateToProps = state => {
  return {
    st: state.setup.st,
    color: state.setup.color,
    mode: state.setup.mode,
    brightness: state.setup.brightness,
    load: state.setup.load,
    call: state.setup.call
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStClick: (e) => {
      instance.get( '/'+ e.target.innerHTML )
      .then(e=>   dispatch(setupLoad()) )
      .catch(e=> console.log(e))
      dispatch(setupSwitch(e.target.innerHTML))
    },
    handle: (e, f, route , call)=>{
      if(new Date().getTime() - call > 200){
        console.log(e.target.value)
      }else{
        console.log("ban");
      }
      instance.get( '/on?'+route+'='+( route=="color" ? e.target.value.slice(1,e.target.value.length) : e.target.value )  )
      .then(e=> dispatch(setupLoad("good")) )
      .catch(e=> dispatch(setupLoad("bad")) )
      dispatch(f(e.target.value))
    },
    handleClick: e=>{
      //console.log(e.target.value)
      instance.get( '/on?br='+e.target.value )
      .then(e=> dispatch(setupLoad("good")) )
      .catch(e=> dispatch(setupLoad("bad")) )
      dispatch(setupBr(e.target.value))
    }
  }
}

let Setup = ({
  onStClick ,
  st = 'on' ,
  color ,
  brightness ,
  mode ,
  load , call , handle, handleClick
}) => (
    <div>
      вкл/выкл
      { load? <a href='#' onClick={onStClick}>{st}</a> : void(0) }
      {
        load?
        st=='off'?
        <div>
        <select onChange={e=> handle(e, setupMode , 'mode' , call)} >
          {
            modes.map( (m , n)=> <option key={n} value={n}>{ m }</option> )
          }
        </select>
        {
          mode==0?
          <div><span style={{color}}>color</span>
            <input type="color" value={color} onChange={e=> handle(e, setupColor, 'color' , call)} /> ,
            яркость:
            <button onClick={handleClick} value="10" >тускло</button>
            <button onClick={handleClick} value="40" >бледно</button>
            <button onClick={handleClick} value="200" >мало</button>
            <button onClick={handleClick} value="400" >средне</button>
            <button onClick={handleClick} value="800" >норм</button>
            <button onClick={handleClick} value="1023" >ярко</button>
          </div>
          :
          <div>список режимов</div>
        }
        </div>
        : void(0) : <div>loading</div>
      }
    </div>
)


Setup = connect(mapStateToProps, mapDispatchToProps)(Setup)

export default Setup
