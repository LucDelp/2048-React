import React from 'react';
import './App.css';

function App() {
  let boardTab = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
  let maxScore = 123;
  let currentScore = 23456;
  return (
    <div className="App">
      <div className="Scoreboard">
        <div className="Scoreboard__score Scoreboard__score--max">top score: {maxScore}</div>
        <div className="Scoreboard__score Scoreboard__score--current">current score: {currentScore}</div>
      </div>
      <div className="BoardContainer">
        {
          boardTab.map((boardRow, index) => (
            <div key={`index-${index}-row`} className="BoardContainer__row">
              {
                boardRow.map((tile, index) => (
                  <div key={`index-${index}-tile`} className="BoardContainer__tile">{tile}</div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
