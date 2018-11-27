import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor() {
    super()
    this.state={
      sushis: [],
      fourSushis: [],
      eatenSushis: [],
      balance: 50
    }
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.setupSushi(data)
      })
  }

  setupSushi(sushis) {
    const setupSushis = sushis.map(sushi => {
      sushi.eaten = false
      return sushi
    })
    this.setState({
      sushis: setupSushis,
      fourSushis: this.pickFourSushi(sushis)
    })
  }

  pickFourSushi = (sushiStack) => {
    let fourSushi = []

    //Todo: Make sure you can't have the same sushi on teh conveyer twice.
    if (sushiStack.length > 4) {
      fourSushi.push(sushiStack[Math.floor((Math.random() * sushiStack.length))])
      fourSushi.push(sushiStack[Math.floor((Math.random() * sushiStack.length))])
      fourSushi.push(sushiStack[Math.floor((Math.random() * sushiStack.length))])
      fourSushi.push(sushiStack[Math.floor((Math.random() * sushiStack.length))])
    } else {
      fourSushi = sushiStack
    }

    return fourSushi
  }

  moreSushi = () => {
    this.setState({
      fourSushis: this.pickFourSushi(this.state.sushis)
    })
  }

  eat = eatenSushi => {
    if (this.state.balance >= eatenSushi.price) {
      const allSushi = this.state.sushis.slice()
      const index = allSushi.indexOf(eatenSushi)
      allSushi[index].eaten = true
      this.setState({
        sushis: allSushi,
        eatenSushis: [...this.state.eatenSushis, eatenSushi],
        balance: this.state.balance - eatenSushi.price
      })
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.state.fourSushis} moreSushi={this.moreSushi} eatSushi={this.eat}/>
        <Table plates={this.state.eatenSushis} balance={this.state.balance}/>
      </div>
    );
  }
}

export default App;
