import React, { Component } from "react";

class Message extends Component {
	render() {
		return (
			<div>
				{!this.props.message && (
					<button onClick={this.props.getMessage}>Get Message</button>
				)}
				{this.props.message && <p>{this.props.message}</p>}
			</div>
		);
	}
}

export default Message;
