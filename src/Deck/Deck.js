import React, {Component} from "react";
import DominoBrick from "../DominoBrick/DominoBrick";

import "./Deck.css";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myDeck: props.myDeck,
            isGameStarted: props.isGameStarted,
        };

        this.handleClickedBrick = this.handleClickedBrick.bind(this);
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

    handleClickedBrick(brick) {
        console.log(this.props.handleClickedBrick);
        this.props.handleClickedBrick(brick);
    }

    render() {
        console.log(this.state.myDeck);
        const pickedUpBricks = this.props.myDeck.map(brick => <DominoBrick 
            handleClickedBrick={this.handleClickedBrick}
            numbers={brick}
            key={`brick${brick[0]}${brick[1]}`} 
            />)
            console.log(pickedUpBricks);
        
        return (
            <div className="deck">
                {pickedUpBricks}
            </div>
        )
    
    }
}


export default Deck;