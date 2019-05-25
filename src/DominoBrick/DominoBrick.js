import React, {Component} from "React";
import HalfBrick from "./HalfBrick";

import "./DominoBrick.css";

class DominoBrick extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick(this.props.numbers);
    }

    render() {
        return (
            <div onClick={this.handleClick} className="domino-brick">
                <HalfBrick className={`brickT${this.props.numbers[0]} top`} position="top" number={this.props.numbers[0]}/>
                <span className="domino-line" />
                <HalfBrick className={`brickB${this.props.numbers[1]} bottom`} position="bottom" number={this.props.numbers[1]}/>
                
            </div>
        );
    }
}


export default DominoBrick;