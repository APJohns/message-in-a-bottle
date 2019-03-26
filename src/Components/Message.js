import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import bottle from "../bottle.png";

class Message extends Component {
	state = {
		showMessage: false
	};

	componentDidMount() {
		document.addEventListener("keyup", e => {
			if (e.key === "Escape" && this.state.showMessage) {
				this.toggleMessage();
			}
		});
	}

	handleMessage = () => {
		this.props.getMessage();
		this.toggleMessage();
	};

	toggleMessage = () => {
		this.setState({
			showMessage: !this.state.showMessage
		});
	};

	render() {
		return (
			<section className="message-container">
				<button className="bottle" onClick={this.handleMessage}>
					<img src={bottle} alt="bottle" />
				</button>
				<TransitionGroup component="div" className="message">
					{this.state.showMessage && (
						<CSSTransition
							classNames="msg"
							timeout={{ enter: 500, exit: 500 }}
						>
							<p className="msg">{this.props.message}</p>
						</CSSTransition>
					)}
				</TransitionGroup>
			</section>
		);
	}
}

export default Message;
