import React, {Component} from "react";
import DominoBrick from "../DominoBrick/DominoBrick";

import "./Deck.css";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myDeck: [
                        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
                        [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 2], 
                        [2, 3], [2, 4], [2, 5], [2, 6], [3, 3], [3, 4], [3, 5], 
                        [3, 6], [4, 4], [4, 5], [4, 6], [5, 5], [5, 6], [6, 6],
                    ],

            randomBricks: [],
            isGameStarted: props.isGameStarted,
            
        };

        //this.randomBrick = this.randomBrick.bind(this);
    }

    componentDidMount() {
        let randomBricks = [];
        let myDeck = this.state.myDeck;

        for(let i = 0 ; i < 6 ; i++) {
            let randomIndex = Math.floor(Math.random() * myDeck.length);
            randomBricks.push(myDeck[randomIndex]);
            myDeck = myDeck.filter((item, j) => j !== randomIndex);
        }

        this.setState(() => {
            return {
                myDeck,
                randomBricks,
            }
        })
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

    render() {
        const pickedUpBricks = this.state.randomBricks.map(brick => <DominoBrick 
                                                                    numbers={brick}
                                                                    key={`brick${brick[0]}${brick[1]}`} 
                                                                    />)
        
        return (
            <div className="deck">
                {this.state.isGameStarted ? pickedUpBricks : null }
            </div>
        )
    
    }
}


export default Deck;