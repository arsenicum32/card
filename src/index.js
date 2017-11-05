import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
import ins from './helpers/rest'
import { MAIN , TABLE, datachart , ERROR } from './actions'
import { setCookie , getCookie } from './helpers/cockie'
import fromTo from './helpers/fromto'


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
).catch(e=> store.dispatch(ERROR(e)) )

ins.get(`/det/${fromTo(2,0).from}/${fromTo(2,0).to}`).then(d=>{
  store.dispatch(TABLE(d.data.table))
  store.dispatch(datachart(d.data.chart))
})



render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
