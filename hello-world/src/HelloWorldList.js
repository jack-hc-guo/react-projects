import React, { Component } from 'react';
import HelloWorld from './HelloWorld';
import AddGreeter from './AddGreeter';
import './HelloWorldList.css';

class HelloWorldList extends Component {
	constructor(props){
		super(props);
		this.state={
			greeting : ['Jack', 'Sally']
		};
	}

	renderGreetings() {
		return this.state.greeting.map( name => 
			(
				<HelloWorld key={name} name={name} />
			));
	}

	addGreeting(newName) {
		this.setState(
		{
			greeting: this.greeting.concat([{newName}])
		}
		);
	}

	render(){
		return(
			<div className="HelloWorldList">
			<AddGreeter addGreeting={this.addGreeting} />
			{this.renderGreetings()}
			</div>
			);
	}
}

export default HelloWorldList;
