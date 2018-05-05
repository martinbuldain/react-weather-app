import React from 'react';

class CityListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
  }

  onClickClose() {
    var index = parseInt(this.props.index);
    let currentComponent = this;
    fetch('http://localhost:8080/weather/deleteCity', {
        method: 'POST',
        headers : new Headers(),
        body:this.props.item.cityText
    })
    .then( response => {
      return response.json()
    })
    .then( data => {
      currentComponent.props.handleRemove(index);
    })
    .catch(function(error) {
      alert('ERROR BORRANDO LA CIUDAD: ' + error.message);
    });
  }

  render () {
    return(
      <li className="list-group-item ">
        <div>
          {this.props.item.cityText}
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>
    );
  }
}

export default CityListItem;
