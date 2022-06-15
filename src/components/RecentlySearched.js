import React from 'react';

const RecentlySearched = ({ data, build_requests }) => {
  return (
    <div className='recently-searched' onClick={() => build_requests(data.location)}>
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