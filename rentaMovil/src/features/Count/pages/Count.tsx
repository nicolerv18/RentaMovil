import { useRouter } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

const defaultUser = require("@/assets/images/login.png");

export default function Count() {
    const [name, setName] = useState("Thiago Rojas");
    const [phone, setPhone] = useState("123456789");
    const [email, setEmail] = useState("thiagorojas@example.com");
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image
          source={image ? { uri: image } : defaultUser}
          style={styles.image}
        />
        <TouchableOpacity onPress={pickImage} style={styles.selectButton}>
          <Text>Seleccionar Imagen</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 25, }}>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre: </Text>
          <TextInput style={styles.input} value={name} editable={editing} onChangeText={setName} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefono: </Text>
          <TextInput style={styles.input} value={phone} editable={editing} onChangeText={setPhone} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email: </Text>
          <TextInput style={styles.input} value={email} editable={editing} onChangeText={setEmail} />
        </View>

        <TouchableOpacity onPress={() => router.push("/count")} style={styles.ChangePasswordButton}>
          <Text style={styles.ChangePasswordButtonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
            <Text style={styles.buttonEditar}>
                {editing ? "Guardar" : "Editar"}
            </Text>
        </TouchableOpacity>
       </View>

       <View>
        <TouchableOpacity onPress={() => router.push("/count")} style={styles.outCesionButton}>
          <Text style={styles.outCesionButtonText}>Cerrar Sesion</Text>
        </TouchableOpacity>
       </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  photoContainer: {
    justifyContent: "flex-start",
    marginTop: 25,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  selectButton: {},


  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 500,
   
  },
  inputContainer: {
    marginTop: 15,
},
  input: {
    fontWeight: 400,
    width: 250,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 8,




    
    fontSize: 15,
    backgroundColor: "#ffffff",
  },
    editButton: {
        marginTop: 20,
        width: 120,
        backgroundColor: "#00ff22dc",
        padding : 5,
        borderRadius: 25,
        marginBottom: 10,
        alignSelf: "center"
    },
    buttonEditar: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    ChangePasswordButton: {
        color: "#007AFF",
        marginTop: 10,
        width: 200, 
    },
    ChangePasswordButtonText: {
        fontWeight: "bold",
        color: "#00ff2288",
        fontSize: 16,
    },
    outCesionButton: {
        marginTop: 20,
        width: 200,
        borderRadius: 25,
        backgroundColor: "#ff0000",
        padding: 10,
        alignSelf: "center"
    },
    outCesionButtonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    }


});
