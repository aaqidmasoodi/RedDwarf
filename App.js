import store from './redux/store';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { LogBox } from 'react-native';
import Route from './Navigations/Route';


LogBox.ignoreAllLogs(true);


export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>

  );
}

