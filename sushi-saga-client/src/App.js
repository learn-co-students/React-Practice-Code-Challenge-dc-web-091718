import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import FundsForm from './components/FundsForm'

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor() {
    super()
    this.state={
      sushis: [],
      fourSushis: [],
      eatenSushis: [],
      balance: 50,
      toAdd: 0
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
      fourSushis: this.nextFourSushi(setupSushis)
    })
  }

  nextFourSushi = (sushis) => {
    let sushiToReturn = []

    if (this.state.fourSushis.length === 4) {
      const lastSushi = this.state.fourSushis.pop()
      const lastSushiIndex = sushis.indexOf(lastSushi)

      if (sushis.length >= lastSushiIndex + 5) {
        sushiToReturn = sushis.slice(lastSushiIndex + 1, lastSushiIndex + 5)
      } else {
        // Find the remaining # of sushis
        // Add that number to sushiToReturn
        // Take the next x number from the top again and add to sush to return till there are four.
        const remainingSushi = sushis.length - (lastSushiIndex + 5)
        if (remainingSushi < 0) {
          sushiToReturn = sushis.slice(0,4)
        } else {
          // We don't seem to hit this. Not sure why.
        }
      }

    } else {
      sushiToReturn = sushis.slice(0,4)
    }

    return sushiToReturn
  }

  moreSushi = () => {
    this.setState({
      fourSushis: this.nextFourSushi(this.state.sushis)
    })
  }

  eat = eatenSushi => {
    if(!this.state.eatenSushis.includes(eatenSushi))
    {
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
  }

  addFunds = (event) => {
    event.preventDefault()

    this.setState({
      balance: this.state.balance + parseInt(this.state.toAdd, 10),
      toAdd: 0
    })
  }

  changeFundsForm = (event) => {
    this.setState({
      toAdd: event.target.value
    })
  }

  render() {
    return (
      <div className="app">
        <FundsForm onSubmit={this.addFunds} onChange={this.changeFundsForm} currentValue={this.state.toAdd}/>
        <SushiContainer sushis={this.state.fourSushis} moreSushi={this.moreSushi} eatSushi={this.eat}/>
        <Table plates={this.state.eatenSushis} balance={this.state.balance} />
      </div>
    );
  }
}

export default App;
