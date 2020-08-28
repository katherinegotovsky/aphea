import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Keyboard, ScrollView, DocumentSnapshot } from 'react-native';
import { globalStyles } from '../styles/global';
import { CheckBox } from 'react-native-elements';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import "firebase/firestore";

export default function SymptomForm( { navigation, date } ) {

    const[symptoms, setSymptoms] = useState('');
    const[period, setPeriod] = useState('');
    const[period_day, setPeriodDay] = useState('');
    const[bloating, setBloating] = useState(false);
    const[cramps, setCramps] = useState(false);
    const[headache, setHeadache] = useState(false);
    const[acne, setAcne] = useState(true);
    const[backache, setBackache] = useState(false);
    const[nausea, setNausea] = useState(false);
    const[fatigue, setFatigue] = useState(false);
    const[cravings, setCravings] = useState(false);
    const[insomnia, setInsomnia] = useState(false);
    const[constipation, setConstipation] = useState(false);
    const[diarrhea, setDiarrhea] = useState(false);

    const day = navigation.getParam('day');
    const month = navigation.getParam('month');
    const year = navigation.getParam('year');
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const period_date = date(day, month, year);

    const recordID = period_date.toString();

    var db = firebase.firestore();

   

    // display values that are in the database
    // const displayDatabaseValues = () => {
        const recordRef = db.collection("days").doc(recordID)
 
        
            recordRef.get()
                .then((doc) => {
                if (doc.exists) {
                    var db_data = doc.data(); 
                    console.log(db_data);

                    var db_symptoms = db_data.data.symptoms; 

                    setSymptoms(db_symptoms);
                

                } else {
                    // do nothing
                }
            });
            
    // }


    const data = {
        period_date: period_date ,
        symptoms: symptoms,
        period: period,
        period_day: period_day, 
        timestamp: timestamp,
        bloating: bloating,
        cramps: cramps,
        headache: headache,
        acne: acne,
        nausea: nausea,
        fatigue: fatigue,
        cravings: cravings,
        insomnia: insomnia,
        constipation: constipation,
        diarrhea: diarrhea
    
    };

 

    const updateDatabase = (period_date) => {

        db.collection("days").doc(recordID).set({ data })
        .then(function() {
            console.log("Document successfully written!");
            // setPeriodDay('')
            // setSymptoms('')
            // setPeriod('')
            // setBloating(false)
            // setCramps(false)
            Keyboard.dismiss()
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }        

    // useEffect(() => {
    //     displayDatabaseValues();
    // });


    const onAddButtonPress = () => {
        
        updateDatabase(period_date);
    }


    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <Text>{ period_date } </Text>

                <TextInput
                        // placeholder= { symptoms }
                        // placeholderTextColor="#aaaaaa"
                        value={ symptoms }
                        onChangeText={(text) => setSymptoms(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                />

                <CheckBox 
                    title='Bloated' 
                    checked={bloating}
                    onPress={() => bloating ? setBloating(false) : setBloating(true)}
                />

                <CheckBox 
                    title='Cramps' 
                    checked={cramps}
                    onPress={() => cramps ? setCramps(false) : setCramps(true)}
                />


                <CheckBox 
                    title='Headache' 
                    value={headache}
                    onPress={() => bloating ? setHeadache(false) : setHeadache(true)}
                />

                <CheckBox 
                    title='Acne' 
                    value={acne}
                    onPress={() => bloating ? setAcne(false) : setAcne(true)}
                />

                <CheckBox 
                    title='Backache' 
                    value={backache}
                    onPress={() => bloating ? setBackache(false) : setBackache(true)}
                />

                <CheckBox 
                    title='Nausea' 
                    value={nausea}
                    onPress={() => bloating ? setNausea(false) : setNausea(true)}
                />

                <CheckBox 
                    title='Fatigue' 
                    value={fatigue}
                    onPress={() => bloating ? setFatigue(false) : setFatigue(true)}
                />

                <CheckBox 
                    title='Cravings' 
                    value={cravings}
                    onPress={() => bloating ? setCravings(false) : setCravings(true)}
                />
{/* 
                <CheckBox 
                    title='Insomnia' 
                    value={insomnia}
                    onPress={() => bloating ? setInsomnia(false) : setInsomnia(true)}
                />

                <CheckBox 
                    title='Constipation' 
                    value={constipation}
                    onPress={() => bloating ? setConstipation(false) : setConstipation(true)}
                />

                <CheckBox 
                    title='Diarrhea' 
                    value={diarrhea}
                    onPress={() => bloating ? setDiarrhea(false) : setDiarrhea(true)}
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