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
        this.removeBrickFromHand = this.removeBrickFromHand.bind(this);
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

        //if brick was add to the board, then we will need to use the next function
        this.removeBrickFromHand(brick);
    }

    removeBrickFromHand(brickToRemove)
    {
        let hand = this.state.myDeck;
        for(let i = 0; i < hand.length; i++)
        {
            if(this.brickCompare(hand[i], brickToRemove))
            {
                hand.splice(i,1);
                break;
            }
        }

        this.setState({myDeck: hand});
    }

    brickCompare(brick1, brick2)
    {
        return brick1[0] === brick2[0] && brick1[1] === brick2[1];
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