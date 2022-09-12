import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useStripe } from '@stripe/stripe-react-native'
import * as Animatable from 'react-native-animatable';
import { BASE_URL } from '../../../api/config'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/slices/rootSlice';
import { setPayments, setLoadingPayments } from '../../../redux/slices/paymentsSlice'
import Toast from 'react-native-toast-message'
import api from '../../../api/config'
const AnimatedTouchable = Animatable.createAnimatableComponent(TouchableOpacity);


const Payment = () => {

  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.root.token)
  const user = useSelector(state => state.root.user);


  const dispatch = useDispatch();

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

      api.get('/accounts/user-info/', {
        headers: { Authorization: `Token ${token}` }
      })
        .then(res => {
          dispatch(setUser(res.data))
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        })


      api.get('/payments/', {
        headers: { Authorization: `Token ${token}` }
      })
        .then(res => {
          dispatch(setPayments(res.data));
          dispatch(setLoadingPayments(false));
        })
        .catch(err => {
          console.log(err.response);
          dispatch(setLoadingPayments(false));
          setIsLoading(false);
        })


      Toast.show({
        type: 'success',
        text1: 'Payment Successful.',
        text2: `New payment reciept has been added to your profile.`,
      });

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