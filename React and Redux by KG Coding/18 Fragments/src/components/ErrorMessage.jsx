import React from 'react'

const ErrorMessage = ({myFoodItems}) => {
    return (
        <>
            {myFoodItems.length===0 && <h3>I'm still hungry</h3>}
        </>
    )
}

export default ErrorMessage