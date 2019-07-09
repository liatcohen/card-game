import React, { Component } from 'react';
import './GameBoard.css';
import Card from './card/Card'

class gameBoard extends Component {

    state = {
        card1: undefined,
        card1ID: undefined,
        cardFlip: new Array(12).fill(false),
        disabled: false,
        wrongClick: 0
    }

    cardClicked = (number, id) => {
        let newCardFlip = [...this.state.cardFlip]
        newCardFlip[parseInt(id) - 1 + ""]=true
        if (this.state.card1){
            this.setState({ cardFlip: newCardFlip, disabled: true })
            if (this.state.card1 === number) {
                this.setState({ card1: undefined, disabled: false })
                this.checkIfGameOver(newCardFlip)
            } else {
                setTimeout(() => {
                    newCardFlip[parseInt(id) - 1 + ""] = false
                    newCardFlip[parseInt(this.state.card1ID) - 1 + ""] = false
                    this.setState({cardFlip:newCardFlip, card1: undefined, disabled: false, wrongClick: this.state.wrongClick+1 })
                }, 1000);
            }

        } else {
            this.setState({ cardFlip: newCardFlip, card1: number, card1ID: id, firstCardFlipped: true })
        }
    }

    checkIfGameOver(newCardFlip) {
        if (newCardFlip.every(c => c === true)) {
            this.props.claculateScore(this.state.wrongClick)
        }
    }
   
    
    render() {

        return (
            <div id="gameBoard">
                <Card number="1"
                    cardId="1"
                    class={this.state.cardFlip[0] ? "front" : "back"}
                    cardClicked={this.cardClicked}
                    disabled={this.state.disabled}>
                </Card>
                <Card number="2" cardId="2" class={this.state.cardFlip[1] ? "front" : "back"} cardClicked={this.cardClicked} disabled={this.state.disabled}></Card>
                <Card number="3" cardId="3" class={this.state.cardFlip[2] ? "front" : "back"} cardClicked={this.cardClicked} disabled={this.state.disabled}></Card>
                <Card number="4" cardId="4" class={this.state.cardFlip[3] ? "front" : "back"} cardClicked={this.cardClicked} disabled={this.state.disabled}></Card>
                <Card number="5" cardId="5" class={this.state.cardFlip[4] ? "front" : "back"} cardClicked={this.cardClicked} disabled={this.state.disabled}></Card>
                <Card number="6" cardId="6" class={this.state.cardFlip[5] ? "front" : "back"} cardClicked={this.cardClicked} disabled={this.state.disabled}></Card>
                <Card number="1" cardId="7" class={this.state.cardFlip[6] ? "front" : "back"} cardClicked={this.cardClicked} disabled={this.state.disabled}></Card>
                <Card number="2" cardId="8" class={this.state.cardFlip[7] ? "front" : "back"} cardClicked={this.cardClicked} disabled={this.state.disabled}></Card>
                <Card number="3" cardId="9" class={this.state.cardFlip[8] ? "front" : "back"} cardClicked={this.cardClicked} disabled={this.state.disabled}></Card>
                <Card number="4" cardId="10" class={this.state.cardFlip[9] ? "front" : "back"} cardClicked={this.cardClicked} disabled={this.state.disabled}></Card>
                <Card number="5" cardId="11" class={this.state.cardFlip[10] ? "front" : "back"} cardClicked={this.cardClicked} disabled={this.state.disabled}></Card>
                <Card number="6" cardId="12" class={this.state.cardFlip[11] ? "front" : "back"} cardClicked={this.cardClicked} disabled={this.state.disabled}></Card>
            </div>
        );
    }
}

export default gameBoard;
