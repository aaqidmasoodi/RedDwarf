import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
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
                        style={styles.settingsOptionBtn}>
                        <Text style={styles.settingsOptionText}>
                            Change Bus
                        </Text>
                        <MaterialIcons name="navigate-next" size={28} color="#6f6f6f" />
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Settings

const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#ffffff',

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
        backgroundColor: '#ffffff',
    },

    settingsOptionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6f6f6f'
    }

})