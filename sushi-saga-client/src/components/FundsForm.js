import React, {Component} from 'react'

class FundsForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <label>Add Funds</label>
        <input type="number" value={this.props.currentValue} onChange={this.props.onChange}/>
        <button type="submit">Add Funds</button>
      </form>
    )
  }
}

export default FundsForm
