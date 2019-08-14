import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import RootReducer from './reducers';
import RootSagas from './sagas';

export const history = createBrowserHistory();

/* For Github Pages
export const history = createBrowserHistory({
  basename: '/oldschool-react/',
});
*/

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  RootReducer(history),
  compose(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(RootSagas);
