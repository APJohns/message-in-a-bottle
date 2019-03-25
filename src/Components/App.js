import React, { Component } from "react";
import base from "../base";

class App extends Component {
	messageFormRef = React.createRef();
	messageRef = React.createRef();

	state = {
		messages: {}
	};

	componentDidMount() {
		this.ref = base.syncState(`messages`, {
			context: this,
			state: "messages"
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	handleMessage = e => {
		e.preventDefault();
		let messages = { ...this.state.messages };
		messages[`message${Date.now()}`] = this.messageRef.current.value;
		this.setState({ messages });
		this.messageFormRef.current.reset();
	};

	render() {
		return (
			<div className="App">
				<h1>Hello!</h1>
				<h2>Write your own message!</h2>
				<form ref={this.messageFormRef} onSubmit={this.handleMessage}>
					<textarea ref={this.messageRef} />
					<button type="submit">Cast Away!</button>
				</form>
			</div>
		);
	}
}

export default App;
