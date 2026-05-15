import React, { useEffect } from 'react'
import clear_icon from "../src/assets/clear.png"
import cloud_icon from "../src/assets/cloud.png"
import drizzle_icon from "../src/assets/drizzle.png"
import humidity_icon from "../src/assets/humidity.png"
import rain_icon from "../src/assets/rain.png"
import snow_icon from "../src/assets/snow.png"
import wind_icon from "../src/assets/wind.png"

function WeatherBox() {
 const search = async (city) => {
  try {
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_API}`;

    const response = await fetch(url)
    const data = await response.json()

    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
    useEffect(()=>{
      search("London");
    },[])
  return (
    <div className='WeatherBox'>
      <nav className="Search"> 
      <input className="Search-bar" type='text' placeholder=' Search'/>
      <button className="Search-icon">🔍</button>
      </nav>
      <div className="Weather">
        <img src={clear_icon} alt="Clear-icon"></img>
        <p className="Temperature">31°C</p>
        <p className="Location">London</p>
      </div>
      <div className="Weather-Data">
        <div className="Humidity">
          <img  src={humidity_icon} alt="Humidity-icon"></img>
          <p>80%</p>
          <span>Humidity</span>
        </div>
        <div className="Air-Speed">
          <img  src={wind_icon} alt="Wind-icon"></img>
          <p>2.5 Km/h</p>
          <span>Wind Speed</span>
        </div>  
      </div>
    </div>
  )
}

export default WeatherBox  