import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Keyboard, ScrollView, DocumentSnapshot } from 'react-native';
import { globalStyles } from '../styles/global';
import { CheckBox } from 'react-native-elements';
import { Formik } from 'formik';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import "firebase/firestore";

export default function SymptomForm({ navigation, date } ) {

    const[symptoms, setSymptoms] = useState('');
    const[period, setPeriod] = useState('');
    const[period_day, setPeriodDay] = useState('');
    // const[bloating, setBloating] = useState(false);
    // const[cramps, setCramps] = useState(false);
    // const[headache, setHeadache] = useState(false);
    // const[acne, setAcne] = useState(false);
    // const[backache, setBackache] = useState(false);
    // const[nausea, setNausea] = useState(false);
    // const[fatigue, setFatigue] = useState(false);
    // const[cravings, setCravings] = useState(false);
    // const[insomnia, setInsomnia] = useState(false);
    // const[constipation, setConstipation] = useState(false);
    // const[diarrhea, setDiarrhea] = useState(false);

    const day = navigation.getParam('day');
    const month = navigation.getParam('month');
    const year = navigation.getParam('year');
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const period_date = date(day, month, year);

    const recordID = period_date.toString();

    // display values that are in the database
    const displayDatabaseValues = () => {
        const recordRef = db.collection("days").doc(recordID)
 
        recordRef.get()
            .then((doc) => {
            if (doc.exists) {
                var db_data = doc.data(); // works fine
                console.log(db_data);

                var db_period_date = db_data.data.period_date; //undefined
                console.log(db_period_date);
                // setPeriodDate(db_period_date);

            } else {
                 // do nothing
            }
        });
    }



    const data = {
        period_date: period_date ,
        symptoms: symptoms,
        period: period,
        period_day: period_day, 
        timestamp: timestamp,
        // bloating: bloating,
        // cramps: cramps
    };

    var db = firebase.firestore();

    const updateDatabase = (period_date) => {

        db.collection("days").doc(recordID).set({ data })
        .then(function() {
            console.log("Document successfully written!");
            setPeriodDay('')
            setSymptoms('')
            setPeriod('')
            // setBloating(false)
            // setCramps(false)
            Keyboard.dismiss()
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }        


    const onAddButtonPress = () => {
        displayDatabaseValues();
        updateDatabase(period_date);
    }


    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <Text>{ period_date } </Text>

                <TextInput
                        placeholder="Insert symptoms here"
                        placeholderTextColor="#aaaaaa"
                        value={symptoms}
                        onChangeText={(text) => setSymptoms(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                />

                {/* <CheckBox 
                    title='Bloated' 
                    checked={bloating}
                    onPress={() => bloating ? setBloating(false) : setBloating(true)}
                />

                <CheckBox 
                    title='Cramps' 
                    checked={cramps}
                    onPress={() => cramps ? setCramps(false) : setCramps(true)}
                /> */}

{/* 
                <CheckBox 
                    title='Headache' 
                    value={headache}
                    checked={() => setHeadache(true)}
                />

                <CheckBox 
                    title='Acne' 
                    value={acne}
                    checked={() => setAcne(true)}
                />

                <CheckBox 
                    title='Backache' 
                    value={backache}
                    checked={() => setBackache(true)}
                />

                <CheckBox 
                    title='Nausea' 
                    value={nausea}
                    checked={() => setNausea(true)}
                />

                <CheckBox 
                    title='Cravings' 
                    value={cravings}
                    checked={() => setCravings(true)}
                />

                <CheckBox 
                    title='Insomnia' 
                    value={insomnia}
                    checked={() => setInsomnia(true)}
                />

                <CheckBox 
                    title='Constipation' 
                    value={constipation}
                    checked={() => setConstipation(true)}
                />

                <CheckBox 
                    title='Diarrhea' 
                    value={diarrhea}
                    checked={() => setDiarrhea(true)}
                /> */}

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

            </View>
        </ScrollView>
    )
}