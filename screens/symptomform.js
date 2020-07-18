import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';

export default function SymptomForm({ addRecord, navigation }) {

    return (
        <View style={globalStyles.container}>
            <Text>{ navigation.getParam('day') } </Text>

            <Formik
                initialValues={{ symptoms: '', date: navigation.getParam('day'), day: '', period: ''}}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addRecord(values);
                }}
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
                </Formik>
        </View>
    )
}