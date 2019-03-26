import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import bottle from "../bottle.png";

class Message extends Component {
	state = {
		showMessage: false
	};

	toggleMessage = () => {
		this.setState({
			showMessage: !this.state.showMessage
		});
	};

	render() {
		return (
			<section className="message-container">
				<button className="bottle" onClick={this.toggleMessage}>
					<img src={bottle} alt="bottle" />
				</button>
				{!this.props.message && (
					<button onClick={this.props.getMessage}>Get Message</button>
				)}
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
