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
  navigateToView(marker) {
  Actions.businessInner({ business: marker, initialPosition: this.state.initialPosition  });
  }
  renderMarker(marker) {
    const location = {
       coordinate: {
        latitude: marker.latitude,
        longitude: marker.longitude,
      }
    }
    return (
      <MapView.Marker
      coordinate={location.coordinate}
      >

      <MapView.Callout

      style={{ width: 150, height: 80
      }}>
        <View>
          <View>
            <Text>
              اسم المطعم:
            </Text>
            <Text>
          {marker.restaurant_name}
            </Text>
          </View>

          <View>
            <Text>
              خرااابييط
            </Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 120 }}>
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

      </MapView.Callout>
      </MapView.Marker>
    );
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
