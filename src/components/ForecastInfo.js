

const ForecastInfo = (props) => {
    console.log(props.day)
    return (
        
        <div className="forecast-info">
            <ul>
                <li>
                    <h4>
                        {props.day.weather[0].description}
                    </h4>
                </li>
                <li>
                    <h4>
                        Wind: {props.day.wind.speed} mph
                    </h4>
                </li>
                <li>
                    <h4>
                        Humidity: {props.day.main.humidity} %
                    </h4>
                </li>
                <li>
                    <h4>
                        Feels like: {Math.floor(props.day.main.feels_like - 275)} ºC
                    </h4>
                </li>
            </ul>
        </div>
    )
}

export default ForecastInfo