import React, {useState} from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import SymptomForm from './symptomform';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import "firebase/firestore";


export default function Symptoms({ navigation }) {

    const [modalOpen, setModalOpen] = useState(false);

    const date = (day, month, year) => {
        var date_string = day.toString()+month.toString()+year.toString();
        return parseInt(date_string);
    }

    const day = navigation.getParam('day');
    const month = navigation.getParam('month');
    const year = navigation.getParam('year');
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const period_date = date(day, month, year);

    const recordID = period_date.toString();

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
                    var db_period = db_data.data.period; 
                    var db_period_day = db_data.data.period_day; 
                    var db_bloating = db_data.data.bloating; 
                    var db_cramps = db_data.data.cramps; 
                    var db_headache = db_data.data.headache; 
                    var db_acne = db_data.data.acne; 
                    var db_backache = db_data.data.backache; 
                    var db_nausea = db_data.data.nausea; 

                    var db_fatigue = db_data.data.fatigue; 
                    var db_cravings = db_data.data.cravings; 
                    var db_insomnia = db_data.data.insomnia; 
                    var db_constipation = db_data.data.constipation; 
                    var db_diarrhea = db_data.data.diarrhea;


                    setSymptoms(db_symptoms);
                    setPeriodDay(db_period_day);
                    setBloating(db_bloating);
                    setCramps(db_cramps);
                    setAcne(db_acne);
                    setBackache(db_backache);
                    setNausea(db_nausea);

                    setFatigue(db_fatigue);
                    setCravings(db_cravings);
                    setInsomnia(db_insomnia);
                    setConstipation(db_constipation);
                    setDiarrhea(db_diarrhea);

                

                } else {
                    // do nothing
                }
            });


    return (
        <View style={globalStyles.container}>


        <Modal visible={modalOpen} animationType='slide'>
            <View style={styles.modalContent}>
                <Text> Hello from the modal</Text>
                <Text onPress={() => setModalOpen(false)}>Close </Text>
            </View>

            <SymptomForm navigation={ navigation} date={date}/>
        </Modal>

        <Text onPress={() => setModalOpen(true)}>Edit </Text>

        </View>
    )
}



const styles = StyleSheet.create({
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    }
})