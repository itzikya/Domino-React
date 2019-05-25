import React, {Component} from "react";
import Stats from "./Stats/Stats";
import Deck from "./Deck/Deck";
import Board from "./Board/Board";
import Control from "./Control/Control";

import "./App.css";


class App extends Component {
    constructor() {
        super();
        this.state = {
           isGameStarted: false,
        };

     this.handleClick = this.handleClick.bind(this);
     //this.handleStopClick = this.handleStopClick.bind(this);
    }

    handleClick(info) {
        this.setState({
            isGameStarted: info.isGameStarted
        });
    }

    render() {
        return (
            <div className="domino-game">
                <div className="header">
                    <Control func={this.handleClick}/>
                    <Stats isGameStarted={this.state.isGameStarted}/>
                </div>
                <div className="body">
                    <Board />
                </div>
                <div className="footer">
                    <Deck isGameStarted={this.state.isGameStarted}/>
                </div>
            </div>
        );
    }
}

export default App;

/*
<div class="control-buttons">
                        <button className="my-button" onClick={this.handleStartClick}>Start</button>
                        <button className="my-button">Stop</button>
                    </div>
                    */