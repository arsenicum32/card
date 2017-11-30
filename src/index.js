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


let store = createStore(todoApp)

// Получение с backend данных

ins.get('/main.php').then(d=>{
  console.log(d.data);
  store.dispatch(MAIN(d.data))
}).catch(e=> store.dispatch(ERROR(e)) )

ins.get(`/chart.php?from=${fromTo(2,0).from}&to=${fromTo(2,0).to}`).then(d=>{
  console.log(d.data);
  store.dispatch(TABLE(d.data.table))
  store.dispatch(datachart(d.data.chart))
})

// Стандартный редукс сборщик

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
