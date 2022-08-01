import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useStripe } from '@stripe/stripe-react-native'
import * as Animatable from 'react-native-animatable';

const AnimatedTouchable = Animatable.createAnimatableComponent(TouchableOpacity);
const Payment = (props) => {

  const stripe = useStripe();

  const attemptPayment = async () => {
    try {
      // sending request
      const response = await fetch("http://10.0.2.2:3000/api/accounts/create-payment-intent/", {
        method: "POST",
        body: JSON.stringify({ item: 'item' }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'com.merchant.reddwarf'
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment complete, thank you!");
      props.updateStatus(true);
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <AnimatedTouchable
      animation={'pulse'}
      duration={500}
      iterationCount='infinite'
      iterationDelay={5000}
      style={styles.seatMakePayment}
      activeOpacity={0.9}
      onPress={attemptPayment}
      useNativeDriver
    >
      <Text style={{ fontSize: 22, fontWeight: '600', color: '#009ACD' }}>₹ Pay</Text>
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