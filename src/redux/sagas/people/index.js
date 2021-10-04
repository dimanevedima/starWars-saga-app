// eslint-disable-next-line
import {
take,
takeEvery,
put,
call,
fork,
select,
apply,
} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'connected-react-router';
import { matchPath } from "react-router";

import {
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
} from '../../reducers/people/actions';

import {
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_SUCCESS,
  LOAD_USER_DETAILS_FAILURE,
} from '../../reducers/peopleDetails/actions';

import {getRouteConfig, MAIN_ROUTE, PEOPLE_DETAILS_ROUTE} from '../../../routes';

//workers

export function* loadPeopleList( {payload} ){
  // загружаем список людей
  const {page, search} = payload; // отдельная страница и поиск
  //console.log(page, search);
    try {
      const request = yield call(
        fetch,
        `https://swapi.dev/api/people?page=${page}&search=${search}`,
      );
      const data = yield apply(request, request.json);

      // добавим данные в стор
      yield put({
          type: LOAD_USERS_SUCCESS,
          payload: data,
      });
    } catch (e) {
      yield put({
          type: LOAD_USERS_FAILURE,
          payload: e,
      });
    };

};

// takeEvery прокидывает type и payload внутрб саг
export function* loadPeopleDetails({payload}){
  // загружаем отдельного человека
  const {id} = payload;

  try {
          const request = yield call(
            fetch,
            `https://swapi.dev/api/people/${id}`,
          );

          const data = yield apply(request, request.json);

          // добавим данные в стор
          yield put({
              type: LOAD_USER_DETAILS_SUCCESS,
              payload: data,
          });
  } catch (e) {
            yield put({
                type: LOAD_USER_DETAILS_FAILURE,
                payload: e,
            });
  };

};

//watcher

//Запускать вотчер при входе
export function* loadChangeSaga(){
  while(true){
    const action = yield take(LOCATION_CHANGE);

  // Некрасивый способ
  // if(action.payload.location.pathname === '/'){
  //       const state = yield select(state => state.people);
  //       const {page, search} = state;
  //       yield put({
  //         type: LOAD_USERS,
  //         payload: {
  //           page,
  //           search,
  //         }
  //       });
  //   };

  //console.log(matchPath(action.payload.location.pathname)); //Object { id: "MAIN_ROUTE", path: "/", exact: true }

  //matchPath принимает что нам нужно сверить и конфиг роутера
  // если пути совпадают то тру
  if(matchPath(action.payload.location.pathname, getRouteConfig(MAIN_ROUTE))){
        const state = yield select(state => state.people);
        const {page, search} = state;
        yield put({
          type: LOAD_USERS,
          payload: {
            page,
            search,
          }
        });
    };

    const detailsPage = matchPath(action.payload.location.pathname, getRouteConfig(PEOPLE_DETAILS_ROUTE));
    //console.log(detailsPage); конфиг или null

    if(detailsPage){
      //console.log('detailsPage');
      const {id} = detailsPage.params;

      if(id){
        yield put({
          type: LOAD_USER_DETAILS,
          payload: {
            id,
          }
        });
      };
    };

  };
};

export default function* peopleSaga(){
  yield fork(loadChangeSaga);
  yield takeEvery(LOAD_USERS, loadPeopleList);
  yield takeEvery(LOAD_USER_DETAILS, loadPeopleDetails);
};
