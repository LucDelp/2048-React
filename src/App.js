import React from 'react'
import './App.css'
import { gameReducer, DEFAULT_GAME_STATE } from './gameReducer'
import { UP, DOWN, RIGHT, LEFT } from './gameAction'
import Board from './Board'
import GameOver from './GameOver'

function App () {
  const [gameState, dispatch] = React.useReducer(gameReducer, DEFAULT_GAME_STATE)

  function handleArrow (event) {
    event.preventDefault()
    if (!gameState.isLost) {
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
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleArrow)
    return () => { document.removeEventListener('keydown', handleArrow) }
  }, [])

  const { board, topScore, currentScore, hasChanged } = gameState
  return (
    <div className='App'>
      <Board
        board={board}
        hasChanged={hasChanged}
        currentScore={currentScore}
        topScore={topScore}
        dispatch={dispatch}
      />
      {gameState.isLost && (<GameOver dispatch={dispatch} />)}
    </div>
  )
}

export default App
