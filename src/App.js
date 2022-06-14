import './App.css';
import React from 'react';
import {useState, useEffect} from 'react'
import CurrentWeather from './components/CurrentWeather';
import ForecastContainer from './components/ForecastContainer';
import Header from './components/Header';






const App = () => {
  
  const [weatherData, setWeatherData] = useState()
  const [forecast, setForecast] = useState()
  const [bgChange, setBgChange] = useState(0)


  const baseURL = "http://api.openweathermap.org/data/2.5/weather?" //base url for api request
  const apiKey = '611042e26a7e14d8816d44ac68c3562c'


  const background_list = [
    'https://wallpaper.dog/large/17055601.jpg',
    'https://wallpaperaccess.com/full/38581.jpg',
    'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?cs=srgb&dl=pexels-sagui-andrea-618833.jpg&fm=jpg',
    'https://images6.alphacoders.com/568/thumb-1920-568500.jpg',
    'https://www.teahub.io/photos/full/364-3646715_countryside-grass-fields-scenery-4k-landscape-field-hd.jpg',
    'https://www.pixelstalk.net/wp-content/uploads/images6/City-Wallpaper-4K-HD-Free-download.jpg',
  ]
  
  const get_api_url = (event) => {
    event.preventDefault()
    let searched_location = document.forms['searchForm']['search_bar'].value
    let full_url = baseURL + "appid=" + apiKey + "&q=" + searched_location  //build request url for current weather
    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searched_location}&appid=${apiKey}`
    get_forecast(forecastURL)
    get_data_from_api(full_url)

    if (bgChange < background_list.length - 1){
      setBgChange(bgChange + 1)
    }else{
      setBgChange(0)
    }
    
  }

  const get_data_from_api = async (url_) => {
    const response = await fetch(url_)
    console.log(url_)
    const jsonData = await response.json()    
    setWeatherData(jsonData)
  }

  const get_forecast = async(url_) => {
    const response = await fetch(url_)
    const jsonData = await response.json()
    let list = jsonData.list

    let forecast_list = []
    for (var i = 5; i<list.length; i+=8){
      forecast_list.push(list[i])
    }
    
    console.log(forecast_list)
    setForecast(forecast_list)
  }

//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  useEffect(() => { //when first loaded, get default weather info from API
    const default_url = "https://api.openweathermap.org/data/2.5/weather?appid=611042e26a7e14d8816d44ac68c3562c&q=london"
    const default_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=plymouth&appid=611042e26a7e14d8816d44ac68c3562c"
    get_data_from_api(default_url)
    get_forecast(default_forecast)
    

  }, [])


//611042e26a7e14d8816d44ac68c3562c
  return (
    <div 
      className="App" 
      style={{backgroundImage: `url('${background_list[bgChange]}')`
      }}>

      {
      weatherData?(
        <Header city={weatherData.name}/>
      ):(
        <h5>NULL</h5>
      )}
      
      <div className="search_container">
        <form name='searchForm' onSubmit={get_api_url}>
          <input 
            className="searchBar" 
            type='search'
            name='search_bar' 
            placeholder='Search by City...'
          />
        </form>
      </div>

      {
        weatherData?(
          <CurrentWeather 
            weatherData={weatherData}
          />
        ):(
          <>
            <h1>Cannot load data</h1>
          </>
        )
      }
      

      <div className='days-list-container'>
        {
          forecast?(
            forecast.map((day) => <ForecastContainer key={day.dt} day={day}/>)
          ):(
            <h1>No data</h1>
          )
        }
      </div>
      
    </div>
  );
}

export default App;



