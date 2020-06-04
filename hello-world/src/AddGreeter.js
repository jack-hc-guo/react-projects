import React, { Component } from 'react';
import './AddGreeter.css';

class AddGreeter extends Component {
	constructor(props){
		super(props);
		this.state = {
			greetingName: ''
		};
		// this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event){
		this.setState(
			{greetingName : event.target.value}
		);
	}
	render(){
		return(
			<div className="AddGreeter">
			<input type="text" onClick={(event) => this.handleClick(event)} />
			&nbsp;&nbsp;
			<button>Add</button>
			</div>
		);
	}
}

export default AddGreeter;