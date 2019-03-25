import React, { Component } from "react";
import base from "../base";

import Message from "./Message";

class App extends Component {
	messageFormRef = React.createRef();
	messageRef = React.createRef();

	state = {
		messages: {},
		message: sessionStorage.getItem("message")
	};

	componentDidMount() {
		this.ref = base.syncState("messages", {
			context: this,
			state: "messages"
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	getMessage = () => {
		if (
			!sessionStorage.getItem("message") ||
			sessionStorage.getItem("message") === "undefined"
		) {
			const messages = { ...this.state.messages };
			const keys = Object.keys(messages);
			const key = keys[Math.floor(Math.random() * keys.length)];
			const message = this.state.messages[key];
			sessionStorage.setItem("message", message);
			messages[key] = null;
			this.setState({
				messages,
				message
			});
		}
	};

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
				<Message
					message={this.state.message}
					getMessage={this.getMessage}
				/>
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
