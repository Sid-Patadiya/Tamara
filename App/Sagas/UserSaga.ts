import { put } from 'redux-saga/effects';
import { getHomeCategoryServices } from '@Services/UserService';
import { HOME_CATEGORY_SUCCESS, HOME_CATEGORY_ERROR } from '@Keys/index';

export function* getUserSaga(action: any) {
  try {
    // Here call Service from UserService
    console.log('action',action);
  } catch (error) {}
}

export function* getHomeCategory(): any {
  try {
    const response = yield getHomeCategoryServices();
    if (response) {
      let payload = response.data;
      yield put({ type: HOME_CATEGORY_SUCCESS, payload });
    }
  } catch (error: any) {
    console.log(error);
    yield put({ type: HOME_CATEGORY_ERROR, payload: error?.data });
  }
}
