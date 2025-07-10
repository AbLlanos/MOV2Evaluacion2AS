import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, Modal } from "react-native";

type Props = {
    nombre: string;
    cedula: string;
    edad: number;
    curso: string;
}

export default function CardListaEstudiante({ nombre, cedula, edad, curso }: Props) {

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.card}>
                    <Text style={styles.nombre}>{nombre}</Text>
                    <Text style={styles.label}>
                        Cédula: <Text style={styles.valor}>{cedula}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Edad: <Text style={styles.valor}>{edad}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Curso: <Text style={styles.valor}>{curso}</Text>
                    </Text>
                </View>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Detalles del Estudiante</Text>

                        <Text style={styles.modalItem}>
                            <Text style={styles.label}>Nombre:</Text> {nombre}
                        </Text>
                        <Text style={styles.modalItem}>
                            <Text style={styles.label}>Cédula:</Text> {cedula}
                        </Text>
                        <Text style={styles.modalItem}>
                            <Text style={styles.label}>Edad:</Text> {edad}
                        </Text>
                        <Text style={styles.modalItem}>
                            <Text style={styles.label}>Curso:</Text> {curso}
                        </Text>


                        <Button onPress={() => setModalVisible(false)} title="Cerrar" />

                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff5cc',
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
        width: '100%',
        elevation: 2
    },
    nombre: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 5
    },
    label: {
        fontWeight: '600'
    },
    valor: {
        fontWeight: '400'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 15,
        textAlign: 'center'
    },
    modalItem: {
        fontSize: 16,
        marginBottom: 10
    },
    btnCerrar: {
        marginTop: 20,
        backgroundColor: '#ff944d',
        paddingVertical: 10,
        borderRadius: 5
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600'
    }
})