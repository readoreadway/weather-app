import { useState } from "react";
import "./App.css";

let api = {
  base: "http://api.openweathermap.org/data/2.5/",
  key: "d2a3434365e68a3b9759dcf2e842f8ae",
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasData, setHasData] = useState(false)
  const [weatherData, setWeatherData] = useState({});
  const dateBuilder = (d) => {
    let Months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let Days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = Days[d.getDay()];
    let date = d.getDate();
    let month = Months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const searchTermhandler = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
  };

  const fetchWeatherDataHandler = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${searchTerm}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeatherData(result);
          setSearchTerm("");
          setHasData(true)
        });
    }
  };

  let classes;
  if (hasData && weatherData.main.temp > 17) {
    classes = "app warm";
  } else {
    classes = "app";
  }

  return (
    <div className={classes}>
      <main>
        <div className="search__box">
          <input
            type="text"
            className="search__bar"
            placeholder="Search a place..."
            value={searchTerm}
            onChange={searchTermhandler}
            onKeyPress={fetchWeatherDataHandler}
          />
        </div>

        {hasData ? (
          <div>
            <div className="location__box">
              <div className="location">
                {weatherData.name}, {weatherData.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather__box">
              <div className="temp">{Math.round(weatherData.main.temp)}°C</div>
              <div className="weather">{weatherData.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
