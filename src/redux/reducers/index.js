import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory  } from 'history';

import appReducer from './app';
import peopleReducer from './people';
import peopleDetailsReducer from './peopleDetails';

export const history = createBrowserHistory();

export default combineReducers({
  app: appReducer,
  people: peopleReducer,
  details: peopleDetailsReducer,
  router: connectRouter(history),
});
