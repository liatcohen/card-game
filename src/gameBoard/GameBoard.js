import React, { Component } from 'react';
import './GameBoard.css';
import Card from './card/Card'

class gameBoard extends Component {

    state = {
        card1: undefined,
        card1ID: undefined,
        cardFlip: new Array(20).fill(false),
        disabled: false,
        wrongClick: 0,
        numberOfCards: 12,
        cards: null,

    }

    cardClicked = (number, id) => {
        // let newCardFlip = [...this.state.cardFlip]
        // newCardFlip[parseInt(id) - 1 + ""] = true

        let newCards = [...this.state.cards]
        newCards[id].cardFlipped = true
        if (this.state.card1) {
            this.setState({ cards:newCards, disabled: true })
            if (this.state.card1 === number) {
                this.setState({ card1: undefined, disabled: false })
                this.checkIfGameOver(newCards)
            } else {
                setTimeout(() => {
                    // newCardFlip[parseInt(id) - 1 + ""] = false
                    // newCardFlip[parseInt(this.state.card1ID) - 1 + ""] = false

                    newCards[id].cardFlipped = false
                    newCards[this.state.card1ID].cardFlipped = false
                    this.setState({ cards:newCards, card1: undefined, disabled: false, wrongClick: this.state.wrongClick + 1 })
                    // this.setState({ cardFlip: newCardFlip, card1: undefined, disabled: false, wrongClick: this.state.wrongClick + 1 })
                }, 1000);
            }

        } else {
            this.setState({ cards: newCards, card1: number, card1ID: id, firstCardFlipped: true })
        }
    }

    checkIfGameOver(cards) {
        if (cards.every(c => c.cardFlipped === true)) {
            console.log("GAME OVER")
            this.props.claculateScore(this.state.wrongClick)
        }
    }

    fillCards = () => {
        let NumOfCardsChosen = 0
        const cardsOptions = [], cardsArray = []
        for (let i = 0; i < this.state.numberOfCards / 2; i++) {
            cardsOptions[i] = 2
        }
        console.log(cardsOptions)
        // cardsArray.forEach(c=> c=2)
        // Math.floor(Math.random() * Math.floor(numberOfCards)
        let id = 0;
        while (NumOfCardsChosen < this.state.numberOfCards) {
            let number = Math.ceil(Math.random() * Math.floor(this.state.numberOfCards / 2))
            console.log(`number: ${number}, cardsOptions[number-1]:${cardsOptions[number - 1]}`)
            if (cardsOptions[number - 1] > 0) {
                // cardsArray[index] = number
                cardsOptions[number - 1] = cardsOptions[number - 1] - 1
                NumOfCardsChosen++
                // index++
                cardsArray.push({
                    number: number,
                    id: id,
                    cardFlipped: false,
                    class: "back"
                })
                id++
            }
        }

        console.log(cardsArray)
        this.setState({ cards: cardsArray })
     

    }
    render() {
        
        return (

            <div id="gameBoard">
               
                {this.state.cards ?
                    <div className="cards">
                        {this.state.cards.map((card, idx) =>{
                        return (
                            <Card number={card.number}
                                    cardId={card.id}
                                    class={card.cardFlipped? "front":"back"}
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
