import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { WriteReview, reviewUpdate, BusinessFetch, BusinessUpdate } from '../actions';
import { CardSection, Input } from './common';


class ReviewForm extends Component {

componentWillMount() {
  // here i took the uid of the business so i can fetch the data
  const { uid } = this.props.business;

//here we fetch the business data every time we render this component
// so we can get the newest total_rates and number_of_rates
  this.props.BusinessFetch({ uid });
}


  onButtonPress() {
  const { UserComment, rate, total_rates, number_of_rates } = this.props;
  const { uid } = this.props.business;
// here i fecht the data again just to make sure the data is here
this.props.BusinessFetch({ uid });

// here i creat a variable rateing_image to save the rating image in it
   var rateing_image;

//here im cheking the rate so i can give the review same rate as the user picked
  if (rate === '1') {
    rateing_image = 'https://i.postimg.cc/0KG3ynvz/1.png';
  }
  else if (rate === '2') {
    rateing_image = 'https://i.postimg.cc/yJwrhtYJ/2.png';
  }
  else if (rate === '3') {
    rateing_image = 'https://i.postimg.cc/BtGJ4wcQ/3.png';
  }
  else if (rate === '4') {
    rateing_image = 'https://i.postimg.cc/kBTCNMrB/4.png';
  }
  else if (rate === 'undefined' || '5') {
    rateing_image = 'https://i.postimg.cc/p5BGHdQ8/5.png';
  }
// here i creat this variable in case the user didnt move the picker
// if the user didnt move the picker ill make the new rate 5 as the default
  var protected_rate;
  if (rate === '1' || rate === '2' || rate === '3' || rate === '4' || rate === '5') {
  protected_rate = rate;
  } else {
    protected_rate = '5';

  }

// here all the calculation and casting for evaluate the new rate for the business
  const new_rate = parseInt(protected_rate, 10);
  const int_total_rates = parseInt(total_rates, 10);
  const int_number_of_rates = parseInt(number_of_rates, 10);
  const new_int_number_of_rates = int_number_of_rates + 1;
  const new_int_total_rates = int_total_rates + new_rate;
  const avg = new_int_total_rates/new_int_number_of_rates;
  const new_string_number_of_rates = new_int_number_of_rates.toString();
  const new_string_total_rates = new_int_total_rates.toString();
  var rateing_image1;

  //here im cheking the avarage so i can give the business new rate
  if (avg > 0 && avg <= 1) {
    rateing_image1 = 'https://i.postimg.cc/0KG3ynvz/1.png';
  }
  else if (avg > 1 && avg <= 2) {
    rateing_image1 = 'https://i.postimg.cc/yJwrhtYJ/2.png';
  }
  else if (avg > 2 && avg <= 3) {
    rateing_image1 = 'https://i.postimg.cc/BtGJ4wcQ/3.png';
  }
  else if (avg > 3 && avg <= 4) {
    rateing_image1 = 'https://i.postimg.cc/kBTCNMrB/4.png';
  }
  else if (avg > 4 && avg <= 5) {
    rateing_image1 = 'https://i.postimg.cc/p5BGHdQ8/5.png';
  }
// here im updating the business rate
this.props.BusinessUpdate({ uid, total_rates: new_string_total_rates, number_of_rates: new_string_number_of_rates, rateing_image: rateing_image1 })
// here im saving the review in the business and the user's Reviews
  this.props.WriteReview({ UserComment, uid, UserName: 'Domy', rateing_image, rate: rate || '5' });
}


  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="تعليق المستخدم"
            placeholder="اكتب مراجعتك هنا"
            value={this.props.UserComment}
            onChangeText={value => this.props.reviewUpdate({ prop: 'UserComment', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>التقييم:</Text>
          </CardSection>

          <CardSection style={{ marginLeft: 5, marginRight: 5, color: 'white' }}>
          <Picker
            style={{ flex: 1, height: 44 }}
            itemStyle={{ height: 44, borderWidth: 1 }}
            selectedValue={this.props.rate}
            onValueChange={value => this.props.reviewUpdate({ prop: 'rate', value })}
          >
            <Picker.Item label="5" value="5" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="1" value="1" />
          </Picker>
        </CardSection>

        <CardSection>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onButtonPress.bind(this)}
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

const mapStateToProps = (state) => {
  const { UserComment, rate } = state.reviewForm;

  const { total_rates, number_of_rates } = state.business;

  return { UserComment, rate, total_rates, number_of_rates };
};

export default connect(mapStateToProps, { WriteReview, reviewUpdate, BusinessFetch, BusinessUpdate })(ReviewForm);
