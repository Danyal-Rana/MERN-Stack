import React from 'react'

const Item = (props) => {
    return (
        <li className="list-group-item">
            {props.myFoodItem}
        </li>
    )
}

export default Item