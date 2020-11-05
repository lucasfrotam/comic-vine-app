import { all } from 'redux-saga/effects';
import charactersSagas from './characters/saga';

export default function* rootSaga() {
  yield all([
    charactersSagas(),
  ]);
}
