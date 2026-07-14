import { useRouter } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import { themes } from "../../../theme/themes";
import { useTheme } from "../../../theme/useTheme";
import { CountStyles } from "./Count.Style";

import SelectLanguage from "../../../shared/components/select/selectLanguage";
import ThemeSelector from "../../../shared/components/select/selectTheme";
import AppCard from "../../../shared/components/appCard/AppCard";

const defaultUser = require("@/assets/images/login.png");

export default function Count() {
  const router = useRouter();

  const [name, setName] = useState("Thiago Rojas");
  const [phone, setPhone] = useState("123456789");
  const [email, setEmail] = useState("thiagorojas@example.com");

  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [showSettings, setShowSettings] = useState(false);

  const { themeName } = useTheme();
  const colors = themes[themeName];
  const styles = CountStyles(colors);

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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* FOTO */}

      <View style={styles.photoContainer}>
        <Image
          source={image ? { uri: image } : defaultUser}
          style={styles.image}
        />

        <TouchableOpacity
          style={styles.selectButton}
          onPress={pickImage}
        >
          <Text style={styles.selectButtonText}>
            Cambiar foto
          </Text>
        </TouchableOpacity>
      </View>
      {/* CONFIGURACIÓN */}

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setShowSettings(!showSettings)}
      >
        <Text style={styles.settingsTitle}>
          ⚙️ Configuración
        </Text>

        <Text style={styles.arrow}>
          {showSettings ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {showSettings && (

        <AppCard>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>
              Tema
            </Text>

            <ThemeSelector />
          </View>

          <View style={styles.settingItem}>
            <SelectLanguage />
          </View>

        </AppCard>

      )}
      {/* INFORMACIÓN */}
      <AppCard>

        <Text style={styles.sectionTitle}>
          Información personal
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>

          <TextInput
            style={styles.input}
            value={name}
            editable={editing}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono</Text>

          <TextInput
            style={styles.input}
            value={phone}
            editable={editing}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo</Text>

          <TextInput
            style={styles.input}
            value={email}
            editable={false}
          />
        </View>
         {/* CAMBIAR CONTRASEÑA */}

      <TouchableOpacity
        style={styles.passwordButton}
        onPress={() => router.push("/count")}
      >
        <Text style={styles.passwordText}>
          Cambiar contraseña
        </Text>
      </TouchableOpacity>

      </AppCard>

      {/* BOTONES */}

      <View style={styles.buttonsRow}>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditing(!editing)}
        >
          <Text style={styles.buttonEditar}>
            {editing ? "Guardar" : "Editar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outCesionButton}
          onPress={() => router.push("/count")}
        >
          <Text style={styles.outCesionButtonText}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}