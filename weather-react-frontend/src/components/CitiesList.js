import React from 'react';
import CityListItem from './CityListItem';

class CitiesList extends React.Component {
  render () {
      var items = this.props.items.map((item, index) => {
        return (
          <CityListItem key={index} item={item} index={index} handleRemove={this.props.handleRemove} />
        );
      });
      return (
        <ul className="list-group"> {items} </ul>
      );
    }
}

export default CitiesList;
