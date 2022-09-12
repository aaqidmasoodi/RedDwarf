import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';


import { useNavigation } from '@react-navigation/native';
const Settings = () => {

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.listHeader}>
                <Text style={styles.settingsHeader}>Settings</Text>

            </View>
            <ScrollView>
                <View style={styles.contentContainer}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SelectBus')}
                        style={[styles.settingsOptionBtn,
                        Platform.OS === 'ios' ? styles.shadow : null]}>
                        <View style={styles.settingOption}>
                            <Ionicons name='bus-sharp' size={22} color='#cf8300' />
                            <Text style={styles.settingsOptionText}>
                                Change Bus
                            </Text>
                        </View>

                        <></>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Settings

const styles = StyleSheet.create({

    shadow: {
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 999,
    },


    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',

    },

    contentContainer: {
        height: '100%',
        padding: 20,
    },

    listHeader: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },

    settingsHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#cf8300'
    },


    settingsOptionBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        elevation: 1
    },

    settingOption: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    settingsOptionText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6f6f6f'
    }

})