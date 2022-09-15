import 'react-native-gesture-handler'; // please do not move this to the bottom. KEEP THIS ON VERY TOP
import store from './redux/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { LogBox, StatusBar } from 'react-native';
import Route from './Navigations/Route';
import Sockets from './api/Sockets/Sockets';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs(true);


export default function App() {

  return (

    <Provider store={store}>
      <Sockets>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff00" translucent={true} />
        <Route />
      </Sockets>
      <Toast
        position='bottom'
        bottomOffset={80}
      />
    </Provider>

  );
}