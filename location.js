import React, { Component } from 'react';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 0,
      accuracy: 0
    }
  }

  updateLocation = () => {
    navigator.geolocation.getCurrentPosition(
    position => {
      this.setState({ lat: position.coords.latitude, long: position.coords.longitude, accuracy: position.coords.accuracy});
    },
    error => console.log(error)
    );
  }

  render() {
    return (
      <div>
        <h1> Your Location </h1>
        <p> Lat: {this.props.lat} long {this.props.long} accuracy: {this.props.accuracy} </p>
      </div>
    )
  };
}

export default Location;
