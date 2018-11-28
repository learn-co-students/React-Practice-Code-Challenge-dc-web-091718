import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {

	return (
		<Fragment>
			<div className="belt">
				{
					props.sushis ? renderSushis(props.sushis, props.isEaten, props.onClickSushi) : null
				}
				<MoreButton onClickMore={props.onClickMore}/>
			</div>
		</Fragment>
	)
}

let renderSushis = (sushis, isEaten, onClickSushi) => {
	return sushis.map(sushi => <Sushi key={sushi.id} sushi={sushi} isEaten={isEaten} onClickSushi={onClickSushi}/>)
}

export default SushiContainer