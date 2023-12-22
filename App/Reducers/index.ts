import { combineReducers } from 'redux';
import UserReducer from '@Reducers/UserReducer';
import HomeReducer from '@Reducers/HomeReducer';

export default combineReducers({
  user: UserReducer,
  home: HomeReducer,
});
