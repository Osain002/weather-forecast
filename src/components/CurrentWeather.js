import React, { useEffect, useState } from 'react'

const CurrentWeather = ({weatherData}) => {

  const [iconUrl, setIconUrl] = useState()
  
  useEffect(() => {
    const base_url =`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` //04n@2x.png
    setIconUrl(base_url)
  },[weatherData])

  return (
    <div className='current-weather-container'>
      <h1 style={{color:'aliceblue', 
                  width:'50pt'}}>
                    Now
                  </h1>

        <div className='current-icon-container'>
            <img 
              src={iconUrl} 
              alt='Weather-Icon'
              className='main-icon'
            />
            <h1 className='temp-icon'>{Math.floor(weatherData.main.temp - 273)} ºC</h1>
        </div>
        <div className='current-weather-info'>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Feels like: {Math.floor(weatherData.main.feels_like - 275)} ºC</p>
            <p>Wind: {weatherData.wind.speed} mph</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
    </div>
  )
}

export default CurrentWeather