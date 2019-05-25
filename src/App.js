import React, {Component} from "react";
import Stats from "./Stats/Stats";
import Deck from "./Deck/Deck";
import Board from "./Board/Board";
import Control from "./Control/Control";
import Pile from "./Pile/Pile";

import "./App.css";


class App extends Component {
    constructor() {
        super();
        this.state = {
           isGameStarted: false,
           isMove: false,
           player1Deck: [],
           chosenBrick: null
        };

     this.handleClick = this.handleClick.bind(this);
     this.handlePlayerDeck = this.handlePlayerDeck.bind(this);
     this.handleBrickClicked = this.handleBrickClicked.bind(this);

    }

    handleClick(info) {
        this.setState({
            isGameStarted: info.isGameStarted
        });
    }

    handlePlayerDeck(deck) {
        this.setState({
            player1Deck: deck
        });
    }

    handleBrickClicked(brick) {
        this.setState({
            isMove: true,
            chosenBrick: brick
        })
    }

    render() {
        const myDeck = <Deck 
                        isGameStarted={this.state.isGameStarted} 
                        deck={this.state.player1Deck} 
                        brickWasChosen={this.handleBrickClicked}/>
        
        return (
            <div className="domino-game">
                <div className="header">
                    <Control func={this.handleClick}/>
                    <Stats isGameStarted={this.state.isGameStarted}/>
                </div>
                <div className="body">
                    <Board brickToInsert={this.state.chosenBrick} isMove={this.state.isMove}/>
                </div>
                <div className="footer">
                    <Pile func={this.handlePlayerDeck}/>
                    {this.state.isGameStarted ? myDeck : null}
                </div>
            </div>
        );
    }
}

export default App;

