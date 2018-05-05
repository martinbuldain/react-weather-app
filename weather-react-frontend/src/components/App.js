import React from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import AddForm from './AddForm';
import CitiesList from './CitiesList';
import WeatherInfoItem from './WeatherInfoItem';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ciudadesList : [],
      citySearch : {
        nombreCiudad: "",
        temperature: "",
        error: ""
      }
     };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.updateCitySearchObject = this.updateCitySearchObject.bind(this);
  }

  handleAdd(ciudad){
    var ciudadNueva = {
        key : (new Date()).getTime(),
        cityText : ciudad.newItemValue
    };
    this.setState({
      ciudadesList: [...this.state.ciudadesList, ciudadNueva]
    });
  }

  handleRemove(itemIndex){
    var ciudadesCopy = [...this.state.ciudadesList];
    ciudadesCopy.splice(itemIndex, 1);
    this.setState({ciudadesList: ciudadesCopy});
  }

  updateCitySearchObject(citySearch){
    this.setState({ citySearch : citySearch });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Weather App</h1>
        </header>
        <AddForm handleAdd={this.handleAdd} updateCitySearchObject={this.updateCitySearchObject} />
        <WeatherInfoItem citySearch={this.state.citySearch}/>
        <CitiesList items={this.state.ciudadesList} handleRemove={this.handleRemove}/>
      </div>
    );
  }
}

export default App;
