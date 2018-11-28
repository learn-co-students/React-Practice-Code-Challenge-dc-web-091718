import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

	state = {
		eaten: [],
		sushis: [],
		budget: 100,
		page: 0
	}

	componentDidMount() {
		fetch(API)
			.then(res => res.json())
			.then(json => this.setState({ sushis: json }))
	}

	onClickSushi = (sushi) => {
		let currentBudget = this.state.budget
		if (currentBudget >= sushi.price) {
			currentBudget -= sushi.price
			this.setState({
				budget: currentBudget,
				eaten: [...this.state.eaten, sushi.id]
			})

		}
	}

	isEaten = (id) => {
		return this.state.eaten.includes(id)
	}

	nextPage = () => {
		let nextPage = (this.state.page + 1) % 25
		this.setState({ page: nextPage })
	}

	render() {
		return (
			<div className="app">
				<SushiContainer sushis={this.limitSushis()} isEaten={this.isEaten}onClickSushi={this.onClickSushi} onClickMore={this.nextPage} />
				<Table budget={this.state.budget} eaten={this.state.eaten}/>
			</div>
		);
	}

	limitSushis() {
		let i = this.state.page * 4
		return this.state.sushis.slice(i, i + 4)
	}
}

export default App;