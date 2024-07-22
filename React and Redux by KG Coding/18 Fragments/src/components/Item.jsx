import React from 'react'
import styles from './Item.module.css'

const Item = ({myFoodItem, handleBuyButtonClicked}) => {

    
    return (
        <li className={`${styles["kg-item"]} list-group-item`}>
            <span className={styles["kg-span"]}>{myFoodItem}</span>
            <button className={`${styles["button"]} btn btn-info`}

                onClick={handleBuyButtonClicked}

            >Buy</button>
        </li>
    )
}

export default Item