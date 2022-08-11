import 'react-native-gesture-handler'; // please do not move this to the bottom. KEEP THIS ON VERY TOP
import store from './redux/store';
import { Provider } from 'react-redux';

import { LogBox, StatusBar } from 'react-native';
import Route from './Navigations/Route';


LogBox.ignoreAllLogs(true);


export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff00" translucent={true} />
      <Route />
    </Provider>

  );
}

// sms after payment