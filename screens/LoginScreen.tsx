import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';

export default function LoginScreen({ navigation }: any) {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");


    function login() {

        if (correo.trim() === null || password.trim() === null) {
            Alert.alert("Incompleto", "Campos vacios")
            return
        }


        signInWithEmailAndPassword(auth, correo, password)
            .then((userCredential) => {

                const user = userCredential.user;

                Alert.alert("Felicidades", "Se logeo con exito")
                navigation.navigate("Usuario")


                console.log(user)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)

                Alert.alert("Error", "Credenciales no válidas")


            });
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <Image style={styles.img} source={{ uri: "https://cdn-icons-png.flaticon.com/128/18841/18841999.png" }} ></Image>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={correo}
                onChangeText={setCorreo}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Ingresar" onPress={() => login()} />

            <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
                <Text style={{ marginTop: 20 }} > No tienes una cuenta Registrate</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
        backgroundColor: "#e6e6e6"
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        borderWidth: 1,

        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: "90%",
        backgroundColor: "#ffffff",
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 20,
         resizeMode: "contain",
    }
});
