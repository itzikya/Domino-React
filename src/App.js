import React, {Component} from "react";
import Stats from "./Stats/Stats";
import Deck from "./Deck/Deck";
import Board from "./Board/Board";
import Control from "./Control/Control";
import "./App.css";
class History 
{
    constructor (num, gameStart, p1Deck, boardB, pd, board, pile)
    {
        this.numOfPlayers = this.shalowClone(num);
        this.isGameStarted = this.shalowClone(gameStart);
        this.player1Deck = this.shalowClone(p1Deck);
        this.boardBricks = this.shalowClone(boardB);
        this.playerDeck = this.shalowClone(pd);
        this.myBoard = this.shalowClone(board);
        this.myPile = this.shalowClone(pile);
    }

    shalowClone(x)
    {
        return JSON.parse(JSON.stringify(x));
    }
}

class App extends Component 
{
    constructor() 
    {
        super();
        this.state = {
            numOfPlayers: 1, 
            isGameStarted: false,
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
    this.getCurrentGameState = this.getCurrentGameState.bind(this);
    this.doPrev = this.doPrev.bind(this);
    this.shalowClone = this.shalowClone.bind(this);
    this.isLegalMove = this.isLegalMove.bind(this);
    this.isLegalDraw = this.isLegalDraw.bind(this);

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
           // history: myHistory,

        });
    }

    dealRandomBricksToPlayer() {
        let myPile = [
                    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
                    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 2], 
                    [2, 3], [2, 4], [2, 5], [2, 6], [3, 3], [3, 4], [3, 5], 
                    [3, 6], [4, 4], [4, 5], [4, 6], [5, 5], [5, 6], [6, 6],
                    ];

        for(let players = 0 ; players < this.state.numOfPlayers ; players++) 
        {
            let playerDeck = [];

            for(let i = 0 ; i < 6 ; i++) 
            {
                let randomIndex = Math.floor(Math.random() * myPile.length);
                playerDeck.push(myPile[randomIndex]);
                myPile = myPile.filter((item, j) => j !== randomIndex);
            }
        
            this.setState(() => 
            {
                return {
                    myPile: myPile,
                    player1Deck: playerDeck,
                }
            })
        }
    }
    
    handleGame(info) 
    {
        this.dealRandomBricksToPlayer();
        let myHistory = this.state.history;
        myHistory.push( this.getCurrentGameState());
   
        this.setState({
            isGameStarted: info.isGameStarted,
            history: myHistory

        });
    }

    handlePlayerDeck(deck) 
    {
        this.setState({
            player1Deck: deck
        });
    }

    handleClickedBrick(brick) 
    {
        console.log(this.isLegalMove(brick));
        this.addBrickToBoard(brick); 
    }   

    shalowClone(x)
    {
        return JSON.parse(JSON.stringify(x));
    }

    addBrickToBoard(brick) 
    {
        let myBoard = this.shalowClone(this.state.myBoard);
        let player1Deck = this.state.player1Deck; 
        let myHistory = this.shalowClone(this.state.history); 
        let found = false;

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
            found = true
        }
        else 
        {
            for(let i = 0 ; i < myBoard.length ; i++) 
            {
                for(let j = 0 ; j < myBoard[i].length ; j++) 
                {
                    let currBrick = myBoard[i][j];
                    //current brick is available from top, and there's a match with the bottom of the wanted brick
                    if(!found && currBrick.occupied && currBrick.activeTop && currBrick.brick[0] == brick[1]) 
                    {
                        currBrick.activeTop = false; //changing

                        for(let i = 0 ; i < myBoard.length ; i++) 
                        {
                            for(let j = 0 ; j < myBoard[i].length ; j++)
                            {
                                if(myBoard[i][j].occupied)
                                {
                                    myBoard[i][j].position.row++; //changing
                                }
                            } 
                        } 
                        
                        //this is changing from one condition to another//////
                        let newLine = [];
                        for(let i = 0 ; i < myBoard.length ; i++) 
                        {
                            newLine.push({occupied: false})
                        }

                        myBoard.unshift(newLine);
                        let brickToInsert = {
                                            brick: brick,
                                            direction: "vertical",
                                            occupied: true,
                                            activeTop: true,
                                            activeBottom: false,
                                            position: 
                                                {
                                                    row: currBrick.position.row - 1,
                                                    column: currBrick.position.column
                                                }
                                            }
                        ///////////////////////////////////////////////////////////
                        // add to history
                        myBoard[brickToInsert.position.row][brickToInsert.position.column] = brickToInsert;
                        player1Deck = player1Deck.filter((item) => item !== brick);
                        found = true;
                    }

                    //current brick is available from bottom, and there's a match with the top of the wanted brick
                    else if(!found && currBrick.occupied && currBrick.activeBottom && currBrick.brick[1] == brick[0]) 
                    {
                        currBrick.activeBottom = false;
                       
                        let newLine = [];
                        for(let i = 0 ; i < myBoard.length ; i++) 
                        {
                            newLine.push({occupied: false})
                        }

                        myBoard.push(newLine);
                        let brickToInsert = 
                                            {
                                            brick: brick,
                                            direction: "vertical",
                                            occupied: true,
                                            activeTop: false,
                                            activeBottom: true,
                                            position: 
                                                {
                                                    row: currBrick.position.row + 1,
                                                    column: currBrick.position.column
                                                }
                                            }
                            
                        myBoard[brickToInsert.position.row][brickToInsert.position.column] = brickToInsert;
                        player1Deck = player1Deck.filter((item) => item !== brick);
                        found = true;
                    }
                    
                    //current brick is available from the top, and there's a match with the top of the wanted brick
                    if(!found && currBrick.occupied && currBrick.activeTop && currBrick.brick[0] == brick[0])
                     {
                        currBrick.activeTop = false;
                        for(let i = 0 ; i < myBoard.length ; i++)
                        {
                            for(let j = 0 ; j < myBoard[i].length ; j++) 
                            {
                                if(myBoard[i][j].occupied) 
                                {
                                    myBoard[i][j].position.row++;
                                }
                            } 
                        } 
                        
                        let newLine = [];
                        for(let i = 0 ; i < myBoard.length ; i++) 
                        {
                            newLine.push({occupied: false})
                        }

                        myBoard.unshift(newLine);
    
                        let brickToInsert = {
                                            brick: [brick[1], brick[0]],
                                            direction: "vertical",
                                            occupied: true,
                                            activeTop: true,
                                            activeBottom: false,
                                            position: 
                                                {
                                                    row: currBrick.position.row - 1,
                                                    column: currBrick.position.column
                                                }
                                            }
                            
                        myBoard[brickToInsert.position.row][brickToInsert.position.column] = brickToInsert;
                        player1Deck = player1Deck.filter((item) => item !== brick);
                        
                        found = true;
                    }

                    //current brick is available from bottom, and there's a match with the bottom of the wanted brick
                    else if(!found && currBrick.occupied && currBrick.activeBottom && currBrick.brick[1] == brick[1])
                     {
                        currBrick.activeBottom = false;
                      
                        let newLine = [];
                        for(let i = 0 ; i < myBoard.length ; i++) 
                        {
                            newLine.push({occupied: false})
                        }

                        myBoard.push(newLine);
    
                        let brickToInsert = {
                                            brick: [brick[1], brick[0]],
                                            direction: "vertical",
                                            occupied: true,
                                            activeTop: false,
                                            activeBottom: true,
                                            position: 
                                                {
                                                    row: currBrick.position.row + 1,
                                                    column: currBrick.position.column
                                                }
                                            }
                            
                        myBoard[brickToInsert.position.row][brickToInsert.position.column] = brickToInsert;
                        player1Deck = player1Deck.filter((item) => item !== brick);
                        found = true;
                    }
                    ///other two positions need to be implemented are the same but turn upside down the brick
                    //just send it with opposite sides
                }
            }
        }
        
        if(found === true)
        {
            myHistory.push(this.getCurrentGameState());
        }

        this.setState({
            myBoard: myBoard,
            player1Deck: player1Deck,
            history: myHistory,
        })

    }

    isLegalMove(i_Brick)
    {
        let myBoard = this.shalowClone(this.state.myBoard);

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

    handleDrawClick() 
    {
        if(!this.isLegalDraw())
            return;
        
        let playerDeck = this.state.player1Deck;
        let myPile = this.state.myPile;
        let myHistory = this.state.history;
        let randomIndex = Math.floor(Math.random() * myPile.length);
        playerDeck.push(myPile[randomIndex]);
        myPile = myPile.filter((item, j) => j !== randomIndex);
        myHistory.push(this.getCurrentGameState());
        this.setState(() => {
            return {
                myPile: myPile,
                player1Deck: playerDeck,
                history: myHistory
            }
        })
    }

    getCurrentGameState()
    {
        let currentGameState = new History(this.state.numOfPlayers, this.state.isGameStarted, this.state.player1Deck, this.state.boardBricks, this.state.playerDeck, this.state.myBoard, this.state.myPile);
        return currentGameState;
    }

    render() {
        const myDeck = <Deck 
                        handleClickedBrick={this.handleClickedBrick} 
                        myDeck={this.state.player1Deck} 
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
                        {this.state.isGameStarted ? myDeck : null}
                    </div>
                </div>
                <div className="footer">
                </div>
            </div>
        );
    }
    
}

export default App;

