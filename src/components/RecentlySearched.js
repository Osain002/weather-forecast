
const RecentlySearched = ({ data }) => {
  return (
    <div className='recently-searched'>
        <h3>{data.location}:</h3>

        <div className="searched-temp">
          <h4>{data.temp}ºC</h4>
        </div>
        
        <div className="searched-image-container">
          <img src={data.icon}></img>
        </div>
    </div>
  )
}

export default RecentlySearched