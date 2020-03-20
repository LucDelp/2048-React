import React from 'react'
import './App.css'
import Tile from './Tile'
import { boardReducer } from './boardReducer'
import { UP, DOWN, RIGHT, LEFT } from './boardAction'

function App () {
  const boardTab = [
    [0, 0, 0, 0],
    [0, 2, 2, 0],
    [0, 4, 4, 0],
    [0, 0, 0, 2048]
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

  const maxScore = 123
  const currentScore = 23456

  return (
    <div className='App'>
      <div className='Scoreboard'>
        <div className='Scoreboard__score Scoreboard__score--max'>top score: {maxScore}</div>
        <div className='Scoreboard__score Scoreboard__score--current'>current score: {currentScore}</div>
      </div>
      <div className='BoardContainer'>
        {
          boardState.map((boardRow, index) => (
            <div key={`index-${index}-row`} className='BoardContainer__row'>
              {
                boardRow.map((tile, index) => (
                  <Tile key={`index-${index}-tile`} value={tile} />
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
