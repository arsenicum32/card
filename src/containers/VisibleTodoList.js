import { connect } from 'react-redux'
import { toggleTodo , compliteTodo , openTodo , setupLoad } from '../actions'
import TodoList from '../components/TodoList'
import instance from '../helpers/rest'


const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {

  // setInterval(_=> {
  //   instance.get('/')
  //   .then(e=> {
  //     dispatch(compliteTodo(1))
  //     dispatch(setupLoad("good"))
  //   })
  //   .catch(e=> {
  //     console.log(e)
  //     dispatch(openTodo(1))
  //   })
  // }, 10000 )

  dispatch(compliteTodo(1))

  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
