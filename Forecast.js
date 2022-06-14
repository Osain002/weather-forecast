//Main view containing current weather data, and following 5 day forecast
import React, { useEffect, useState } from 'react'
import CurrentWeather from './CurrentWeather.js'
import Days from './Days.js'
import './Styles/Forecast.css'


const Forecast = (props) => {
  const [iconURL,setIconURL] = useState(null)
  const [temp, setTemp] = useState("")
  const [Lat, setLat] = useState(51.5085)  //latitude of city
  const [Lon, setLon] = useState(-0.1257)
  const [forecast, setForecast] = useState("")


  
  const days = [
    {
      id:'1',
      day:'day1',
    },
    {
      id:'2',
      day:'day2',
    },
    {
      id:'3',
      day:'day3',
    },
    {
      id:'4',
      day:'day4',
    },
    {
      id:'5',
      day:'day5',
    },
  ]

  useEffect(() => { //get icon info from data

    const apiKey = '611042e26a7e14d8816d44ac68c3562c'
    const baseForecastURL = "http://api.openweathermap.org/data/2.5/forecast?"
    const base = "https://openweathermap.org/img/wn/" // base url for img

    let data = props.weatherData
    let iconID = data.weather[0].icon // gets icon info
    let imgURL = base + iconID + '@2x.png' //create url of image
    let temp_celsius = Math.floor(data.main.temp - 273.15) // get temp and convert from kelvin to celcius.
    let forecastURL = baseForecastURL + 'lat=' + Lat + '&' + 'lon=' + Lon + '&appid=' + apiKey //build url for 5 day forecast


    setLat(data.coord.lat) //latitude of city
    setLon(data.coord.lon) //longitude of city

    //console.log('URL',forecastURL)
    fetch(forecastURL) 
      .then( response => response.json())
      .then( data => setForecast(data))

    setIconURL(imgURL) //set iconURL = imgURL.  This is then passed into CurrentWeather 
    setTemp(temp_celsius) //set temp = temp_celsius

  }, [props])



  useEffect(() => {
    console.log(forecast)
  },[forecast])

//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

  return (

    <div id='fcStyle'>
      <CurrentWeather 
        data={props.weatherData} 
        iconurl={iconURL}
        temp={temp}/>
      
      <div id='daysList'>
        {days.map((Day) => <Days 
          key={Day.id} 
          day = {Day.day}
          lat={Lat}
          lon={Lon}
          />)}
      </div>
        
      
    </div>
  )
}

export default Forecast