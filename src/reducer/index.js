import { combineReducers } from 'redux';
import BusinessesReducer from './BusinessesReducer';
import BusinessReducer from './BusinessReducer';
import AuthReducer from './AuthReducer';
import ReviewFormReducer from './ReviewFormReducer';
import ReviewsReducer from './ReviewsReducer';


export default combineReducers({
  auth: AuthReducer,
  businesses: BusinessesReducer,
  business: BusinessReducer,
  reviewForm: ReviewFormReducer,
  reviews: ReviewsReducer
});
