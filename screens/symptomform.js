import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import "firebase/firestore";

export default function SymptomForm({ navigation, date } ) {

    const[symptoms, setSymptoms] = useState('');
    const[period, setPeriod] = useState('');
    const[period_day, setPeriodDay] = useState('');

    const day = navigation.getParam('day');
    const month = navigation.getParam('month');
    const year = navigation.getParam('year');


    const userRef = firebase.firestore().collection('days')
    const period_date = date(day, month, year);

    const checkIfDateExists = (period_date) => {
        var userRefs = firebase.firestore().collection('days')
        var query = userRefs.where("period_date", "==", period_date);

        firebase.firestore().collection("days").where("period_date", "==", period_date)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                alert(doc.id, " => ", doc.data());
                return true;
            });
        })
        .catch(function(error) {
            alert("Error getting documents: ", error);
        });
    }

    const addData = () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            period_date: period_date ,
            symptoms: symptoms,
            period: period,
            period_day: period_day, 
            timestamp: timestamp,
        };

        userRef
        .add(data)
        .then(_doc => {
            setPeriodDay('')
            setSymptoms('')
            setPeriod('')
            Keyboard.dismiss()
        })

        .catch((error) => {
            alert(error)
        });
    }

    const onAddButtonPress = () => {
        if (!checkIfDateExists(period_date)) {
            addData();
        }     
        else {
            alert("nothing added");
        } 
        
    }


    return (
        <View style={globalStyles.container}>
            <Text>{ period_date } </Text>

            <TextInput
                    placeholder='Add new symptom'
                    placeholderTextColor="#aaaaaa"
                    value={symptoms}
                    onChangeText={(text) => setSymptoms(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
            />

            <TextInput
                    placeholder='Do you have your period?'
                    placeholderTextColor="#aaaaaa"
                    value={period}
                    onChangeText={(text) => setPeriod(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
            />

            <TextInput
                    placeholder='What day of your period is it?'
                    placeholderTextColor="#aaaaaa"
                    value={period_day}
                    onChangeText={(text) => setPeriodDay(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
            />  

                <TouchableOpacity onPress={onAddButtonPress}>
                    <Text>Add</Text>
                </TouchableOpacity>

            {/* <Formik
                initialValues={{ symptoms: '', date: navigation.getParam('day'), day: '', period: ''}}
                onSubmit={
                    onAddButtonPress
                   // actions.resetForm();
                }
            >
                {(formikprops) => (
                    <View>
                        <TextInput
                            multiline
                            style={globalStyles.input}
                            placeholder='Symptoms'
                            onChangeText={formikprops.handleChange('symptoms')}
                            value={formikprops.values.symptoms}
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Day'
                            onChangeText={formikprops.handleChange('day')}
                            value={formikprops.values.day}
                            keyboardType='numeric'
                        />  

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Period'
                            onChangeText={formikprops.handleChange('period')}
                            value={formikprops.values.period}
                        />  

                        <Button title='enter' color='pink' onPress={formikprops.handleSubmit} />

                    </View>
                )}
                </Formik> */}
        </View>
    )
}