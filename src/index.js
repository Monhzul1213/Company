import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import 'antd/dist/antd.less';
import './i18n';
import './index.css';
import { App as Screen } from './App';
import { Loading } from './pages';
import { store, persistor } from './helpers/store';


function App(){
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Screen />
      </PersistGate>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));