import React, { Component } from 'react';
import { ListView, Text, View,ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import AlbumDetail from './AlbumDetail';
import { BusinessesFetch } from '../actions';
import { CardSection, Card, Spinner } from './common';


class AlbumList extends Component {

  componentWillMount() {
      this.props.BusinessesFetch();
      this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
      // nextProps are the next set of props that this component
      // will be rendered with
      // this.props is still the old set of props

      this.createDataSource(nextProps);
    }

    createDataSource({ businesses }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.dataSource = ds.cloneWithRows(businesses);
  }
  renderRow(business) {
      return <AlbumDetail business={business} />;
  }
  renderButton() {
    if (!(_.isEmpty(this.props.businesses))) {
      return (
        <View>
      <CardSection>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => Actions.map({ Markers: this.props.businesses })}
      >
        <Text style={styles.textStyle}>
        اضغط هنا لرؤية المتاجر على الخريطة

        </Text>
      </TouchableOpacity>
      </CardSection>

      <CardSection>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => Actions.search({ Markers: this.props.businesses })}
      >
        <Text style={styles.textStyle}>
اضغط هنا للبحث عن متجر
        </Text>
      </TouchableOpacity>
      </CardSection>
      </View>

    );
  }
  return <Spinner size="large" style={{ marginTop: 200 }} />;
  }

// renderBusinesses() {
//   return this.props.libraries.map(lib =>
//     <AlbumDetail key={lib.Id} record={lib} />
//   );
// }

  render() {
    return (
      <ScrollView>

{ this.renderButton()
}
  <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
  />


      </ScrollView>

);
}
}

const MapStateTpProps = state => {
  const businesses = _.map(state.businesses, (val, uid) => {
    return { ...val, uid };
});
  return { businesses };
};

const styles = {
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
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};
export default connect(MapStateTpProps, { BusinessesFetch })(AlbumList);
