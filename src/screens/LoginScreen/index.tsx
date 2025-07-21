// src/screens/LoginScreen/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image
} from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get(`https://api.dressify.com/api/accounts`);
      const user = response.data.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        Alert.alert('¡Bienvenido!', `Hola, ${user.name}`);
      } else {
        Alert.alert('Error', 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')} // 🔁 Ajusta la ruta si es distinta
        style={styles.logo}
        resizeMode="contain"
      />
      {/*<Text style={styles.title}>dressify</Text>*/}

      <Text style={styles.label}>Gmail</Text>
      <TextInput
        placeholder="Gmail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Don’t have an account?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          Sign up!
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 100,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'sans-serif'
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 50,
    fontSize: 12,
    color: '#333',
    marginBottom: 3
  },
  input: {
    width: '75%',
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 14
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    width: '75%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  registerText: {
    marginTop: 25,
    fontSize: 13,
    color: '#333'
  },
  registerLink: {
    fontWeight: 'bold',
    color: '#000'
  }
});
