/* eslint-disable */

import React from 'react'
import './App.css'
import { gameReducer, DEFAULT_GAME_STATE } from './gameReducer'
import { UP, DOWN, RIGHT, LEFT, NEW_GAME, LOAD_SAVED_STATE, SAVE } from './gameAction'
import Board from './Board'
import GameOver from './GameOver'

function App () {
  const [gameState, dispatch] = React.useReducer(gameReducer, DEFAULT_GAME_STATE)
  const [topScore, setTopScore] = React.useState(0)
  
  let xDown = null                                                      
  let yDown = null

  function getTouches(evt) {
    return evt.touches
  }  

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
  };                                                

  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }

      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
          if ( xDiff > 0 ) {
              /* left swipe */ 
              dispatch({ type: LEFT })
          } else {
              /* right swipe */
              dispatch({ type: RIGHT })

          }                       
      } else {
          if ( yDiff > 0 ) {
              /* up swipe */ 
              dispatch({ type: UP })

          } else { 
              /* down swipe */
              dispatch({ type: DOWN })

          }                                                                 
      }
      /* reset values */
      xDown = null;
      yDown = null;                                             
  };

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
    document.addEventListener('touchstart', handleTouchStart, { passive: false });        
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => { 
      document.removeEventListener('keydown', handleArrow)
      document.removeEventListener('touchstart', handleTouchStart, { passive: false })   
      document.removeEventListener('touchmove', handleTouchMove, { passive: false })
    }
  }, [])

  const { board, currentScore, hasChanged, isLost } = gameState

  return (
    <div className='App'>
      <p>Use directional arrows to play ← ↑ →</p>
      <div className='cta-container'>
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
      </div>
      <Board
        board={board}
        hasChanged={hasChanged}
        currentScore={currentScore}
        topScore={topScore}
        dispatch={dispatch}
      />
      {
        isLost && (
          <GameOver dispatch={dispatch} />
        )
      }
    </div>
  )
}

export default App
