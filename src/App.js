import React from 'react'
import './App.css'
import { boardReducer } from './boardReducer'
import { UP, DOWN, RIGHT, LEFT } from './boardAction'
import Board from './Board'

function App () {
  const boardTab = [
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 0]
  ]

  const [boardState, dispatch] = React.useReducer(boardReducer, boardTab)

  function handleArrow (event) {
    switch (event.code) {
      case 'ArrowUp':
        dispatch({ type: UP })
        break
      case 'ArrowDown':
        dispatch({ type: DOWN })
        break
      case 'ArrowRight':
        dispatch({ type: RIGHT })
        break
      case 'ArrowLeft':
        dispatch({ type: LEFT })
        break
      default:
        break
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleArrow)
    return () => { document.removeEventListener('keydown', handleArrow) }
  }, [])

  return (
    <div className='App'>
      <Board boardState={boardState} dispatch={dispatch} />
    </div>
  )
}

export default App
