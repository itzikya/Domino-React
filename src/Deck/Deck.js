import React, {Component} from "react";
import DominoBrick from "../DominoBrick/DominoBrick";

import "./Deck.css";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myDeck: props.deck,
            isGameStarted: props.isGameStarted,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.isGameStarted !== prevState.isGameStarted)
        {
            return {
                isGameStarted: !prevState.isGameStarted
            };
        }

        return null;
    }

    handleClick(brick) {
        this.props.brickWasChosen(brick);
    }

    render() {
        const pickedUpBricks = this.state.myDeck.map(brick => <DominoBrick 
            handleClick={this.handleClick}
            numbers={brick}
            key={`brick${brick[0]}${brick[1]}`} 
            />)
        
        return (
            <div className="deck">
                {pickedUpBricks}
            </div>
        )
    
    }
}


export default Deck;