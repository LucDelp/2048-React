import React from 'react'
import './App.css'
import { gameReducer, DEFAULT_GAME_STATE } from './gameReducer'
import { UP, DOWN, RIGHT, LEFT } from './gameAction'
import Board from './Board'
import GameOver from './GameOver'
import SaveButton from './SaveButton'

function App () {
  const [gameState, dispatch] = React.useReducer(gameReducer, DEFAULT_GAME_STATE)
  const [topScore, setTopScore] = React.useState(0)

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
    const savedScore = window.localStorage.getItem('2048_TOP_SCORE')
    if (savedScore) {
      setTopScore(savedScore)
    }

    document.addEventListener('keydown', handleArrow)
    return () => { document.removeEventListener('keydown', handleArrow) }
  }, [])

  const { board, currentScore, hasChanged } = gameState
  return (
    <div className='App'>
      <Board
        board={board}
        hasChanged={hasChanged}
        currentScore={currentScore}
        topScore={topScore}
        dispatch={dispatch}
      />
      <SaveButton score={currentScore} />
      {gameState.isLost && (<GameOver dispatch={dispatch} />)}
    </div>
  )
}

export default App
