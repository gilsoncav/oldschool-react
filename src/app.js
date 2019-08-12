import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes/routes';
import { history, store } from './store';
import { GlobalStyle } from './styles';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    </>
  );
}
