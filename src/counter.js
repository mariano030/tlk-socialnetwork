import React from "react";

export default class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
        };
        // bind the this to be used down below in the render
        this.incrementCount = this.incrementCount.bind(this);
    }
    incrementCount() {
        // this is a method on a class
        console.log("clicking!!");
        this.setState({
            count: this.state.count + 1,
        });
    }
    render() {
        return (
            <div>
                <h1> I am the counter!: {this.state.count}</h1>
                <button onClick={this.incrementCount}> Click Me!</button>
                {/* <button onClick={ () => this.incrementCount}> Click Me!</button>  can be used too but really, it shouldn't */}
            </div>
        );
    }
}

// import React from "react";

// export default class Counter extends React.Component {

// }
