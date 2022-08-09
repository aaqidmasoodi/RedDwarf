import 'react-native-gesture-handler'; // please do not move this to the bottom. KEEP THIS ON VERY TOP
import store from './redux/store';
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

