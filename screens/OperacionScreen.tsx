import { Alert, Button, Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/Config';
import { get, push, ref, set } from 'firebase/database';

export default function OperacionScreen() {


    const [cedulaEstudiante, setcedulaEstudiante] = useState("");
    const [nombreEstudiante, setnombreEstudiante] = useState("")
    const [edadEstudiante, setedadEstudiante] = useState(0)
    const [cursoEstudiante, setcursoEstudiante] = useState("")


    async function guardarEstudiante() {
        const user = auth.currentUser;

        if (!user) {
            Alert.alert("Error", "Usuario no autenticado")
            return;
        }

        if (
            cedulaEstudiante.trim() === "" ||
            nombreEstudiante.trim() === "" ||
            cursoEstudiante.trim() === ""
        ) {
            Alert.alert("Campos obligatorios", "Por favor completa todos los campos")
            return;
        }

        if (edadEstudiante < 18) {
            Alert.alert("Error", "La edad debe ser un número válido y mayor de edadd");
            return;
        }

        try {

            const estudiantesRef = ref(db, `usuarios/${user.uid}/students`);

            const nuevoEstudianteRef = push(estudiantesRef);

            await set(nuevoEstudianteRef, {
                cedula: cedulaEstudiante,
                nombre: nombreEstudiante,
                edad: edadEstudiante,
                curso: cursoEstudiante,
            });

            Alert.alert("Éxito", "Estudiante guardado");

            limpiarCampos();
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo guardar el estudiante");
        }
    }

    function limpiarCampos() {
        setcedulaEstudiante("")
        setnombreEstudiante("")
        setedadEstudiante(0)
        setcursoEstudiante("")
    }




    function confirmar() {

        if (
            cedulaEstudiante.trim() === "" ||
            nombreEstudiante.trim() === "" ||
            cursoEstudiante.trim() === ""
        ) {
            Alert.alert("Campos obligatorios", "Por favor completa todos los campos")
            return;
        }

        if (edadEstudiante < 18) {
            Alert.alert("Error", "El estudiante debe ser mayor de edad")
            return;
        }

        Alert.alert("Confirmar", "Esta seguro de guardar el estudiante", [
            {
                text: "Guardar estudainte",
                onPress: () => guardarEstudiante()
            },
            {
                text: "Cancelar"
            }
        ])
    }






    return (
        <View style={styles.container}>
            <Text style={styles.title}>Operacion de registrar a tus estudiantes</Text>

            <Image style={styles.img} source={{ uri: "https://cdn-icons-png.flaticon.com/128/3574/3574808.png" }} ></Image>

            <TextInput
                style={styles.input}
                placeholder="Ingrese la cedula del estudiante"
                value={cedulaEstudiante}
                onChangeText={(texto) => setcedulaEstudiante(texto)}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese el nombre del estudiante"
                value={nombreEstudiante}
                onChangeText={(texto) => setnombreEstudiante(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese la edad del estudiante"
                value={edadEstudiante.toString()}
                onChangeText={(texto) => setedadEstudiante(+texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese el curso del estudiante"
                value={cursoEstudiante}
                onChangeText={(texto) => setcursoEstudiante(texto)}
            />


            <Button title="Registrar estudiante" onPress={() => confirmar()} />

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
        backgroundColor: "#b6a89a"
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#efedeb",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: "90%"
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 20
    }
});
