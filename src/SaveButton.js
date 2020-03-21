import React from 'react'

export default function SaveButton ({ score }) {
  function handleClickSaveScore (score) {
    window.localStorage.setItem('2048_TOP_SCORE', score)
  }

  return (
    <button onClick={() => { handleClickSaveScore(score) }}>
      save
    </button>
  )
}
