import { all, call, fork, put, takeLeading, select, delay } from 'redux-saga/effects';
import * as ComicVineAPI from 'services/ComicVineAPI';
import * as actions from './actions';
import * as selectors from './selectors';
import { Types, Search } from './types';

function* handleGetCharacters() {
  try {
    const search = yield select(selectors.getSearch);
    const favoriteMode = yield select(selectors.getFavoritesVisibility);
    if (search.characters.length || favoriteMode) {
      return;
    }

    const { totalCharacters, totalResults } = yield select(selectors.getTotals);
    if (totalResults === totalCharacters && totalCharacters !== 0) return;
    yield put(actions.enableLoading());

    const limit = 20;
    const response = yield ComicVineAPI.getComicData(limit, totalCharacters);
    response.data.results.map(item => item.favorite = false);

    yield put(actions.requestSuccess({
      characters: response.data.results,
      totalCharacters: response.data.number_of_page_results,
      totalResults: response.data.number_of_total_results,
    }));

    yield delay(500);
    yield put(actions.disableLoading());
  } catch (error) {
    yield put(actions.requestError(error.message));
  }
}

function* handleSearch({ payload }) {
  try {
    yield put(actions.enableSearchLoading());
    if (!payload.name) {
      yield put(actions.disableSearchLoading());
      return yield put(actions.clearSearch());
    }

    yield call(actions.enableLoading);

    const response = yield ComicVineAPI.searchCharacter(payload.name);
    yield put(actions.searchSuccess({
      characters: response.data.results,
      totalCharacters: response.data.number_of_page_results,
      totalResults: response.data.number_of_total_results,
    }));
    yield delay(500);
    yield put(actions.disableSearchLoading());
  } catch (error) {
    yield put(actions.requestError(error.message));
  }
};

function* watchGetCharacters() {
  yield takeLeading(Types.REQUEST, handleGetCharacters);
}

function* watchSearch() {
  yield takeLeading<Search>(Types.SEARCH, handleSearch);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetCharacters),
    fork(watchSearch),
  ]);
}