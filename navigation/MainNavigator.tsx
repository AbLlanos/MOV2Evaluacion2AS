import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './BottomNavigator';

const Stack = createStackNavigator();


function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Home">

            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>

            <Stack.Screen name="Registro" component={RegistroScreen}></Stack.Screen>


            <Stack.Screen name="Usuario" component={BottomNavigator}></Stack.Screen>

        </Stack.Navigator>
    );
}


export default function MainNavigator() {
    return (
        <NavigationContainer>
            <MyStack></MyStack>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})