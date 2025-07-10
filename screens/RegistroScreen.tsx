import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/Config'
import { ref, set } from 'firebase/database'

export default function RegistroScreen({ navigation }: any) {

    const [correo, setcorreo] = useState("")
    const [password, setpassword] = useState("")

    const [nombre, setnombre] = useState("")
    const [apellido, setapellido] = useState("")
    const [cedula, setcedula] = useState("")


    function registro() {

        if (correo.trim() === "" || password.trim() === "") {
            Alert.alert("Incompleto", "Existen campos en blanco")
            return;
        }

        createUserWithEmailAndPassword(auth, correo, password)
            .then((userCredential) => {

                const user = userCredential.user;

                set(ref(db, 'usuarios/' + user.uid), {
                    correo: correo,
                    nombre: nombre,
                    apellido: apellido,
                    cedula: cedula
                });


                Alert.alert("Felicidades", "Se ha registrado correctamente")
                navigation.navigate("Login")


            })
            .catch((error) => {

                switch (error.code) {

                    case "auth/weak-password":
                        Alert.alert("Error", "Contraseña debil")
                        break;

                    case "auth/email-already-in-use":
                        Alert.alert("Error", "Credenciales en uso")
                        break;

                    case "auth/invalid-email":
                        Alert.alert("Error", "correo no valido")
                        break;


                    default:
                        Alert.alert("Error", "Vuelva a intentarlo")
                        break;

                }
            });


    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <Text style={styles.title}>Llene los siguientes campos con sus datos</Text>

            <Image style={styles.img} source={{ uri: "https://cdn-icons-png.flaticon.com/128/18784/18784951.png" }} ></Image>

            <TextInput
                placeholder='Ingrese su nombre'
                style={styles.input}
                onChangeText={(texto) => setnombre(texto)}
            />
            <TextInput
                placeholder='Ingrese su apellido'
                style={styles.input}
                onChangeText={(texto) => setapellido(texto)}
            />
            <TextInput
                placeholder='Ingrese su cédula'
                style={styles.input}
                onChangeText={(texto) => setcedula(texto)}
            />
            <TextInput
                placeholder='Ingrese su correo'
                style={styles.input}
                onChangeText={(texto) => setcorreo(texto)}>
            </TextInput>

            <TextInput
                placeholder='Ingrese su contraseña'
                style={styles.input}
                onChangeText={(texto) => setpassword(texto)}>
            </TextInput>


            <Button title='Registro' onPress={() => registro()}></Button>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ marginTop: 20 }} > Ya tienes una cuenta inicia sesion</Text>
            </TouchableOpacity >
        </View >
    )
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
        backgroundColor: "#ffffff",
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: "90%"
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 20,
        resizeMode: "contain"
    }


})