import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { FlatList } from 'react-native-gesture-handler';


export default function CalendarPage({ navigation}) {



    return (
        <View style={globalStyles.container}>
            <Text> Tap on a day to learn more about your symptoms. </Text>
            <CalendarList 
                horizontal={true}
                onDayPress={( day, month, year ) => navigation.navigate('Symptoms', day, month, year)}
            />
        </View>
    )
}
