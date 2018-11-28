import React from 'react'

const Sushi = ({ sushi, isEaten, onClickSushi }) => {
	console.log(sushi.name, sushi.id)
	return (
		<div className="sushi">
			<div className="plate"
				onClick={() => onClickSushi(sushi)}>
				{
					/* Tell me if this sushi has been eaten! */
					isEaten(sushi.id) ?
						null
						:
						<img src={sushi.img_url} alt={sushi.name} width="100%" />
				}
			</div>
			<h4 className="sushi-details">
				{sushi.name} - ${sushi.price}
			</h4>
		</div>
	)
}

export default Sushi