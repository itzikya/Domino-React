import React, {Component} from "react";
import "./Board.css"

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="board-container">
                <div className="board">
                    <p>Board</p>
                </div>
            </div>
        );
    }

}

export default Board