import { useEffect, useState, useRef } from 'react'

import clear_icon from "./Assets/clear.png"
import cloud_icon from "./Assets/cloud.png"
import drizzle_icon from "./Assets/drizzle.png"
import humidity_icon from "./Assets/humidity.png"
import rain_icon from "./Assets/rain.png"
import snow_icon from "./Assets/snow.png"
import wind_icon from "./Assets/wind.png"
import Clear_bg from "./Assets/bg-videos/Clear.mp4"
import Cloud_bg from "./Assets/bg-videos/Cloudly.mp4"
import Drizzle_bg from "./Assets/bg-videos/Drizzle.mp4"
import Rain_bg from "./Assets/bg-videos/Rain.mp4"
import Snow_bg from "./Assets/bg-videos/Snow.mp4"

function WeatherBox() {

  const [weatherData, setWeatherData] = useState(null);

  const inputRef = useRef();

  const allicons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {

    try {

      const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

      const response = await fetch(url);

      const data = await response.json();

      console.log(data);

      const Icon =
        allicons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: Icon,
        condition: data.weather[0].main,
      });

    }

    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search("Karimnagar");
  }, []);

  let backgroundVideo = "";

  if (weatherData) {

  if (weatherData.condition === "Clear") {
    backgroundVideo =Clear_bg
  }

  else if (weatherData.condition === "Clouds") {
    backgroundVideo =Cloud_bg;
  }

  else if (weatherData.condition === "Rain") {
    backgroundVideo =Rain_bg;
  }

  else if (weatherData.condition === "Snow") {
    backgroundVideo =Snow_bg;
  }
  else if(weatherData.condition === "Drizzle"){
    backgroundVideo = Drizzle_bg;
  }
  else{
    backgroundVideo = Clear_bg;
  }
}
  if (!weatherData) {
    return <div>Loading...</div>
  }
  
  
    return (
    <>
    <video
      autoPlay
      loop
      muted
      playsInline
      className="video-bg"
      src={backgroundVideo}
    />
      <div className='WeatherBox'>

        <nav className="Search">

          <input
            ref={inputRef}
            className="Search-bar"
            type='text'
            placeholder='Search'
          />

          <button
            className="Search-icon"
            onClick={() =>
              search(inputRef.current.value)
            }
          >
            🔍
          </button>

        </nav>

        <div className="Weather">

          <img
            src={weatherData.icon}
            alt="Weather-icon"
          />

          <p className="Temperature">
            {weatherData.temperature}°C
          </p>

          <p className="Location">
            {weatherData.location}
          </p>

        </div>

        <div className="Weather-Data">

          <div className="Humidity">

            <img
              src={humidity_icon}
              alt="Humidity-icon"
            />

            <p>{weatherData.humidity}%</p>

            <span>Humidity</span>

          </div>

          <div className="Air-Speed">

            <img
              src={wind_icon}
              alt="Wind-icon"
            />

            <p>{weatherData.windSpeed} Km/h</p>

            <span>Wind Speed</span>

          </div>

        </div>

      </div>
      </>
  );
}

export default WeatherBox;