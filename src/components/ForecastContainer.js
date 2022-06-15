import {useState } from "react"
import ForecastIcon from "./ForecastIcon"
import ForecastInfo from "./ForecastInfo"
import React from 'react';


const ForecastContainer = (props) => {

  const [isHover, setIsHover] = useState(false)
  
  return (
    <div 
      className='future-forecast-container' 
      onMouseEnter={() => setIsHover(true)} 
      onMouseLeave={() => setIsHover(false)}
    >

      {
        isHover?(
          <ForecastInfo day={props.day}/>
          
        ):(
          <ForecastIcon  day={props.day}/>
        )
      }


      
    </div>
  )
}

export default ForecastContainer