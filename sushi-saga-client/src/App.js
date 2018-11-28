import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor(){
    super()
    this.state={
      sushis: [],
      eatenSushi: [],
      budget: 150,
      counter: 0
    }
  }


  componentDidMount(){
    fetch('http://localhost:3000/sushis')
    .then(res => res.json())
    .then(data => this.setState({
      sushis: data
    }))
  }

  handleDisplaySushi = () => {
    return this.state.sushis.slice(this.state.counter, this.state.counter+4)
  }

  increaseCounter = () => {
    this.setState({
      counter: this.state.counter + 4
    })
  }

  handleEaten = (sushi) => {
    if(this.state.budget >= sushi.price) {
      this.setState({
        eatenSushi: [...this.state.eatenSushi, sushi],
        budget: this.state.budget - sushi.price
      })
    }
  }


  render() {
    return (
      <div className="app">
        <SushiContainer increaseCounter={this.increaseCounter} handleDisplaySushi={this.handleDisplaySushi()} sushis={this.state.sushis} handleEaten={this.handleEaten} eaten={this.state.eatenSushi}/>
        <Table budget={this.state.budget} eaten={this.state.eatenSushi}/>
      </div>
    );
  }
}

export default App;
