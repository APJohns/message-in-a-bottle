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
			<main>
				<header>
					<h1>Message in a Bottle</h1>
					<details>
						<summary>Learn More</summary>
						<p className="learn-more">
							Enjoy your randomly selected message from our list
							of submitted messages! Yours is unique, no one else
							will see it. Each message, when read, gets removed
							from the list. You can keep your message until you
							close your browser. Spread the positivity! Send a
							message of your own!
						</p>
					</details>
				</header>
				<Message
					message={this.state.message}
					getMessage={this.getMessage}
				/>
				<form
					ref={this.messageFormRef}
					onSubmit={this.handleMessage}
					className="newMessage"
				>
					<h2>Write your own message!</h2>
					<textarea ref={this.messageRef} />
					<button type="submit">Cast Away! &#8921;</button>
				</form>
			</main>
		);
	}
}

export default App;
