import React from 'react'
import PropTypes from 'prop-types'
import Setup from '../containers/Setup'

import { setupSwitch } from '../actions'






const Todo = ({ onClick, completed, text , img, id }) => (
  <li
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    <b>{id}</b>
    <img src={img} />
    {text}
    {id == 0 ?
    <button href="#" onClick={onClick}>убедился</button>
    : id == 2 ? <Setup /> : void(0)
    }
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id : PropTypes.number.isRequired
}

export default Todo
