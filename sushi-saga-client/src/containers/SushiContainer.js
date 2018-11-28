import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {

  return (
    <Fragment>
      <div className="belt">
        {props.handleDisplaySushi.map(sushi => <Sushi key={sushi.id} sushi={sushi} handleEaten={props.handleEaten} eaten={props.eaten.includes(sushi)}/>)
        //eaten prop- gives us boolean of whether or not sushi has been eaten 
          /*
             Render Sushi components here!
          */
        }
        <MoreButton increaseCounter={props.increaseCounter}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer
