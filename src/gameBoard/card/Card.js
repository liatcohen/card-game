import React, { Component } from 'react';
import './Card.css';

class card extends Component {


  cardClicked = () => {
    this.props.cardClicked(this.props.number, this.props.cardId)
  }

  render() {

    return (
      <div class="card">
        <div class={this.props.class}
          cardId={this.props.cardId}
          onClick={this.props.disabled || this.props.class === "front" ? undefined : this.cardClicked}>
          {this.props.class === "front" ? this.props.number : ""}
        </div>
      </div>
    );
  }
}

export default card;
