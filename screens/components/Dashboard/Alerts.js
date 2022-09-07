import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import React from 'react'


const data = [
    {
        id: 1,
        title: 'August bus fee',
        body: 'Assalamualaikum dear all, some of the members are yet to submit their bus fee for the month of August 2022. Those who are yet to submit are requested to kindly do it as soon as possible.',
    },
    {
        id: 2,
        title: 'Route Change for 2 days',
        body: 'the bus will no longer be going via lal chowck for the next 2 days in the view of election campain. People who live in the vicinitines may contact the driver for alternative pickup point.',
    },
    {
        id: 3,
        title: 'Route Change for 2 days',
        body: 'the bus will no longer be going via lal chowck for the next 2 days in the view of election campain. People who live in the vicinitines may contact the driver for alternative pickup point.',
    },
    {
        id: 4,
        title: 'Route Change for 2 days',
        body: 'the bus will no longer be going via lal chowck for the next 2 days in the view of election campain. People who live in the vicinitines may contact the driver for alternative pickup point.',
    },
    {
        id: 5,
        title: 'Route Change for 2 days',
        body: 'the bus will no longer be going via lal chowck for the next 2 days in the view of election campain. People who live in the vicinitines may contact the driver for alternative pickup point.',
    },
]


const Alerts = () => {
    return (
        <View style={styles.noticeListContainer}>

            <View>
                <Text style={styles.noticeListHeader}>Alerts</Text>


            </View>


            <FlatList

                data={data}
                style={styles.noticeList}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
                tyle={styles.noticeObject}
                renderItem={({ item }) => {
                    return (

                        <View style={styles.noticeObject}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#3f3f3f' }}>{item.title}</Text>
                            <Text style={{ fontSize: 16, marginTop: 5, color: '#6f6f6f' }}>{item.body}</Text>
                        </View>
                    )

                }}

            />




        </View>
    )
}

export default Alerts

const styles = StyleSheet.create({


    noticeListContainer: {
        marginTop: 20,
        backgroundColor: '#ffffff',
    },


    noticeListHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4f4f4f'
    },

    noticeList: {
        marginTop: 10
    },

    noticeObject: {
        marginRight: 10,
        width: 300,
        minHeight: 250,
        backgroundColor: '#ffffff',
        padding: 20,
        borderWidth: 1,
        borderLeftWidth: 5,
        borderTopColor: '#afafaf',
        borderRightColor: '#afafaf',
        borderBottomColor: '#afafaf',
        borderLeftColor: '#6f6f6f'

    }

})