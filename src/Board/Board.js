import React, {Component} from "react";
import "./Board.css"
import DominoBrick from "../DominoBrick/DominoBrick";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMove: false,
            brickToInsert: null
        };

        this.renderTable = this.renderTable.bind(this);
        /*this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);*/
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.isMove !== nextProps.isMove) {
            return {
                isMove: !prevState.isMove,
                brickToInsert: nextProps.brickToInsert
            };
        }
        return null;
    }

    renderTable() {
        let myTable = this.props.myBoard;

        return myTable.map(row => {
            return (
                <tr>
                {row.map(column => {
                    if(column.occupied) {
                        return(
                            <td>
                            <DominoBrick status="neutral" 
                                            numbers={column.brick} 
                                            isDeckBrick={false}
                                            direction={column.direction} 
                                            className={column.direction} />
                            </td>)
                    }
                    else {
                        return(
                        <td></td>)
                    }})}
                </tr>)
        })
    }

    /*
    handleDrop(e, con) {
        this.props.handleDrop(e, con);
    }

    handleDragOver(ev) {
        ev.preventDefault();
    }
*/
    render() {
        
        return (
            <div className="board">
                <table>
                    <tbody /*onDrop={(e) => this.handleDrop(e, "complete")} 
                            onDragOver={(e) => this.handleDragOver(e)}*/>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Board