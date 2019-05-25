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

    }

    render() {
        return (
            <div className="domino-brick">
                <HalfBrick className={`brickT${this.props.numbers[0]}`} position="top" number={this.props.numbers[0]}/>
                <span className="domino-line" />
                <HalfBrick className={`brickB${this.props.numbers[1]}`} position="bottom" number={this.props.numbers[1]}/>
                
            </div>
        );
    }
}


export default DominoBrick;