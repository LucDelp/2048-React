import React from 'react'
import { NEW_GAME } from './gameAction'

export default function GameOver ({ dispatch }) {
  return (
    <div className='GameOver'>
      <div className='GameOver__container'>
        <span>game over !</span>
        <button onClick={() => { dispatch({ type: NEW_GAME }) }}>retry</button>
      </div>
    </div>
  )
}
