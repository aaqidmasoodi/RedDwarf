import React from 'react'
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/rootSlice';


const CustomDrawer = (props) => {

    const user = useSelector(state => state.root.user)

    const userFullName = user ? user.name : null;
    const userPhone = user ? user.phone : null;
    const userProfilePhoto = user ? user.profile.profile_picture : null;


    const dispatch = useDispatch();
    return (

        <View style={styles.drawerWrapper}>

            <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerScrollViewContainer}>

                <ImageBackground source={require("../../assets/app/drawerBackground.png")} style={styles.drawerBackground}>

                    <Image source={{
                        uri: userProfilePhoto,
                    }} style={styles.drawerProfilePicture} />

                    <Text style={styles.drawerUsername}>{userFullName}</Text>
                    <Text style={styles.drawerPhoneNumber}>+91 {userPhone}</Text>

                </ImageBackground>

                <View style={styles.drawerItemsContainer}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            <View style={styles.bottomDrawerView}>
                <TouchableOpacity onPress={() => { }} style={styles.drawerBottomBtn}>
                    <View style={styles.drawerBottomBtnInnerContainer}>

                        <Ionicons name="share-social-sharp" size={24} />
                        <Text style={{ marginLeft: 6, fontWeight: '700', fontSize: 15, color: '#4f4f4f' }}>Tell a friend</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(logout())} style={styles.drawerBottomBtn}>
                    <View style={styles.drawerBottomBtnInnerContainer}>

                        <Ionicons name="exit-sharp" size={24} color={'#b23b3b'} />
                        <Text style={{ marginLeft: 6, fontWeight: '700', fontSize: 15, color: '#b23b3b' }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({

    drawerWrapper: {
        flex: 1
    },

    drawerScrollViewContainer: {
        backgroundColor: '#ffffff'
    },

    drawerBackground: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },

    drawerProfilePicture: {
        height: 80,
        width: 80,
        borderRadius: 40,
        resizeMode: 'cover',
        marginBottom: 20
    },

    drawerUsername: {
        color: '#1f1f1f',
        fontSize: 18,
        fontWeight: 'bold'
    },

    drawerItemsContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 10
    },

    bottomDrawerView: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },

    drawerBottomBtn: {
        paddingVertical: 15
    },

    drawerBottomBtnInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})