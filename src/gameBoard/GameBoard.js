import React, { Component } from 'react';
import './GameBoard.css';
import Card from './card/Card'

class gameBoard extends Component {

    state = {
        card1: undefined,
        card1ID: undefined,
        disabled: false,
        wrongClick: 0, //to calculate the score
        numberOfCards: 12,
        cards: null,
    }

    cardClicked = (number, id) => {
        let newCards = [...this.state.cards]
        newCards[id].cardFlipped = true
        if (this.state.card1) {
            this.setState({ cards: newCards, disabled: true })
            if (this.state.card1 === number) {
                this.setState({ card1: undefined, disabled: false })
                this.checkIfGameOver(newCards)
            } else {
                setTimeout(() => {
                    newCards[id].cardFlipped = false
                    newCards[this.state.card1ID].cardFlipped = false
                    this.setState({ cards: newCards, card1: undefined, disabled: false, wrongClick: this.state.wrongClick + 1 })
                }, 1000);
            }
        } else {
            this.setState({ cards: newCards, card1: number, card1ID: id, firstCardFlipped: true })
        }
    }

    checkIfGameOver(cards) {
        if (cards.every(c => c.cardFlipped === true)) {
            this.props.claculateScore(this.state.wrongClick)
        }
    }

    fillCards = () => {
        let NumOfCardsChosen = 0
        const cardsOptions = [], cardsDeck = []
        for (let i = 0; i < this.state.numberOfCards / 2; i++) {
            cardsOptions[i] = 2
        }
        let id = 0;
        while (NumOfCardsChosen < this.state.numberOfCards) {
            let number = Math.ceil(Math.random() * Math.floor(this.state.numberOfCards / 2))
            if (cardsOptions[number - 1] > 0) {
                cardsOptions[number - 1] = cardsOptions[number - 1] - 1
                NumOfCardsChosen++
                cardsDeck.push({
                    number: number,
                    id: id,
                    cardFlipped: false,
                    class: "back"
                })
                id++
            }
        }
        this.setState({ cards: cardsDeck })
    }

    render() {
        return (
            <div id="gameBoard">
                {this.state.cards ?
                    <div className="cards">
                        {this.state.cards.map((card, idx) => {
                            return (
                                <Card number={card.number}
                                    cardId={card.id}
                                    class={card.cardFlipped ? "front" : "back"}
                                    cardClicked={this.cardClicked}
                                    disabled={this.state.disabled}>
                                </Card>
                            )
                        })}
                    </div>
                    :
                    <button class="startButton" onClick={this.fillCards}>Start Game</button>
                }
            </div>
        );
    }
}

export default gameBoard;
