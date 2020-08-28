import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import moment from "moment";
import * as firebase from 'firebase';
import "firebase/firestore";

export default function Home() {

    var db = firebase.firestore();


    const[symptoms, setSymptoms] = useState('');
    const[period, setPeriod] = useState('');
    const[period_day, setPeriodDay] = useState('');
    const[bloating, setBloating] = useState(false);
    const[cramps, setCramps] = useState(false);

        // get current time
        var date = moment()
            .utcOffset('+05:30')
            .format('DDMMYYYY');

        var recordID = date.toString();

        // last month's date

        var days = moment()
            .utcOffset('+05:30')
            .format('DD');

        var last_month = new Date().getMonth(); //To get last month; account for December & January
        var year = new Date().getFullYear(); //To get the Current Year

        var last_recordID= days.toString() + last_month.toString() + year.toString();


        // // display values that are in the database
        // const displayDatabaseValues = () => {
            const recordRef = db.collection("days").doc(last_recordID)
     
            recordRef.get()
                .then((doc) => {
                if (doc.exists) {
                    var db_data = doc.data(); 
                    console.log(db_data);
    
                    var db_symptoms = db_data.data.symptoms; 
                    // console.log(symptoms);
                    setSymptoms(db_symptoms);
                   // console.log(symptoms); 
    
                } else {
                    setSymptoms("No data from last month");
                    console.log(last_recordID);
                     // do nothing
                }
            });
        // }



    return (
        <View style={globalStyles.container}>
            <Text style={styles.h1 }> Overview </Text>
            <Text> You can expect your next period in... days </Text>
            <Text> At this time last month, you felt: { symptoms } </Text>
        </View>
    )
}

    const styles = StyleSheet.create({
        h1: {
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold'

        },
        headerText: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#333',
            letterSpacing: 1,

        },
        icon: {
            position: 'absolute',
            left: 0,

        }
    });
