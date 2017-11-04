import React from 'react'
import { connect } from 'react-redux'
import '../styles/face.styl'

import html from './face.pug'

//import clm from '../helpers/clmtraker'
//import '../helpers/cors'
//import '../helpers/video'
//import { faceaction } from '../helpers/face'


console.log(html);


function load(){
}

window[ addEventListener ? 'addEventListener' : 'attachEvent' ]( addEventListener ? 'load' : 'onload', load )


const mapStateToProps = state => {
  // сюда из стейт протянем дату state.data
  return {
    test: state.data
  }
}

const mapDispatchToProps = dispatch => {

  document.body.addEventListener('keydown', function(e) {
    console.log(e.keyCode == 32);
  })
  // Если на сайте будет движ, то создадим для него store
  return {
    go: ()=> (console.log("go"))
  }
}




let Face = ({test , go})=>{
  return (<div>
      <input type="button" value="wait, loading video" disabled="disabled" onClick={_=> startVideo() } id="startbutton"></input>
      <div id="container">
				<video id="videoel" width="400" height="300" preload="auto" loop playsinline autoPlay> -->
				</video>
				<canvas id="overlay" width="400" height="300"></canvas>
			</div>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </div>)
}

Face = connect(mapStateToProps, mapDispatchToProps)(Face)

export default Face
