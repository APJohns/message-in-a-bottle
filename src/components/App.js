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

	setMessage = (messages, keys) => {
		const key = keys[Math.floor(Math.random() * keys.length)];
		const message = this.state.messages[key];
		sessionStorage.setItem("message", message);
		messages[key] = null;
		this.setState({
			messages,
			message
		});
	};

	getMessage = async () => {
		if (
			!sessionStorage.getItem("message") ||
			sessionStorage.getItem("message") === "undefined"
		) {
			let messages = { ...this.state.messages };
			let keys = Object.keys(messages);
			if (keys.length === 0) {
				await this.setState({
					messages: {
						message1553625843800: "Its really nice out here in MA",
						message1553872161801:
							"We got attacked by the others again. And there's this strange smoke monster terrorizing us whenever we try to go into the jungle.",
						message1553872195578:
							"Wiiiiiilllllssssooooooooooooon!!!! 🏐",
						message1553872351778:
							'We found this hatch in the middle of the jungle. When we managed to bust in, there were these tapes from some group called the Dharma Initiative. Weird stuff. Anyway, back to typing in the same sequence of numbers or "the world will end."',
						message1553872371852: "4, 8, 15, 16, 23, 42"
					}
				});
				messages = { ...this.state.messages };
				keys = Object.keys(messages);
				this.setMessage(messages, keys);
			} else {
				this.setMessage(messages, keys);
			}
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
		console.log(this.state);
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
