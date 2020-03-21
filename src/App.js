import React from 'react'
import './App.css'
import { gameReducer, DEFAULT_GAME_STATE } from './gameReducer'
import { UP, DOWN, RIGHT, LEFT, NEW_GAME, LOAD_SAVED_STATE, SAVE } from './gameAction'
import Board from './Board'
import GameOver from './GameOver'

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
    const savedState = window.localStorage.getItem('2048_GAME_STATE')
    if (savedScore) {
      setTopScore(savedScore)
    }
    if (savedState) {
      dispatch({ type: LOAD_SAVED_STATE, payload: JSON.parse(savedState) })
    }

    document.addEventListener('keydown', handleArrow)
    return () => { document.removeEventListener('keydown', handleArrow) }
  }, [])

  const { board, currentScore, hasChanged, isLost } = gameState

  return (
    <div className='App'>
      <p>Use directional arrows to play ← ↑ →</p>
      <Board
        board={board}
        hasChanged={hasChanged}
        currentScore={currentScore}
        topScore={topScore}
        dispatch={dispatch}
      />
      <button className='Save-button' onClick={() => { dispatch({ type: SAVE }) }}>save</button>
      <button
        className='New'
        onClick={() => {
          dispatch({ type: NEW_GAME })
          if (topScore < currentScore) setTopScore(currentScore)
        }}
      >
        new board
      </button>
      {
        isLost && (
          <GameOver dispatch={dispatch} />
        )
      }
    </div>
  )
}

export default App
