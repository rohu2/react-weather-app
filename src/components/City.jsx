import React from 'react'

 const City = ({city, setCity, inputRef, keypress, clickable }) => {
    return (
        <div   onKeyPress={keypress} className={clickable ? 'city clickable' : "city"} onClick={()=>{ inputRef.current.value = city; setCity(inputRef.current.value)   } } >
            {city}
        </div>
    )
}


export default City