import { useEffect, useRef, useState } from "react";

import clear_icon from "./Assets/clear.png";
import cloud_icon from "./Assets/cloud.png";
import drizzle_icon from "./Assets/drizzle.png";
import humidity_icon from "./Assets/humidity.png";
import rain_icon from "./Assets/rain.png";
import search_icon from "./Assets/search.png";
import snow_icon from "./Assets/snow.png";
import wind_icon from "./Assets/wind.png";

import Clear_bg from "./Assets/bg-videos/Clear.mp4";
import Cloud_bg from "./Assets/bg-videos/Cloudly.mp4";
import Drizzle_bg from "./Assets/bg-videos/Drizzle.mp4";
import Rain_bg from "./Assets/bg-videos/Rain.mp4";
import Snow_bg from "./Assets/bg-videos/Snow.mp4";

const allIcons = {
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

const MIN_LOADING_TIME_MS = 1500;

const wait = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

const getBackgroundVideo = (condition) => {
  if (condition === "Clouds") {
    return Cloud_bg;
  }

  if (condition === "Rain") {
    return Rain_bg;
  }

  if (condition === "Snow") {
    return Snow_bg;
  }

  if (condition === "Drizzle") {
    return Drizzle_bg;
  }

  return Clear_bg;
};

const formatCityDateTime = (timezoneOffsetSeconds) => {
  const cityNow = new Date(Date.now() + timezoneOffsetSeconds * 1000);

  return {
    currentDate: cityNow.toLocaleDateString("en-IN", {
      timeZone: "UTC",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    currentTime: cityNow.toLocaleTimeString("en-IN", {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const formatNumber = (value) =>
  Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

const fetchWeatherData = async (city) => {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (Number(data.cod) !== 200) {
    throw new Error(data.message || "Weather data could not be fetched");
  }

  return {
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    temperature: data.main.temp,
    location: data.name,
    icon: allIcons[data.weather[0].icon] || clear_icon,
    condition: data.weather[0].main,
    timezoneOffset: data.timezone,
  };
};

const fetchWeatherDataWithMinimumDelay = async (city) => {
  const [weatherResult] = await Promise.allSettled([
    fetchWeatherData(city),
    wait(MIN_LOADING_TIME_MS),
  ]);

  if (weatherResult.status === "rejected") {
    throw weatherResult.reason;
  }

  return weatherResult.value;
};

function AnimatedNumber({ value, suffix = "", delay = 520 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime;
    const duration = 1400;
    let animationFrameId;
    let delayTimeoutId;

    const animate = (currentTime) => {
      if (startTime === undefined) {
        startTime = currentTime;
      }

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Number(value) * easedProgress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    delayTimeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayTimeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [delay, value]);

  return (
    <>
      {formatNumber(displayValue)}
      {suffix}
    </>
  );
}

function LoadingDots() {
  return (
    <div className="loader-wrap" aria-label="Loading weather data">
      <div className="loading-dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>Loading weather</p>
    </div>
  );
}

function WeatherBox() {
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [backgroundVideo, setBackgroundVideo] = useState(Clear_bg);
  const [cityDateTime, setCityDateTime] = useState({
    currentDate: "",
    currentTime: "",
  });

  const inputRef = useRef(null);

  const search = async (city) => {
    const searchedCity = city?.trim();

    if (!searchedCity) {
      alert("Enter City Name");
      return;
    }

    setStatus("loading");
    setWeatherData(null);
    setCityDateTime({
      currentDate: "",
      currentTime: "",
    });

    try {
      const nextWeatherData = await fetchWeatherDataWithMinimumDelay(searchedCity);

      setWeatherData(nextWeatherData);
      setBackgroundVideo(getBackgroundVideo(nextWeatherData.condition));
      setStatus("success");
    } catch (error) {
      console.log("Error Fetching Weather Data", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    let ignoreResult = false;

    const loadInitialWeather = async () => {
      setStatus("loading");

      try {
        const nextWeatherData = await fetchWeatherDataWithMinimumDelay("Karimnagar");

        if (!ignoreResult) {
          setWeatherData(nextWeatherData);
          setBackgroundVideo(getBackgroundVideo(nextWeatherData.condition));
          setStatus("success");
        }
      } catch (error) {
        console.log("Error Fetching Weather Data", error);

        if (!ignoreResult) {
          setStatus("error");
        }
      }
    };

    loadInitialWeather();

    return () => {
      ignoreResult = true;
    };
  }, []);

  useEffect(() => {
    if (weatherData?.timezoneOffset === undefined || weatherData?.timezoneOffset === null) {
      return;
    }

    const updateClock = () => {
      setCityDateTime(formatCityDateTime(weatherData.timezoneOffset));
    };

    updateClock();

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, [weatherData?.timezoneOffset]);

  const isLoading = status === "loading";

  return (
    <>
      <video
        key={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="video-bg"
        src={backgroundVideo}
      />

      <div className="WeatherBox">
        <nav className="Search">
          <input
            ref={inputRef}
            className="Search-bar"
            type="text"
            placeholder="Enter City Name"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                search(inputRef.current.value);
              }
            }}
          />

          <button
            className="Search-icon"
            onClick={() => {
              if (!isLoading) {
                search(inputRef.current.value);
              }
            }}
          >
            <img src={search_icon} alt="Search" />
          </button>
        </nav>

        <div className="WeatherCard-content">
          {status === "loading" && <LoadingDots />}

          {status === "error" && (
            <div className="WeatherError">
              <p>Error</p>
              <span>Unable to fetch weather data</span>
            </div>
          )}

          {status === "success" && weatherData && (
            <div className="WeatherContent">
              <div className="Weather">
                <img src={weatherData.icon} alt="Weather-icon" />

                <p className="Temperature">
                  <AnimatedNumber value={weatherData.temperature} suffix={"\u00B0C"} />
                </p>

                <p className="Location">{weatherData.location}</p>
              </div>

              <div className="date-time">
                <p>{cityDateTime.currentDate}</p>
                <p>{cityDateTime.currentTime}</p>
              </div>

              <div className="Weather-Data">
                <div className="Humidity">
                  <img src={humidity_icon} alt="Humidity-icon" />

                  <p>
                    <AnimatedNumber value={weatherData.humidity} suffix="%" />
                  </p>

                  <span>Humidity</span>
                </div>

                <div className="Air-Speed">
                  <img src={wind_icon} alt="Wind-icon" />

                  <p>
                    <AnimatedNumber value={weatherData.windSpeed} suffix=" Km/h" />
                  </p>

                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherBox;
