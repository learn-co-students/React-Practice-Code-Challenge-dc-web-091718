import SushiContainer from './containers/SushiContainer';
import React, { Component } from 'react';
import Table from './containers/Table';

const API = "http://localhost:3000/sushis"

export default class App extends Component {

  constructor () {
    super();
    this.state = {
      sushi: [],
      budget: 100,
      eaten: [],
      counter: 0
    };
  };

  fetchSushi = () => {
    fetch(API)
    .then(res => res.json())
    .then(json => {
      let newJson = json.map(sushi => {
        return {...sushi, eaten: false}
      });
      this.setState({sushi: newJson})
    })
  };

  componentDidMount () {
    this.fetchSushi();
  }

  increaseCounter = () => {
    if (this.state.counter < this.state.sushi.length - 4) {
      this.setState({counter: this.state.counter + 4});
    } else {
      this.setState({counter: 0});
    }
  }

  sushisToDisplay = () => {
    let counter = this.state.counter;
    console.log("sushiToDisplay");
    return this.state.sushi.slice(counter, counter + 4);
  }

  eatSushi = id => {
    let selectedSushi = this.state.sushi.find(sushi => {return sushi.id === id});
    if (this.adjustBudget(selectedSushi) && !selectedSushi.eaten) {
      let newSushiArray = this.state.sushi.map(sushi => {
        if (sushi.id === id) {
        return {...sushi, eaten: true}
        } else {
          return sushi
        }
    })
    let newEatenArray = [...this.state.eaten, selectedSushi];
    this.setState({sushi: newSushiArray, eaten: newEatenArray});
    } else {
      console.warn("You don't have enough budget or Sushi already eaten")
    }
  }

  adjustBudget = (sushi) => {
    if (this.state.budget >= sushi.price && !sushi.eaten) {
      this.setState({budget: this.state.budget - sushi.price});
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.sushisToDisplay()} 
                        increaseCounter={this.increaseCounter}
                        eatSushi = {this.eatSushi}
                        />
        <Table eaten={this.state.eaten} budget = {this.state.budget} />
      </div>
    );
  }
}