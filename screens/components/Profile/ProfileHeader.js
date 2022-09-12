import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const ProfileHeader = () => {

    const user = useSelector(state => state.root.user)


    return (
        <View style={[styles.profileHeaderContainer,
        Platform.OS === 'ios' ? styles.shadow : null]}>
            <Image
                style={styles.profilePhoto}
                source={{
                    uri: user?.profile?.profile_picture,
                }}
            />
            <View style={styles.profileHeaderInner}>
                <Text style={styles.profileName}>{user?.name}</Text>
                <Text style={styles.profileContact}>+91 {user?.phone}</Text>
            </View>

            <TouchableOpacity style={styles.editProfileBtn}>
                <Text style={{ marginRight: 5, color: '#cf8300', fontWeight: '500', fontSize: 18 }}>Edit Profile</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({

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
})