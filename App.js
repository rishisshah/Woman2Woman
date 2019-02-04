import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Location from './location';

const accountSid = 'AC0edd593c1538f26ac5c7614c6b228960';
const authToken = '05fbbc9f4e8a865a73dd24dadbd5b321';
//const client = require('twilio')(accountSid, authToken);
const numbers = ['+14156021780', '+15629648990'];
const serviceSid = 'MG3500f685e3a338dbab557a2def49a66f';
//const twilio = require('twilio')(
  //accountSid, authToken);
// var lat1 = 34.4162304;
// var long1 = -119.844864;
// var lat = convertToDms(lat1, false);
// var long = convertToDms(long1, true);
//
// var gmapurl = `https://www.google.com/maps/place/${lat}+${long}/@${lat1},${long1},20z`;
// const gKey = 'AIzaSyCuk-H3lskza4QW9JV4pvWP1Z-gE8DsZq4';
// const goodshit = '3f3dc4eb2aa913623458390a73c51bfdf0370cff'
//
// var axios = require('axios');
// axios.post('https://api-ssl.bitly.com/v4/shorten', {
//   'long_url': gmapurl
// }, {
//   headers: {
//     'Authorization': "Bearer " + goodshit,
//     'Content-Type': 'application/json',
//   }
// })
// .then(function (response) {
//   message(response.data.link);
// })
// .catch(function (error) {
//   console.log(error);
// });
//
// function message(url){
//   Promise.all(
//     numbers.map(number => {
//       console.log(number)
//       return twilio.messages.create({
//         to: number,
//         from: serviceSid,
//         body: `Help! ${url}`
//       });
//     })
//   )
//   .then(messages => {
//     console.log('Messages Sent');
//   })
//   .catch(err => console.error(err))
// }
//
// function convertToDms(dd, isLng) {
//   var dir = dd < 0
//     ? isLng ? 'W' : 'S'
//     : isLng ? 'E' : 'N';
//
//   var absDd = Math.abs(dd);
//   var deg = absDd | 0;
//   var frac = absDd - deg;
//   var min = (frac * 60) | 0;
//   var sec = frac * 3600 - min * 60;
//   sec = Math.round(sec * 100) / 100;
//   return deg + "°" + min + "'" + sec + '"' + dir;
// }


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [],
      number: "",
      lat: 0,
      long: 0,
      accuracy: 0,
      users: [],
      closeUsers: [],
      test: 0,
      message: "",
      distance: 100
    }

    let coords = [];
  }

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyCdfKsagen0HrHGvIrCc-hGiNaQ8Pm2b9c",
      authDomain: "sb-hacks-2019-228405.firebaseapp.com",
      databaseURL: "https://sb-hacks-2019-228405.firebaseio.com",
      projectId: "sb-hacks-2019-228405",
      storageBucket: "sb-hacks-2019-228405.appspot.com",
      messagingSenderId: "38962198313"
    };
    firebase.initializeApp(config);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch()
  }

  componentDidUpdate(props) {
    // if (this.state.users !== props.users && this.state.lat !== props.lat && this.state.long !== props.long && this.state.message !== props.message) {
    //   this.sendText();
    // }
  }

  updateNumber = (event) => {
    this.setState({ number: event.target.value });
  }

  updateMessage = (event) => {
    this.setState ({ message: event.target.value});
  }

  addPhone = () => {
    let number = this.state.number;
    let numbers = [];
    if (!number || number.length < 10) {
      alert("Please enter a valid phone number");
    } else {
      setInterval(function() {
        console.log(number);
        if ("geolocation" in navigator) {
          numbers.push(number);
          navigator.geolocation.getCurrentPosition(function(position) {
            firebase.firestore().collection("phones").doc(number).set({
              lat: position.coords.latitude,
              long: position.coords.longitude
            })
              .then(function() {
                  console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          });
        } else {
          console.log("Geolocation'nt")
        }
      }, 3000);
    }
  }

  //------------------------\\



  //------------------------\\

  getInfo = () => {
    this.getCoords();
  }

  updateLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude, long: position.coords.longitude, accuracy: position.coords.accuracy});
      },
      error => console.log(error)
      );
    }
  }

  getCoords = () => {
    let data = [];

    if ("geolocation" in navigator) {
      console.log(this.coords);
      navigator.geolocation.getCurrentPosition(function(position) {
        data.push(position.coords.latitude);
        data.push(position.coords.longitude);
        console.log(data);
      })
    } else {
      console.log("Couldn't get current coordinates");
    }
  }

  getUsers = () => {
    let newUsers = [];
    firebase.firestore().collection("phones").get().then(function(snapshot) {
      snapshot.forEach(function(user) {
        newUsers.push([user.id, user.data()]);
      })
    })

    //console.log(newUsers)
    this.setState({
      users: newUsers
    })
    //console.log("getUsers: ", this.state.users);
  }


  // getDistance = (lat1, lon1, lat2, lon2, unit) => {
  // 	if ((lat1 === lat2) && (lon1 === lon2)) {
  // 		return 0;
  // 	}
  // 	else {
  // 		var radlat1 = Math.PI * lat1/180;
  // 		var radlat2 = Math.PI * lat2/180;
  // 		var theta = lon1-lon2;
  // 		var radtheta = Math.PI * theta/180;
  // 		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  // 		if (dist > 1) {
  // 			dist = 1;
  // 		}
  // 		dist = Math.acos(dist);
  // 		dist = dist * 180/Math.PI;
  // 		dist = dist * 60 * 1.1515;
  // 		if (unit=="K") { dist = dist * 1.609344 }
  // 		if (unit=="N") { dist = dist * 0.8684 }
  // 		return dist;
  // 	}
  // }

  getCloseUsers = () => {
    let newCloserUsers = [];
    let lat1 = this.state.lat;
    let lon1 = this.state.long;

    this.state.users.forEach(function(user) {
      let lat2 = user[1].lat;
      let lon2 = user[1].long;
      newCloserUsers.push(user[0])
      if ((lat1 === lat2) && (lon1 === lon2)) {
        newCloserUsers.push(user[0]);
      } else {
        //console.log(lat1, lat2, lon1, lon2);
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        newCloserUsers.push(user[0]);
      }
    })
    //console.log(newCloserUsers);
    this.setState({
      closeUsers: newCloserUsers
    })
    //console.log(this.state.closeUsers);
  }

  sendText = () => {
    //console.log(this.state.test);
    //console.log(this.state.users);
    //console.log(this.state.coords);
  }

  render() {

    let user_map = this.state.users.map((user, index) =>
      <p> {index} : {user} </p>
    )

    return (
      <div className="container">

        <form className="container form-group">
          <h2> Please enter your phone number below with only numbers (e.g. 3214567890) </h2>
          <input type="text" value={this.state.number} onChange={this.updateNumber} /><br/>
          <button className="btn btn-primary" type="button" onClick={this.addPhone}>
            Sign Up!
          </button>
        </form>


        <form className="container form-group">
          <h2> Please enter your message here </h2>
          <input type="text" value={this.state.message} onChange={this.updateMessage} /><br/>
          <button className="btn btn-primary" type="button" onClick={this.getCoords}>
            Generate Info
          </button>
        </form>

        <Location lat={this.state.lat} long={this.state.long} accuracy={this.state.accuracy} onClick={this.updateLocation()}/>

        <button onClick={this.getUsers}>
          Get Users
        </button>

        <button onClick={this.getCloseUsers}>
          Get Close Users
        </button>

        <button onClick={this.displayCloseUsers}>
          Display Close Users
        </button>

      </div>

    );
  }
}

export default App;
