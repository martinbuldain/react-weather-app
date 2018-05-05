import React from 'react';

class WeatherInfoItem extends React.Component {
  render(){
    if (this.props.citySearch.nombreCiudad === '') {
      return (
        <div className="container">
          <article className="weather-element">
            <div className="panel panel-warning">
              <div className="panel-heading">Debe especificar una ciudad</div>
            </div>
          </article>
        </div>
      )
    }
    else {
      return (
        <div className="container">
          <article className="weather-element">
            <div className="col-1">
              <h3>{this.props.citySearch.nombreCiudad}</h3>
              <p className="info"></p>
            </div>
            <div className="col-2">
              <span className="temperature">{this.props.citySearch.temperature}</span>
            </div>
          </article>
        </div>
      )
    }
  };
}

export default WeatherInfoItem;
