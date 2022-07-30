import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons'; 



const Splash = () => {

  const navigation = useNavigation();  

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home');

        }, 2000);
    }, []);

  return (
    <SafeAreaView style={styles.container}>
            <Animatable.View
            animation={zoomIn}
            delay={2000}
            duration={500}
            useNativeDriver
            >
                <Ionicons name='bus-sharp' size={240} color='#e1aD01' />
            </Animatable.View>



    </SafeAreaView>
  )
}

export default Splash


const zoomIn = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 0.5,
      scale: 5,
    },
    1: {
      opacity: 0,
      scale: 10,
    },
  };


const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
   },

   splashImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
   }

  });