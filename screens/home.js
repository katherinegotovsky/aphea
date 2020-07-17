import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Home() {
    return (
        <View style={globalStyles.container}>
            <Text> Overview </Text>
            <Text> You can expect your next period in... </Text>
        </View>
    )
}
