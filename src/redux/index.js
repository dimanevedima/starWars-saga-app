import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';

import rootReducer, {history} from './reducers';
import rootSaga from './sagas';



const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history))));

sagaMiddleware.run(rootSaga);

export default store;
