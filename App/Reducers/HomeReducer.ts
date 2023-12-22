import {
  HOME_CATEGORY,
  HOME_CATEGORY_SUCCESS,
  HOME_CATEGORY_ERROR,
} from '@Keys/index';
import DefaultState from '@Default/index';
import { HomeDefault } from '@Default/HomeDefault';

const INIT_STATE = DefaultState.home;

const HomeReducer = (state = INIT_STATE, action: any): HomeDefault => {
  switch (action.type) {
    case HOME_CATEGORY:
      return state;
    case HOME_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };
    case HOME_CATEGORY_ERROR:
      return state;
    default:
      return state;
  }
};

export default HomeReducer;
