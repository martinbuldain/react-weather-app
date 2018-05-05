import React from 'react';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citySearch : {
        nombreCiudad: "",
        temperature: "",
        error: ""
      }
    };
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  componentDidMount() {
    this.refs.inputRef.focus();
    let currentComponent = this;
    fetch('http://localhost:8080/weather/findAllCities')
    .then( response => {
      return response.json()
    })
    .then( data => {
      data.map( (item, index) => {
        var newItemValue = item.city;
        currentComponent.props.handleAdd({newItemValue});
        currentComponent.refs.form.reset();
      });
    })
    .catch(function(error) {
      alert('ERROR CARGANDO LA LISTA DE CIUDADES: ' + error.message);
    })
  }

  onClickSearch(e) {
    e.preventDefault();
    let currentComponent = this;
    if (!this.refs.inputRef.value) {
      return;
    } else {
      fetch('http://localhost:8080/weather/getForecast/'.concat(this.refs.inputRef.value))
      .then( response => {
        return response.json()
      })
      .then( data => {
        let cityTemporal = Object.assign({}, this.state.citySearch);
        cityTemporal.nombreCiudad = (data.query.results.channel[0].title).split("-")[1];
        cityTemporal.temperature = data.query.results.channel[0].item.forecast.high;
        cityTemporal.error = '';
        currentComponent.setState({ citySearch: cityTemporal });
        this.props.updateCitySearchObject(currentComponent.state.citySearch);
      })
      .catch(function(error) {
        alert('ERROR: ' + error.message);
        currentComponent.refs.form.reset();
        /*let cityTemporal = Object.assign({}, currentComponent.state.citySearch);
        currentComponent.setState({ citySearch: cityTemporal });
        cityTemporal.error = 'ERROR: ' + error.message;
        currentComponent.props.updateCitySearchObject(currentComponent.state.citySearch);*/
      })
    }
  }

  onClickAdd(e){
    e.preventDefault();
    let currentComponent = this;
    if (!this.refs.inputRef.value) {
      return;
    } else {
        fetch('http://localhost:8080/weather/addCity', {
            method: 'POST',
            headers : new Headers(),
            //body:JSON.stringify({city:this.refs.inputRef.value})
            body:this.refs.inputRef.value
        })
        .then( response => {
          return response.json()
        })
        .then( data => {
          var newItemValue = this.refs.inputRef.value;
          currentComponent.props.handleAdd({newItemValue});
          currentComponent.refs.form.reset();
        })
        .catch(function(error) {
          alert('ERROR: ' + error.message);
          currentComponent.refs.form.reset();
        });
    }
  }

  render () {
    return (
      <div className="panel panel-default">
      <form ref="form" className="margen form-inline">
        <input type="text" ref="inputRef" className="form-control" placeholder="Ingrese una ciudad..."
          onChange={this.handleChange} />
        <button onClick={this.onClickSearch} id="queryButton" type="submit" className="btn btn-default">
          <span className="glyphicon glyphicon-search"></span>
        </button>
        <button onClick={this.onClickAdd} id="addButton" type="submit" className="btn btn-default">
          <span className="glyphicon glyphicon-plus-sign"></span>
        </button>
      </form>
    </div>
    );
  }
}

export default AddForm;
