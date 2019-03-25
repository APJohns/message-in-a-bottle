import React, { Component } from "react";

import bottle from "../bottle.png";

class Message extends Component {
	render() {
		return (
			<section className="message">
				<div className="bottle">
					<img src={bottle} alt="bottle" />
				</div>
				{!this.props.message && (
					<button onClick={this.props.getMessage}>Get Message</button>
				)}
				{this.props.message && <p>{this.props.message}</p>}
			</section>
		);
	}
}

export default Message;
