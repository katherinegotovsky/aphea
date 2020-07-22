import React, {useState} from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import SymptomForm from './symptomform';
import { TextInput } from 'react-native-gesture-handler';


export default function Symptoms({ navigation , day, month, year}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [symptoms, setSymptoms] = useState([]);

    const date = (day, month, year) => {
        var date_string = day.toString()+month.toString()+year.toString();
        return parseInt(date_string);
    }


    // const addRecord = (symptom) => {
    //     symptom.key = Math.random().toString();
    //     setSymptoms((currentSymptoms) => {
    //         return [symptom, ...currentSymptoms]
    //     });
    //     setModalOpen(false);
    // }

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