import React from 'react'
import Item from './Item';

const FoodItems = ({myFoodItems}) => {
    return (
        <>
            <ul className="list-group">
                {
                    myFoodItems.map((item, index) => (
                        <Item key={index} myFoodItem={item}></Item>                        
                    ))
                }
            </ul>
        </>
    );
};

export default FoodItems