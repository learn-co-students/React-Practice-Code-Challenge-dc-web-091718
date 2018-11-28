import React, { Fragment } from 'react'

const Sushi = (props) => {
  console.log(props.eaten)
  return (
    <div className="sushi">
        <div className="plate" onClick={()=> props.handleEaten(props.sushi)}>

        {props.eaten ? null : <img src={props.sushi.img_url} width="100%"/>}
      
        </div>
        <h4 className="sushi-details">
          {props.sushi.name} - ${props.sushi.price}
        </h4>
      </div>
    )
  }

export default Sushi
//
// <div className="sushi">
//     <div className="plate"
//
//           onClick={()=>props.clickHandler(props.sushi)}>
//
//         { props.eaten ? null :
//          <img src={props.sushi.image_url} width="100%" />
//        }
//
//     </div>
//     <h4 className="sushi-details">
//       {props.sushi.name} - ${props.sushi.price}
//     </h4>
//   </div>
