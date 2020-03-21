import React from 'react'
import Tile from './Tile'
import { GET_BOARD_WITH_INSERT } from './gameAction'

export default function Board ({ board, topScore, currentScore, dispatch, hasChanged }) {
  React.useEffect(() => {
    if (hasChanged) {
      setTimeout(() => {
        dispatch({ type: GET_BOARD_WITH_INSERT })
      }, 250)
    }
  }, [board])

  return (
    <>
      <div className='Header'>
        <h1>2048 <span role='img' aria-label='logo'>⚛️</span></h1>
        <div className='Scoreboard'>
          <div className='Scoreboard__score'>top score: {topScore}</div>
          <div className='Scoreboard__score'>current score: {currentScore}</div>
        </div>
      </div>
      <div className='BoardContainer'>
        {
          board.map((boardRow, index) => (
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
    </>
  )
}
