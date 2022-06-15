import './App.css';
import React from 'react';
import {useState, useEffect} from 'react'
import CurrentWeather from './components/CurrentWeather';
import ForecastContainer from './components/ForecastContainer';
import Header from './components/Header';
import RecentlySearched from './components/RecentlySearched';






const App = () => {
  
  const [weatherData, setWeatherData] = useState() //track state of CURRENT weather data received from API
  const [forecast, setForecast] = useState() //track state of 5 day forecast data 
  const [bgChange, setBgChange] = useState(0) //track state of background 
  const [prevSearched, setPrevSearched] = useState([]) //track state of search history


  const baseURL = "http://api.openweathermap.org/data/2.5/weather?" //base url for api request
  const apiKey = '611042e26a7e14d8816d44ac68c3562c'


  const background_list = [ //list of background images
    'https://wallpaper.dog/large/17055601.jpg',
    'https://wallpaperaccess.com/full/38581.jpg',
    'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?cs=srgb&dl=pexels-sagui-andrea-618833.jpg&fm=jpg',
    'https://images6.alphacoders.com/568/thumb-1920-568500.jpg',
    'https://www.teahub.io/photos/full/364-3646715_countryside-grass-fields-scenery-4k-landscape-field-hd.jpg',
    'https://www.pixelstalk.net/wp-content/uploads/images6/City-Wallpaper-4K-HD-Free-download.jpg',
  ]



  
  const handle_search = (event) => { 

    event.preventDefault()

    let searched_location = document.forms['searchForm']['search_bar']
    let full_url = baseURL + "appid=" + apiKey + "&q=" + searched_location.value  //build request url for current weather API request
    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searched_location.value}&appid=${apiKey}` //build url for forecast data API request
    
    get_forecast_data(forecastURL)
    get_current_data(full_url)
   
  }



  const get_current_data = async (url_) => {
    const response = await fetch(url_)
    const jsonData = await response.json()
    console.log(jsonData)
    if (jsonData.cod == 404) {
      alert('invalid location')
    }else{
      setWeatherData(jsonData)
      add_to_history(jsonData)
      changeBackground() //change background whenever new location is searched
    }

  }




  const get_forecast_data = async(url_) => {

    const response = await fetch(url_)
    const jsonData = await response.json()
    const list = jsonData.list
    let forecast_list = []

    for (var i = 5; i<list.length; i+=8){
      forecast_list.push(list[i])
    }
    setForecast(forecast_list)
  }





  const changeBackground = () => {
    if (bgChange < background_list.length - 1){ //checks that {int bgChange} is not exceeding the length of image list
      setBgChange(bgChange + 1) //if bgChange is less than the length of image list, move to the next image in the list
    }else{
      setBgChange(0) //if last image in the list, go back to first image in the list
    }
  }






  const add_to_history = (data) => {
    const current_searched = prevSearched //get current state of prevSearched (will be an array of objects)
    const searched_location = { //this will become a constructor once more data is required
      location: data.name,
      temp: Math.floor(data.main.temp - 273),
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    }

    if (current_searched.some((obj) => obj.location === searched_location.location) == false){ //check if new location is already included in  current_searched
      
      if (current_searched.length > 3){
        current_searched.pop()
      }
      console.log(searched_location)
      
      searched_location.id = current_searched.length
      current_searched.unshift(searched_location) //push searched location to current_searched
      setPrevSearched(current_searched) //update prevSearched
    }
  }



  useEffect(() => { //when first loaded, get default weather info from API
    const default_url = "https://api.openweathermap.org/data/2.5/weather?appid=611042e26a7e14d8816d44ac68c3562c&q=london"
    const default_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=plymouth&appid=611042e26a7e14d8816d44ac68c3562c"
    get_current_data(default_url)
    get_forecast_data(default_forecast)
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
        <form name='searchForm' onSubmit={handle_search}>
          <input 
            className="searchBar" 
            type='search'
            name='search_bar' 
            placeholder='Search by City...'
          />
        </form>
      </div>

      {
        prevSearched?(
          prevSearched.map((item) => <RecentlySearched data={item}/>)
        ):(
          <p>No data</p>
        )
      } 

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



