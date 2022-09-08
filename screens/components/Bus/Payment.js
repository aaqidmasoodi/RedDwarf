import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useStripe } from '@stripe/stripe-react-native'
import * as Animatable from 'react-native-animatable';
import { BASE_URL } from '../../../api/config'
import { useSelector } from 'react-redux';
const AnimatedTouchable = Animatable.createAnimatableComponent(TouchableOpacity);


const Payment = (props) => {

  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.root.token)
  const user = useSelector(state => state.root.user);

  const attemptPayment = async () => {
    setIsLoading(true);
    try {

      const response = await fetch(`${BASE_URL}/payments/create-payment-intent/`, {
        method: "POST",
        body: JSON.stringify(
          {
            busFare: user?.bus?.fee,
            metadata: {
              userID: user?.id,
              userName: user?.name,
              phoneNumber: user?.phone,
              busNumber: user?.bus?.number
            }
          }),

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });


      const data = await response.json();
      if (!response.ok) {
        setIsLoading(false);

        return Alert.alert(data.message);
      }


      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'com.merchant.reddwarf',
      });



      if (initSheet.error) {
        setIsLoading(false);

        return Alert.alert(initSheet.error.message);
      }


      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });


      if (presentSheet.error) {

        setIsLoading(false);

        return Alert.alert(presentSheet.error.message);
      }


      setIsLoading(false);
      props.updateStatus(true);
      Alert.alert("Payment Successful. Thank you!");

    } catch (err) {
      console.error(err);
      setIsLoading(false);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <AnimatedTouchable
      animation={!isLoading ? 'pulse' : null}
      duration={500}
      iterationCount='infinite'
      iterationDelay={5000}
      style={styles.seatMakePayment}
      activeOpacity={0.9}
      onPress={attemptPayment}
      disabled={isLoading}
      useNativeDriver
    >
      {!isLoading && <Text style={{ fontSize: 22, fontWeight: '600', color: '#cf8300' }}>₹ Pay</Text>}
      {isLoading && <ActivityIndicator size="large" color="#cf8300" />}
    </AnimatedTouchable>
  )
}

export default Payment

const styles = StyleSheet.create({
  seatMakePayment: {
    flex: 1,
    marginTop: 5,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10

  }
})