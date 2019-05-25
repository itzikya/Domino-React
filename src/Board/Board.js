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
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        {console.log(prevState.isMove)}
        {console.log(nextProps.isMove)}
        if(prevState.isMove !== nextProps.isMove)
        {
            return {
                isMove: !prevState.isMove,
                brickToinsert: nextProps.brickToInsert
            };
        }

        return null;

    }


    renderTable() {
        //return this.state.table.map((brick) => {
            return (
                <tr>
                    <td>
                        {console.log(this.props.brickToInsert)} 
                        {console.log(this.state.isMove)}
                        {this.state.isMove ? <DominoBrick numbers={this.props.brickToInsert} /> : null }
                    </td>
                </tr>
            )
        }//)

    //}

    render() {
        
        return (
            <div className="board-container">
                <div className="board">
                    <table>
                        <tbody>
                            {this.renderTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default Board