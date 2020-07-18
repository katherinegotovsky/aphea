import React, {useState} from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import SymptomForm from './symptomform';


export default function Symptoms({ navigation }) {

    const [modalOpen, setModalOpen] = useState(false);

    const[symptoms, setSymptoms] = useState([
        { period:'', day: '', symptom: '', key: ''}
    ]);

    const addRecord = (symptom) => {
        symptom.key = Math.random().toString();
        setSymptoms((currentSymptoms) => {
            return [symptom, ...currentSymptoms]
        });
        setModalOpen(false);
    }

    return (
        <View style={globalStyles.container}>
            <Text>{ navigation.getParam('day') } </Text>
            <Text>{ navigation.getParam('month') } </Text>
            <Text>{ navigation.getParam('year') } </Text>

        <Modal visible={modalOpen} animationType='slide'>
            <View style={styles.modalContent}>
                <Text> Hello from the modal</Text>
                <Text onPress={() => setModalOpen(false)}>Close </Text>
            </View>
            <SymptomForm addRecord={ addRecord } navigation={ navigation }/>
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