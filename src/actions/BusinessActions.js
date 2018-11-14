import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const BusinessesFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/Businesses')
      .on('value', snapshot => {
        dispatch({ type: 'BUSINESSES_FETCH_SUCCESS', payload: snapshot.val() });
      });
  };
};

export const BusinessFetch = ({ uid }) => {
  return (dispatch) => {
    firebase.database().ref(`/Businesses/${uid}`)
      .on('value', snapshot => {
        dispatch({ type: 'BUSINESS_FETCH_SUCCESS', payload: snapshot.val() });
      });
  };
};

export const BusinessUpdate = ({ uid, total_rates, number_of_rates, rateing_image }) => {
  return () => {
    firebase.database().ref(`/Businesses/${uid}`)
      .update({ total_rates, number_of_rates, rateing_image })
      .then(() => {
        Actions.pop();
      });
  };
};
