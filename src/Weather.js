import React, {Component} from 'react';

class Weather extends Component {
  constructor () {
    super();
    this.state = {
      apikey: '8e4e7d05fab845353457c063a0f558a7', // todo
      city: '',
      error: null,
      weather: null
    };
  }

  render () {
    return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={this.onForecast}>
        <input placeholder="city" onChange={this.onCityChange}/>
        <button>Forecast</button>
      </form>
      {this.state.error ? <strong>{this.state.error}</strong> : <p>{this.state.weather}</p>}
    </div>
    );
  }

  onCityChange = (ev) => {
    this.setState({...this.state, city: ev.target.value});
  }

  onForecast = (ev) => {
    ev.preventDefault(); // Note: prevent traditional form submit from reloading the page
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.state.apikey}`;
    fetch(url)
    .then((response) => Promise.all([response, response.json()]))
    .then(this.onForecastReceived);
  }

  onForecastReceived = ([response, result]) => {
    if (response.ok) {
      this.setState({
        ...this.state,
        error: null,
        weather: result.weather[0].main
      });
    } else {
      this.setState({
        ...this.state,
        error: result.message,
        weather: null
      });
    }
  }
}

export default Weather;

function fakeWeather () {
  return new Promise((resolve) => {
    resolve({
      "coord": {
        "lon": -0.13,
        "lat": 51.51
      },
      "weather": [
        {
          "id": 721,
          "main": "Haze",
          "description": "haze",
          "icon": "50d"
        },
        {
          "id": 300,
          "main": "Drizzle",
          "description": "light intensity drizzle",
          "icon": "09d"
        },
        {
          "id": 701,
          "main": "Mist",
          "description": "mist",
          "icon": "50d"
        },
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 278.32,
        "pressure": 1014,
        "humidity": 93,
        "temp_min": 277.15,
        "temp_max": 279.15
      },
      "visibility": 3600,
      "wind": {
        "speed": 6.7,
        "deg": 100
      },
      "clouds": {
        "all": 90
      },
      "dt": 1485850800,
      "sys": {
        "type": 1,
        "id": 5091,
        "message": 0.0173,
        "country": "GB",
        "sunrise": 1485848374,
        "sunset": 1485881351
      },
      "id": 2643743,
      "name": "London",
      "cod": 200
    });
  });
}
