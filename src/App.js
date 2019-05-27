import React, {Component} from "react";
import Stats from "./Stats/Stats";
import Deck from "./Deck/Deck";
import Board from "./Board/Board";
import Control from "./Control/Control";
//import Pile from "./Pile/Pile";

import "./App.css";

class History 
{
    constructor (num, gameStart, p1Deck, boardB, pd, board, pile)
    {
        this.numOfPlayers = this.deepClone(num);
        this.isGameStarted = this.deepClone(gameStart);
        this.player1Deck = this.deepClone(p1Deck);
        this.boardBricks = this.deepClone(boardB);
        this.playerDeck = this.deepClone(pd);
        this.myBoard = this.deepClone(board);
        this.myPile = this.deepClone(pile);
    }

    deepClone(x)
    {
        return JSON.parse(JSON.stringify(x));
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            numOfPlayers: 1, 
            isGameStarted: false,
            selectedBrick: { numbers: [],
                            status: ""},
            player1Deck: [],
            boardBricks: [],
            playerDeck: [],
            myBoard: [],
            myPile: [],
            history: [],
        };

    this.handleGame = this.handleGame.bind(this);
    this.handlePlayerDeck = this.handlePlayerDeck.bind(this);
    this.handleClickedBrick = this.handleClickedBrick.bind(this);
    this.dealRandomBricksToPlayer = this.dealRandomBricksToPlayer.bind(this);
    this.isMoveLegal = this.addBrickToBoard.bind(this);
    this.handleDrawClick = this.handleDrawClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.deepClone = this.deepClone.bind(this);
    this.isLegalMove = this.isLegalMove.bind(this);
    this.isLegalDraw = this.isLegalDraw.bind(this);
    this.doPrev = this.doPrev.bind(this);
    this.getCurrentGameState = this.getCurrentGameState.bind(this);
    this.saveCurrentStateForHistory = this.saveCurrentStateForHistory.bind(this);
    this.handelUndoClick = this.handelUndoClick.bind(this);
    
    }

    getCurrentGameState()
    {
        let currentGameState = new History(this.state.numOfPlayers, this.state.isGameStarted, this.state.player1Deck, this.state.boardBricks, this.state.playerDeck, this.state.myBoard, this.state.myPile);
        return currentGameState;
    }

    doPrev()
    {
        if(this.state.history.length <= 1)
        {
            console.log("No Prev moves avilable");
            return;
        }

        let prev = this.state.history.pop();
        console.log("do prev length after", this.state.history.length);

        this.setState({
            numOfPlayers: prev.numOfPlayers, 
            isGameStarted: prev.isGameStarted,
            player1Deck: prev.player1Deck,
            boardBricks: prev.boardBricks,  
            playerDeck: prev.playerDeck,
            myBoard: prev.myBoard,
            myPile: prev.myPile,
        });
    }

    dealRandomBricksToPlayer() {
        let myPile = [
                    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
                    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 2], 
                    [2, 3], [2, 4], [2, 5], [2, 6], [3, 3], [3, 4], [3, 5], 
                    [3, 6], [4, 4], [4, 5], [4, 6], [5, 5], [5, 6], [6, 6],
                    ];

        for(let players = 0 ; players < this.state.numOfPlayers ; players++) {
            let playerDeck = [];

            for(let i = 0 ; i < 6 ; i++) {
                let randomIndex = Math.floor(Math.random() * myPile.length);
                playerDeck.push(myPile[randomIndex]);
                myPile = myPile.filter((item, j) => j !== randomIndex);
            }
        
            this.setState(() => {
                return {
                    myPile: myPile,
                    player1Deck: playerDeck,
                }
            })
        }
    }
    
    handleGame(info) {
        this.dealRandomBricksToPlayer();
        this.setState({
            isGameStarted: info.isGameStarted
        });
        this.saveCurrentStateForHistory();
    }

    handlePlayerDeck(deck) {
        this.setState({
            player1Deck: deck
        });
    }

    handleMouseOut() { 
        this.setState(() => {
            return {selectedBrick: {numbers: [],
                                        status: "neutral"}}})
    }

    handleMouseOver(brick) {
        let returnedValue = this.isLegalMove(brick)

        if(!returnedValue) {
            this.setState(() => {
                return {selectedBrick: {numbers: brick,
                                            status: "invalid"}}})
        }
        else {
            this.setState(() => {
                return {selectedBrick: {numbers: brick,
                                            status: "valid"}}})}

        console.log(this.state);
    }

    handleClickedBrick(brick) 
    {
        if(this.isLegalMove(brick))
        {
            let returnedValue = this.addBrickToBoard(brick);
            
            this.setState({
                myBoard: returnedValue.myBoard,
                player1Deck: returnedValue.player1Deck,})
            
        }
        
    }

    isLegalMove(i_Brick)
    {
        let myBoard = this.deepClone(this.state.myBoard);

        if(myBoard.length === 0)
        {
           return true;
        }

        for(let i = 0 ; i < myBoard.length ; i++) 
        {
            for(let j = 0 ; j < myBoard[i].length ; j++) 
            {
                let currBrick = myBoard[i][j];
                if(currBrick.occupied && currBrick.activeTop && currBrick.brick[0] == i_Brick[1]) 
                {
                    return true;
                }

                if(currBrick.occupied && currBrick.activeBottom && currBrick.brick[1] == i_Brick[0]) 
                {
                    return true;
                }

                if(currBrick.occupied && currBrick.activeTop && currBrick.brick[0] == i_Brick[0])
                {
                    return true;
                }

                if(currBrick.occupied && currBrick.activeBottom && currBrick.brick[1] == i_Brick[1])
                {
                    return true;
                }

            }
        }

        return false;
    }

    deepClone(x)
    {
        return JSON.parse(JSON.stringify(x));
    }

    //*****changeToNewOne********/
    addBrickToBoard(brick) {
        
        let myBoard = this.deepClone(this.state.myBoard);
        let player1Deck = this.state.player1Deck;
        //let activeBricks = this.state.activeBricks;
        if(!this.isLegalMove(brick))
        {
            return;
        }
        
        this.saveCurrentStateForHistory();
        if(myBoard.length === 0)
        {
            let brickToInsert = {brick: brick,
                                direction: "vertical",
                                occupied: true,
                                activeTop: true,
                                activeBottom: true,
                                position: 
                                    {row: 0,
                                    column: 0}} 
            myBoard.push([brickToInsert]);
            player1Deck = player1Deck.filter((item) => item !== brick);
        }
        else {
            let found = false;
            for(let i = 0 ; i < myBoard.length ; i++) {
                for(let j = 0 ; j < myBoard[i].length ; j++) {
                    let currBrick = myBoard[i][j];
                    //current brick is available from top, and there's a match with the bottom of the wanted brick
                    if(!found && currBrick.occupied && currBrick.activeTop && currBrick.brick[0] == brick[1]) {
                        currBrick.activeTop = false; //changing

                        for(let i = 0 ; i < myBoard.length ; i++) {
                            for(let j = 0 ; j < myBoard[i].length ; j++) {
                                if(myBoard[i][j].occupied) {
                                    myBoard[i][j].position.row++; //changing
                                }
                            } 
                        } 
                        
                        //this is changing from one condition to another//////
                        let newLine = [];
                        for(let i = 0 ; i < myBoard.length ; i++) {
                            newLine.push({occupied: false})
                        }
                        myBoard.unshift(newLine);
    
                        let brickToInsert = {brick: brick,
                                            direction: "vertical",
                                            occupied: true,
                                            activeTop: true,
                                            activeBottom: false,
                                            position: 
                                                {row: currBrick.position.row - 1,
                                                column: currBrick.position.column}}
                        ///////////////////////////////////////////////////////////
                        
                        myBoard[brickToInsert.position.row][brickToInsert.position.column] = brickToInsert;
                        player1Deck = player1Deck.filter((item) => item !== brick);

                        found = true;
                    }

                    //current brick is available from bottom, and there's a match with the top of the wanted brick
                    else if(!found && currBrick.occupied && currBrick.activeBottom && currBrick.brick[1] == brick[0]) {
                        currBrick.activeBottom = false;
                       
                        let newLine = [];
                        for(let i = 0 ; i < myBoard.length ; i++) {
                            newLine.push({occupied: false})
                        }
                        myBoard.push(newLine);
    
                        let brickToInsert = {brick: brick,
                                            direction: "vertical",
                                            occupied: true,
                                            activeTop: false,
                                            activeBottom: true,
                                            position: 
                                                {row: currBrick.position.row + 1,
                                                column: currBrick.position.column}}
                            
                        myBoard[brickToInsert.position.row][brickToInsert.position.column] = brickToInsert;
                        player1Deck = player1Deck.filter((item) => item !== brick);
                        
                        found = true;

                    }
                    
                    //current brick is available from the top, and there's a match with the top of the wanted brick
                    if(!found && currBrick.occupied && currBrick.activeTop && currBrick.brick[0] == brick[0]) {
                        currBrick.activeTop = false;

                        for(let i = 0 ; i < myBoard.length ; i++) {
                            for(let j = 0 ; j < myBoard[i].length ; j++) {
                                if(myBoard[i][j].occupied) {
                                    myBoard[i][j].position.row++;
                                }
                            } 
                        } 
                        
                        let newLine = [];
                        for(let i = 0 ; i < myBoard.length ; i++) {
                            newLine.push({occupied: false})
                        }
                        myBoard.unshift(newLine);
    
                        let brickToInsert = {brick: [brick[1], brick[0]],
                                            direction: "vertical",
                                            occupied: true,
                                            activeTop: true,
                                            activeBottom: false,
                                            position: 
                                                {row: currBrick.position.row - 1,
                                                column: currBrick.position.column}}
                            
                        myBoard[brickToInsert.position.row][brickToInsert.position.column] = brickToInsert;
                        player1Deck = player1Deck.filter((item) => item !== brick);
                        
                        found = true;
                    }

                    //current brick is available from bottom, and there's a match with the bottom of the wanted brick
                    else if(!found && currBrick.occupied && currBrick.activeBottom && currBrick.brick[1] == brick[1]) {
                        currBrick.activeBottom = false;
                      
                        let newLine = [];
                        for(let i = 0 ; i < myBoard.length ; i++) {
                            newLine.push({occupied: false})
                        }
                        myBoard.push(newLine);
    
                        let brickToInsert = {brick: [brick[1], brick[0]],
                                            direction: "vertical",
                                            occupied: true,
                                            activeTop: false,
                                            activeBottom: true,
                                            position: 
                                                {row: currBrick.position.row + 1,
                                                column: currBrick.position.column}}
                            
                        myBoard[brickToInsert.position.row][brickToInsert.position.column] = brickToInsert;
                        player1Deck = player1Deck.filter((item) => item !== brick);
                        
                        found = true;

                    }
                }
            }
        }

        console.log(myBoard);
        return({myBoard: myBoard,
                player1Deck: player1Deck
        })
    }

    isLegalDraw()
    {
        let canDrawTile = true;
        for (const tile of this.state.player1Deck)
        {
           if(this.isLegalMove(tile))
           {
            canDrawTile = false;
            break;
           }
        }

        return canDrawTile;
    }
    /*******changeToNewOne*** */

    saveCurrentStateForHistory()
    {
        let myHistory = this.deepClone(this.state.history); 
        myHistory.push(this.getCurrentGameState());
        this.setState(() => {
            return {
                history: myHistory,
            }
        })

    }

    handleDrawClick() 
    {
        if(!this.isLegalDraw())
        {
            return;
        }

        this.saveCurrentStateForHistory();
        let playerDeck = this.state.player1Deck;
        let myPile = this.state.myPile;
        
        let randomIndex = Math.floor(Math.random() * myPile.length);
        playerDeck.push(myPile[randomIndex]);
        myHistory.push(this.getCurrentGameState());

        myPile = myPile.filter((item, j) => j !== randomIndex);

        this.setState(() => {
            return {
                myPile: myPile,
                player1Deck: playerDeck,
            }
        })
    }

    render() {
        const myDeck = <Deck 
                        handleClickedBrick={this.handleClickedBrick} 
                        handleMouseOver={this.handleMouseOver}
                        handleMouseOut={this.handleMouseOut}
                        myDeck={this.state.player1Deck} 
                        selectedBrick={this.state.selectedBrick}
                        />

        const myBoard = <Board 
                        //isGameStarted={this.state.isGameStarted}
                        myBoard={this.state.myBoard}
                        />
        
        return (
            <div className="domino-game">
                <div className="header">
                </div>
                <div className="body">
                    <div className="board-container">
                        {this.state.isGameStarted ? myBoard : null }
                    </div>
                    <div className="right-nav">
                        <Stats isGameStarted={this.state.isGameStarted}/>
                        <Control func={this.handleGame}/>
                        <div className="draw">
                            <button className="my-button" onClick={this.handleDrawClick}>Draw</button>
                        </div>
                        <div>
                            <button className="my-button" onClick = {this.handelUndoClick}>Undo</button>
                        </div>
                        {this.state.isGameStarted ? myDeck : null}
                    </div>
                </div>
                <div className="footer">
                </div>
            </div>
        );
    }

    handelUndoClick()
    {
        this.doPrev();
    }
}

export default App;

