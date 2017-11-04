const all = [
  {
    id: 0,
    text: "убедиться, что firefly подключен в сеть",
    img: "http://placehold.it/120x120?text=0",
    completed: false
  },
  {
    id: 1,
    text: "подключиться к wifi firefly",
    img: "http://placehold.it/120x120?text=1",
    completed: false
  },
  {
    id: 2,
    text: "попробовать включить лампочку",
    img: "http://placehold.it/120x120?text=2",
    completed: false
  }
]


const todos = (state = all, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    case 'COMPLITE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: true}
          : todo
      )
    case 'OPEN_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: false}
          : todo
      )
    default:
      return state
  }
}

export default todos
