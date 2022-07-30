import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Splash from './screens/Splash';

import Dashboard from './screens/Dashboard';
import Bus from './screens/Bus';
import QRCode from './screens/QRCode';
import Profile from './screens/Profile';
import Map from './screens/Map';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <SafeAreaProvider>


    <Tab.Navigator

    initialRouteName='Dashboard'

    screenOptions={({ route }) => ({
      headerShown: false,

      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = focused ? 'home-sharp' : 'home-outline';
        } else if (route.name === 'Bus') {
          iconName = focused ? 'bus-sharp' : 'bus-outline';
        } else if (route.name === 'QRCode') {
          iconName = focused ? 'qr-code-sharp' : 'qr-code-outline'
        } else if (route.name === 'Profile') {
          iconName = focused ? 'card-sharp' : 'card-outline'
        }

        
        return <Ionicons name={iconName} size={28} color={color} />;
      },
      
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false,

    })}
    >



    <Tab.Screen name="Dashboard" component={Dashboard} />
    <Tab.Screen name="Bus" component={Bus} />
    <Tab.Screen name="QRCode" component={QRCode} />
    <Tab.Screen name="Profile" component={Profile} />




    </Tab.Navigator>
    </SafeAreaProvider>
  )
}

const RootStack = createStackNavigator();


const RootNav = () => {
  return (
    <RootStack.Navigator
        initialRouteName='Splash'

        >
          <RootStack.Screen
            name='Splash'
            component={Splash}
            options={{
              headerShown:false
            }}
          />

          <RootStack.Screen
            name='Home'
            component={HomeTabs}
            options={{
              headerShown:false
            }}
          />

            <RootStack.Screen
            name='Map'
            component={Map}
            options={{
              headerShown: false
            }}
            />


        </RootStack.Navigator>
  )
}


export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>

              
              <RootNav/>
            

        </NavigationContainer>
    </Provider>
    
  );
}

