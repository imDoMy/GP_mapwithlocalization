import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = (props) => {
  return (
  <View style={[{ justifyContent: 'center', alignItems: 'center', flex: 1 }, props.style]}>
  <ActivityIndicator size={props.size || 'large'} />
  </View>
);
};

export { Spinner };
