import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

const Profile = () => {

  const user = useSelector(state => state.root.user)

  const navigation = useNavigation();

  const userFullName = user ? user.name : null;
  const userPhone = user ? user.phone : null;
  const userProfilePhoto = user ? user.profile.profile_picture : null;


  useEffect(() => {
    const log = navigation.addListener('focus', () => {
      console.log("Hello World")
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return log;
  }, [navigation]);



  return (

    <SafeAreaView style={styles.container}>

      <ScrollView>
        <View style={styles.contentContainer}>



          <View style={[styles.profileHeaderContainer,
          Platform.OS === 'ios' ? styles.shadow : null]}>
            <Image
              style={styles.profilePhoto}
              source={{
                uri: userProfilePhoto,
              }}
            />
            <View style={styles.profileHeaderInner}>
              <Text style={styles.profileName}>{userFullName}</Text>
              <Text style={styles.profileContact}>+91 {userPhone}</Text>
            </View>

            <TouchableOpacity style={styles.editProfileBtn}>
              <Text style={{ marginRight: 5, color: '#cf8300', fontWeight: '500', fontSize: 18 }}>Edit Profile</Text>
            </TouchableOpacity>

          </View>

          <View style={[styles.reservationStatusContainer,
          Platform.OS === 'ios' ? styles.shadow : null]}>
            <View style={styles.reservationStatusHeader}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6f6f6f' }}>Reservation</Text>
              <Feather name="check-circle" size={22} color="#6f6f6f" />
              {/* <Feather name="alert-circle" size={24} color="black" /> */}
            </View>
            <View style={styles.reservationStatusBody}>

              <View style={styles.containerAlignLeft}>
                <Text style={{ fontWeight: 'bold', color: '#6f6f6f' }}>Last Payment</Text>
                <Text>5 September, 2022</Text>
              </View>

              <View style={styles.containerAlignRight}>
                <Text style={{ fontWeight: 'bold', color: '#6f6f6f' }}>Valid Until</Text>
                <Text>5 October, 2022</Text>
              </View>

            </View>

          </View>

          <View style={[styles.pickupPointInfoContainer,
          Platform.OS === 'ios' ? styles.shadow : null]}>

            <View style={styles.pickupPointerHeader}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6f6f6f' }}>Pickup Point</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('SetPickUpPoint')}
              >
                <Feather name="edit-2" size={22} color="#cf8300" />
              </TouchableOpacity>

            </View>

            <View style={styles.pickupPointBody}>
              <Text>Shalateng, Srinagar 190012</Text>
            </View>


          </View>





          <View>

          </View>





        </View>
      </ScrollView>


    </SafeAreaView >
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',

  },

  contentContainer: {
    height: '100%',
    padding: 20,
  },

  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 999,
  },



  profileHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 15,
    elevation: 3
  },

  editProfileBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,

  },

  profilePhoto: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50
  },

  profileHeaderInner: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  profileName: { fontSize: 22, fontWeight: 'bold', color: '#6f6f6f' },
  profileContact: { fontSize: 16, color: '#6f6f6f', fontWeight: '600', marginTop: 2 },



  reservationStatusContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3

  },

  reservationStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  reservationStatusBody: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  containerAlignLeft: {
    alignItems: 'flex-start',
    textAlign: 'left'
  },

  containerAlignRight: {
    alignItems: 'flex-end',
    textAlign: 'right'
  },



  pickupPointInfoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3
  },


  pickupPointerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


  pickupPointBody: {
    marginTop: 10
  }



});