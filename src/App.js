import React, { Component } from 'react';
import './App.css';
import GameBoard from './gameBoard/GameBoard'

class App extends Component {

  state = {
    score: undefined
  }
  
  claculateScore = (wrongClick) => {
    const score = 100 - (5 * wrongClick)
    this.setState({score:score})
  }

  render() {

    return (
      <div className="App">
        {this.state.score ?
          <div>score: {this.state.score}</div>
          :<GameBoard claculateScore={this.claculateScore} />
        }
      </div>
    );

  }

}

export default App;
