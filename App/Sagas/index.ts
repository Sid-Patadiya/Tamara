import { takeLatest } from 'redux-saga/effects';
import { GET_USER, HOME_CATEGORY } from '@Keys/index';
import { getUserSaga, getHomeCategory } from '@Sagas/UserSaga';

export default function* rootSaga() {
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(HOME_CATEGORY, getHomeCategory);
}
