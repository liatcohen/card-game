import React, { Component } from 'react';
import './App.css';
import GameBoard from './gameBoard/GameBoard'

class App extends Component {

  state = {
    score: undefined,
    topScore: 100,
    pointForWrongClick: 5
  }
  
  claculateScore = (wrongClick) => {
    const score = this.state.topScore - (this.state.pointForWrongClick * wrongClick)
    this.setState({score:score})
  }

  render() {

    return (
      <div className="App">
        {this.state.score ?
          <div id="score">Game Over!
            <div>Your score is: {this.state.score}</div>
          </div>
          :<GameBoard claculateScore={this.claculateScore} />
        }
      </div>
    );

  }

}

export default App;
