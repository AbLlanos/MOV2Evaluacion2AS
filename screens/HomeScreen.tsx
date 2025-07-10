import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>

            <Image
                style={styles.img}
                source={{ uri: "https://cdn-icons-png.flaticon.com/128/8303/8303439.png" }}
            />

            <Text style={styles.subtitle}>Sistema de Registro de Estudiantes por Profesores</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Registro")}
            >
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <Text>Desarrollado por: Abner Salazar</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff9ec",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    subtitle: {
        fontSize: 18,
        color: "#555",
        marginBottom: 30,
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        resizeMode: "contain",
    },
    button: {
        backgroundColor: "#4285f4",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 8,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
})
