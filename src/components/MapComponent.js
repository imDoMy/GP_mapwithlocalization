import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import MapView from 'react-native-maps';
import { CardSection, Input, Card } from './common';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapComponent extends Component {


  constructor() {
    super();
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      Markers: [{ coordinate: {
        latitude: 0,
        longitude: 46.76889,
      }
    }, { coordinate: {
      latitude: 254.774265,
      longitude: 46.738586,
    }
   }
  ]
    };
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({ initialPosition: initialRegion })
    },
    (error) => alert(JSON.stringify(error)),
    { enableHighAccuracy: true, timeout: 200000, maximumAge: 10000 });
  }


   getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km

  console.log('coords1');

  console.log(d);
  console.log('coords1');
  return d;
}

 deg2rad(deg) {
  return deg * (Math.PI/180)
}

  navigateToView(marker) {
    console.log(this.props.radius);

  Actions.businessInner({ business: marker, initialPosition: this.state.initialPosition  });
  }
  renderMarker(marker) {
    const location = {
       coordinate: {
        latitude: marker.latitude,
        longitude: marker.longitude,
      }
    };
    if (this.props.radius === undefined || this.props.radius === 'all') {
    return (
      <View>

      <MapView.Marker
      coordinate={location.coordinate}
      >

      <MapView.Callout

      style={{ width: 160, height: 115
      }}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ flexDirection: 'column' }}>
          <View>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
اسم المتجر :
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 12  }}>
          {marker.restaurant_name}
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
            نوع المتجر:
            </Text>

            <Text style={{ textAlign: 'right', fontSize: 12 }}>
            {marker.category}
            </Text>
            </View>
          </View>
          <View
  style={{
  borderLeftWidth: 1,
  borderLeftColor: 'black',
  marginLeft: 10
  }}
/>
  <View style={{ flexDirection: 'column' }}>
  <View style={{ marginLeft: 20 }}>
  <Image
    style={{ width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.image }}
  />
  </View>
  <View style={{ marginLeft: 10, marginTop: 5 }}>
  <Image
    style={{ width: 70,
    height: 30,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.rateing_image }}
  />
  </View>

  </View>
          </View>
          <View
  style={{
  borderBottomWidth: 1,
  borderBoColor: 'black',
  marginTop: 5
  }}
/>

          <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <View style={{ alignSelf: 'flex-end' }}>
           <TouchableOpacity onPress={() => this.navigateToView(marker)}>
           <Image
             style={{ width: 20,
             height: 20,
             borderWidth: 1,
             borderRadius: 10,
             }}
             source={{ uri:'https://thumb.ibb.co/mZ9YaA/if-arrow-right-01-186409.png' }}
           />

           </TouchableOpacity>
           </View>
           </View>

          </View>

      </MapView.Callout>
      </MapView.Marker>
      </View>
    );
  }
  if (this.getDistanceFromLatLonInKm(location.coordinate.latitude,location.coordinate.longitude, this.state.initialPosition.latitude, this.state.initialPosition.longitude ) <= this.props.radius) {
    return (
      <View>
      <MapView.Circle
   center={this.state.initialPosition }
   radius={(this.props.radius * 1000)}
   strokeWidth = { 1 }
   strokeColor = { '#1a66ff' }
   fillColor = {  'rgba(230,238,255,0.5)' }


/>
      <MapView.Marker
      coordinate={location.coordinate}
      >

      <MapView.Callout

      style={{ width: 160, height: 115
      }}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ flexDirection: 'column' }}>
          <View>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
اسم المتجر :
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 12  }}>
          {marker.restaurant_name}
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
            نوع المتجر:
            </Text>

            <Text style={{ textAlign: 'right', fontSize: 12 }}>
            {marker.category}
            </Text>
            </View>
          </View>
          <View
  style={{
  borderLeftWidth: 1,
  borderLeftColor: 'black',
  marginLeft: 10
  }}
/>
  <View style={{ flexDirection: 'column' }}>
  <View style={{ marginLeft: 20 }}>
  <Image
    style={{ width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.image }}
  />
  </View>
  <View style={{ marginLeft: 10, marginTop: 5 }}>
  <Image
    style={{ width: 70,
    height: 30,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.rateing_image }}
  />
  </View>

  </View>
          </View>
          <View
  style={{
  borderBottomWidth: 1,
  borderBoColor: 'black',
  marginTop: 5
  }}
/>

          <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <View style={{ alignSelf: 'flex-end' }}>
           <TouchableOpacity onPress={() => this.navigateToView(marker)}>
           <Image
             style={{ width: 20,
             height: 20,
             borderWidth: 1,
             borderRadius: 10,
             }}
             source={{ uri:'https://thumb.ibb.co/mZ9YaA/if-arrow-right-01-186409.png' }}
           />

           </TouchableOpacity>
           </View>
           </View>

          </View>

      </MapView.Callout>
      </MapView.Marker>
      </View>

    );
  }
  }

  renderScreen = () => {

          return (
        <View style={styles.container}>
        { this.state.initialPosition.latitude &&
          <MapView
            style={styles.map}
            showsUserLocation
            followsUserLocation
            userLocationAnnotationTitle='موقعي الحالي'
            initialRegion={this.state.initialPosition}
          >


          {this.props.Markers.map((marker) => (
          this.renderMarker(marker)

          ))}

            </ MapView>
          }
        </View>
      );
  }

  render() {
    return (
      this.renderScreen()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
},
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MapComponent;


 // <View style={{ flexDirection: 'row', marginLeft: 120 }}>
 //  <TouchableOpacity onPress={() => this.navigateToView(marker)}>
 //  <Image
 //    style={{ width: 20,
 //    height: 20,
 //    borderWidth: 1,
 //    borderRadius: 10,
 //    }}
 //    source={{ uri:'https://thumb.ibb.co/mZ9YaA/if-arrow-right-01-186409.png' }}
 //  />
 //
 //  </TouchableOpacity>
 //  </View>
