// eslint-disable-next-line
import {
spawn,
all,
} from 'redux-saga/effects';

import peopleSaga from './people';

export default function* rootSaga(){

  //yield console.log('SAGA');

  const sagas = [peopleSaga];

  // Распределенно запускаем все саги
  // и ждем их запуска с помощью метода all
  yield all(sagas.map(saga => spawn(saga)));

};
