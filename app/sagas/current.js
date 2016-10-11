import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setSaved } from '../actions/current';
import { setLogo } from '../services/logo';
import inject from '../services/inject';
import { addDoc, persistIndex } from '../services/elasticlunr';
import { hashCode } from '../services/util';

function* savePageSaga() {
  yield call(inject);
  yield put(setSaved(true));
}

// TODO BUG handle Tab change to update logo
function* handleLogoSaga(action) {
  yield call(setLogo, action.saved);
}

function* handleExtractionSaga() {
  // TODO put it in a dedicated file
  const extraction = yield select(state => state.current.get('extraction').toJS());

  // TODO filter in a transformer
  // TODO BUG store url in extraction from inject
  const doc = _.merge(
    _.pick(extraction, ['title', 'author', 'description', 'text',
      'publisher', 'canonicalLink']),
    {
      url: extraction.canonicalLink,
      id: hashCode(extraction.canonicalLink),
    }
  );
  doc.authors = doc.author.join(' ');

  yield call(addDoc, doc);
  yield call(persistIndex);
}

export default function* () {
  yield [
    takeLatest(ActionTypes.SAVE_PAGE, savePageSaga),
    takeLatest(ActionTypes.SET_EXTRACTION, handleExtractionSaga),
    takeLatest(ActionTypes.SET_SAVED, handleLogoSaga),
  ];
}
