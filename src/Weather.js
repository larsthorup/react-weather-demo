import React, {Component, PropTypes} from 'react';

class Weather extends Component {
  constructor (props) {
    super();
    this.state = {
      apikey: props.apikey,
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
        <input autoFocus placeholder="city" onChange={this.onCityChange}/>
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
        weather: result.weather.map((weather) => weather.main).join(', ')
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
Weather.propTypes = {
  apikey: PropTypes.string.isRequired
};

export default Weather;