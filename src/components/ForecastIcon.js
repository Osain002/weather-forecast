
import React, { useEffect, useState } from "react"

const ForecastIcon = (props) => {

    const [img, setImg] = useState()
    const [day, setDay] = useState()

    const days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']



    useEffect(() => {
        const base_url =`https://openweathermap.org/img/wn/${props.day.weather[0].icon}@2x.png` //endpoint for icon
        const d = new Date(props.day.dt_txt)
        setImg(base_url)
        setDay(days[d.getDay()])

      },[props])

    return (
        <div>
            <h3 style={{color:"white", width:"fit-content"}}>{day}</h3>
            <div className='forecast-icon-container'>
                <img src={img} alt='WIcon'/>
            </div>
            <div className="forecast-temp-container">
                <h2>
                    {Math.floor(props.day.main.temp - 273)} ºC 
                </h2>
            </div>
        </div>
    )
}

export default ForecastIcon