import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


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


      <View style={styles.profileHeaderContainer}>
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

      </View>


    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,

  },

  profileHeaderContainer: {
    flexDirection: 'row',
  },

  profilePhoto: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50
  },

  profileHeaderInner: {
    padding: 25
  },

  profileName: { fontSize: 24, fontWeight: 'bold', color: '#6f6f6f' },
  profileContact: { fontSize: 16, color: '#6f6f6f', fontWeight: '600', marginTop: 2 },

});