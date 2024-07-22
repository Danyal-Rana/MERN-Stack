import React from 'react'
import styles from './Item.module.css'

const Item = (props) => {

    const handleBuyButtonClicked = (foodItem, event) => {
        console.log(event);
        console.log(`${foodItem} is bought.`)
    }
    return (
        <li className={`${styles["kg-item"]} list-group-item`}>
            <span className={styles["kg-span"]}>{props.myFoodItem}</span>
            <button className={`${styles["button"]} btn btn-info`}

                onClick={(event) => {
                    return handleBuyButtonClicked(props.myFoodItem, event);
                }}

            >Buy</button>
        </li>
    )
}

export default Item