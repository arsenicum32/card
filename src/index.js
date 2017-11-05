import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
import ins from './helpers/rest'
import { MAIN } from './actions'
import { setCookie , getCookie } from './helpers/cockie'
import Chance from 'chance'

const chance = new Chance()

const uid = getCookie('uid') ? getCookie('uid') :  setCookie( 'uid',  chance.guid() , {
  expires: new Date().getTime() * 1000
});

ins.get('/open/'+uid).then(d=>{
  console.log(d.data);
})

window.onbeforeunload = e=> {
  ins.get('/leave/'+uid).then(d=>{
    console.log(d.data);
  })
}


let store = createStore(todoApp)


ins.get('/main').then(d=>
  store.dispatch(MAIN(d.data))
)



render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
