import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/Config'
import { onValue, ref } from 'firebase/database'

type Perfil = {
  nombre: string
  apellido: string
  cedula: string
  correo: string
}

export default function PerfilScreen() {
  const [perfil, setPerfil] = useState<Perfil | null>(null)

  useEffect(() => {
    const user = auth.currentUser

    if (!user) return

    const perfilRef = ref(db, `usuarios/${user.uid}`)

    const unsubscribe = onValue(perfilRef, snapshot => {
      const data = snapshot.val()
      if (data) {
        setPerfil(data)
      } else {
        setPerfil(null)
      }
    })

    return () => unsubscribe()
  }, [])



  if (!perfil) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil no encontrado</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>

      <View style={styles.card}>

        <Text style={styles.title}>Datos</Text>

        <Text style={styles.tarjeta}>
          <Text style={styles.label}>Nombre:</Text> {perfil.nombre}
        </Text>
        <Text style={styles.tarjeta}>
          <Text style={styles.label}>Apellido:</Text> {perfil.apellido}
        </Text>
        <Text style={styles.tarjeta}>
          <Text style={styles.label}>Cédula:</Text> {perfil.cedula}
        </Text>
        <Text style={styles.tarjeta}>
          <Text style={styles.label}>Correo:</Text> {perfil.correo}
        </Text>

      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'flex-start',
    backgroundColor: '#b6a89a'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    alignSelf: 'center'
  },
  item: {
    fontSize: 18,
    marginBottom: 10
  },
  label: {
    fontSize: 20,
    fontWeight: '600'
  },
  tarjeta: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 30,
    width: "90%",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#e48125",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 20,
  }
})
