import { useEffect, useState, } from "react"
import { FlatList, Text, View, StyleSheet } from "react-native"
import { auth, db } from "../firebase/Config"
import { onValue, ref } from "firebase/database"
import CardListaEstudiante from "../components/CardListaEstudiante"

type Estudiante = {
  cedula: string
  nombre: string
  edad: number
  curso: string
}

export default function ListaEstudiantesScreen() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])

  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    const estudiantesRef = ref(db, `usuarios/${user.uid}/students`)

    const unsubscribe = onValue(estudiantesRef, snapshot => {
      const data = snapshot.val()
      if (data) {
        const lista = Object.keys(data).map(key => ({
          ...data[key],
          id: key,
        }))
        setEstudiantes(lista)
      } else {
        setEstudiantes([])
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Estudiantes</Text>

      <FlatList
        data={estudiantes}
        renderItem={({ item }) => (

          <CardListaEstudiante
            nombre={item.nombre}
            cedula={item.cedula}
            edad={item.edad}
            curso={item.curso}
          />

        )}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#efd0b3',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  nombre: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    color: '#555',
  },
  valor: {
    fontWeight: '400',
    color: '#333',
  },
  empty: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
  },
})