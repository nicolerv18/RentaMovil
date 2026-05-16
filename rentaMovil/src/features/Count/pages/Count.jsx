import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Count(){
    const router = useRouter();
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Contador</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/Count/Counter')}>
                <Text style={styles.buttonText}>Ir al contador</Text>
            </TouchableOpacity>
        </View>
    )
}

