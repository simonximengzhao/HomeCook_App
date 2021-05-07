import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import history from './history';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <div>
              <Main />
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
