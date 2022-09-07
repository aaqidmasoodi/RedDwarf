import 'react-native-gesture-handler'; // please do not move this to the bottom. KEEP THIS ON VERY TOP
import store from './redux/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { LogBox, StatusBar } from 'react-native';
import Route from './Navigations/Route';

import * as LIVE_LOCATION_SOCKET from './api/Sockets/liveLocationSocket'

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