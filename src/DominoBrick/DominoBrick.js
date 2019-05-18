import React, {Component} from "React";
import "./DominoBrick.css";

class DominoBrick extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <main className="flex-container">
                <div>{this.props.number1}</div>
                <div>{this.props.number2}</div>
            </main>
        );
    }
}


export default DominoBrick;