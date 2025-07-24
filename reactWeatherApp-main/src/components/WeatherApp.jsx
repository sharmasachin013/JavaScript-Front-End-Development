import React, { useState, useEffect } from "react";
import "./style.css"; // make sure it contains your styles

const API_KEY = "8bca890e7b3cefd5ee1cd30ffa5229ba";

const weatherImages = [
  { url: "../images/broken-clouds.png", ids: [803, 804] },
  { url: "../images/clear-sky.png", ids: [800] },
  { url: "../images/few-clouds.png", ids: [801] },
  { url: "../images/mist.png", ids: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781] },
  { url: "../images/rain.png", ids: [500, 501, 502, 503, 504] },
  { url: "../images/scattered-clouds.png", ids: [802] },
  { url: "../images/shower-rain.png", ids: [520, 521, 522, 531, 300, 301, 302, 310, 311, 312, 313, 314, 315] },
  { url: "../images/snow.png", ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622] },
  { url: "../images/thunderstorm.png", ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232] },
];

const WeatherApp = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);

  const fetchWeatherByCity = async (city) => {
   
    
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    if (data.cod !== 200) {
      alert(data.message);
    } else {
      setWeather(data);
    }
  };

  const fetchSuggestions = async (cityName) => {
    if (cityName.length <= 2) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`
      );
      console.log(res);
      const data = await res.json();
      setSuggestions(data);
      
    } catch (error) {
      alert("Error");
      
    }
  
   
  };

  const getImageUrl = (weatherId) => {
    const found = weatherImages.find((img) => img.ids.includes(weatherId));
    return found ? found.url : "/images/default.png";
  };

  const getWindDirection = (deg) => {
    if (deg > 45 && deg <= 135) return "East";
    if (deg > 135 && deg <= 225) return "South";
    if (deg > 225 && deg <= 315) return "West";
    return "North";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeatherByCity(query);
      console.log("Bhopal!!!");
    }
  };

  return (
    <div className="weather">
      <input
        type="search"
        className="weather_search"
        placeholder="Enter City Name"
        list="suggestions"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <datalist id="suggestions">
        {suggestions.map((city, index) => (
          <option
            key={index}
            value={`${city.name},${city.state || ""},${city.country}`}
          />
        ))}
      </datalist>

      {weather && (
        <div className="weather_today">
          <div className="weather_details">
            <h2 className="weather_city">{weather.name}</h2>
            <p className="weather_day">
              {new Date().toLocaleDateString("en-EN", { weekday: "long" })}
            </p>
            <div className="weather_current">
              <p className="weather_indicator weather_indicator--humidity">
                <span className="value">{weather.main.humidity}</span>%
              </p>
              <p className="weather_indicator weather_indicator--wind">
                <span className="value">
                  {getWindDirection(weather.wind.deg)}
                </span>
                m/s
              </p>
              <p className="weather_indicator weather_indicator--pressure">
                <span className="value">{weather.main.pressure}</span>hPa
              </p>
            </div>
          </div>
          <img
            src={getImageUrl(weather.weather[0].id)}
            alt="Weather icon"
            className="weather_image"
          />
          <div className="weather_temperature">
            <span className="value">
              {weather.main.temp > 0 ? "+" : ""}
              {Math.round(weather.main.temp)}
            </span>{" "}
            &deg;C
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
