import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import api from '../../../api/config'
import { useSelector } from 'react-redux'


const Members = () => {

    const token = useSelector(state => state.root.token);

    const [members, setMembers] = useState(null);


    useEffect(() => {
        api.get('/buses/members/', {
            headers: { Authorization: `Token ${token}` }
        })
            .then(res => {
                // console.log(res.data);
                setMembers(res.data);
            })
            .catch(err => {
                console.log(err.response);

            })
    }, [])



    return (
        <View style={styles.membersContainer}>




            <View style={styles.membersHeaderContainer}>
                <Text style={styles.membersHeaderTitle}>Members</Text>
                <TouchableOpacity style={styles.membersHeaderViewAllBtn}>
                    <Text style={styles.membersHeaderViewAllText}>View All</Text>
                </TouchableOpacity>
            </View>



            <View style={styles.membersBodyContainer}>

                {(members?.length > 0) && <FlatList

                    data={members}
                    style={styles.membersList}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({ item }) => {
                        return (

                            <TouchableOpacity style={styles.memberSmallInfoContainer}>
                                <Image
                                    style={styles.profilePhoto}
                                    source={{
                                        uri: item.profile.profile_picture
                                    }}
                                />
                                <Text style={styles.memberName}>{item.name.substring(0, 8) + '...'}</Text>
                            </TouchableOpacity>
                        )

                    }}

                />}

                {!(members?.length > 0) &&
                    <View style={styles.noMembersContaienr}>

                        <Text style={styles.noMembersText}>Looks like this bus has no members yet.</Text>

                    </View>

                }



            </View>


        </View>
    )
}

export default Members

const styles = StyleSheet.create({

    membersContainer: {
        marginTop: 15,
    },

    membersHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    membersHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6f6f6f'
    },


    membersHeaderViewAllBtn: {
        padding: 5
    },

    membersHeaderViewAllText: {
        fontWeight: 'bold',
        color: '#cf8300',
        fontSize: 16
    },


    membersBodyContainer: {
        marginTop: 10,
    },

    memberSmallInfoContainer: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    profilePhoto: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 40
    },

    membersList: {
        width: Dimensions.get("window").width,
        marginLeft: -20,
        paddingLeft: 10

    },

    noMembersContaienr: {

        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'

    },

    noMembersText: {
        color: '#6f6f6f',
        fontWeight: '600',
        textAlign: 'center'
    },

    memberName: {
        fontWeight: 'bold',
        color: '#cf8300',
        marginTop: 5
    }

})