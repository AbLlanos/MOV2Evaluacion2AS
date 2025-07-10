import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OperacionScreen from '../screens/OperacionScreen';
import ListaScreen from '../screens/ListaScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Bottom = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Bottom.Navigator initialRouteName="Perfil">
      <Bottom.Screen name="Operacion" component={OperacionScreen} />
      <Bottom.Screen name="Lista" component={ListaScreen} />
      <Bottom.Screen name="Perfil" component={PerfilScreen} />
    </Bottom.Navigator>
  );
}


const styles = StyleSheet.create({})