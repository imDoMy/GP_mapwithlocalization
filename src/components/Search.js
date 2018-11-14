import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { WriteReview, reviewUpdate, BusinessFetch, BusinessUpdate } from '../actions';
import { CardSection, Input } from './common';


class Search extends Component {

 state = { radius: 'all' };

  render() {
    return (
      <View>


        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>مساحة البحث حولك</Text>
          </CardSection>

          <CardSection style={{ marginLeft: 5, marginRight: 5, color: 'white' }}>
          <Picker
            style={{ flex: 1, height: 44 }}
            itemStyle={{ height: 44, borderWidth: 1 }}
            selectedValue={this.state.radius}
            onValueChange={radius => this.setState({ radius })}
          >
            <Picker.Item label="اظهر الكل" value="all" />
            <Picker.Item label="٥ كم" value="5" />
            <Picker.Item label="١٠ كم" value="10" />

          </Picker>
        </CardSection>
        <CardSection>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => Actions.map({ Markers: this.props.Markers, radius: this.state.radius })}
          >
          <Text style={styles.textStyle}> اضغط هنا لإرسال مراجعتك </Text>
        </TouchableOpacity>
</CardSection>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  },
  textStyle: {
    alignSelf: "center",
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5
  }
};



export default Search;
