import React from 'react'
import Tile from './Tile'

export default function Board ({ boardState, dispatch }) {
  return (
    <>
      <div className='Scoreboard'>
        <div className='Scoreboard__score Scoreboard__score--max'>top score: 0</div>
        <div className='Scoreboard__score Scoreboard__score--current'>current score: 0</div>
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
    </>
  )
}
