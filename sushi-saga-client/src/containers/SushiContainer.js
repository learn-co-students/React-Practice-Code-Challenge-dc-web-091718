import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {
          props.sushis.map(sushi => <Sushi sushi={sushi} eat={props.eatSushi} key={sushi.id}/>)
        }
        <MoreButton onClick={props.moreSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer
