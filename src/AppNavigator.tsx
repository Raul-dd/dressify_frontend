// src/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductList from '../src/screens/ProductList';
import ProductDetail from '../src/screens/ProductDetail';
import ProductForm from '../src/screens/ProductForm';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{ title: 'Productos' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ title: 'Detalle' }}
      />
      <Stack.Screen
        name="ProductForm"
        component={ProductForm}
        options={{ title: 'Formulario' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
