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

import { useAuth } from "../../auth/context/AuthContext";


const defaultUser =
    require("@/assets/images/login.png");


export default function Count() {

    const router = useRouter();


    const {
        user,
        logout,
        updateUser,
    } = useAuth();


    const {
        themeName,
    } = useTheme();


    const colors =
        themes[themeName];


    const styles =
        CountStyles(colors);


    const [
        editing,
        setEditing,
    ] =
        useState(false);


    const [
        image,
        setImage,
    ] =
        useState<string | null>(null);


    const [
        showSettings,
        setShowSettings,
    ] =
        useState(false);


    const [
        name,
        setName,
    ] =
        useState(
            user
                ? `${user.firstName} ${user.lastName}`
                : ""
        );


    const [
        phone,
        setPhone,
    ] =
        useState(
            user?.phone ?? ""
        );


    const pickImage =
        async () => {

            const result =
                await ImagePicker.launchImageLibraryAsync({

                    mediaTypes: ["images"],

                    allowsEditing: true,

                    aspect: [1, 1],

                    quality: 1,

                });


            if (!result.canceled) {

                setImage(
                    result.assets[0].uri
                );

            }

        };

        async function handleSave() {

    if (!user) return;


    await updateUser({

        ...user,

        firstName:
            name.split(" ")[0],

        lastName:
            name.split(" ").slice(1).join(" "),

        phone,

    });


    setEditing(false);

}


    async function handleLogout() {

        await logout();

        router.replace("/auth/login");

    }


    return (

        <ScrollView>

            {/* FOTO */}

            <View
                style={styles.photoContainer}
            >

                <Image

                    source={
                        image
                            ? { uri: image }
                            : defaultUser
                    }

                    style={styles.image}

                />


                <TouchableOpacity

                    style={styles.selectButton}

                    onPress={pickImage}

                >

                    <Text
                        style={
                            styles.selectButtonText
                        }
                    >

                        Cambiar foto

                    </Text>

                </TouchableOpacity>

            </View>


            {/* CONFIGURACIÓN */}

            <TouchableOpacity

                style={styles.settingsButton}

                onPress={() =>
                    setShowSettings(
                        !showSettings
                    )
                }

            >

                <Text
                    style={styles.settingsTitle}
                >

                    ⚙️ Configuración

                </Text>


                <Text
                    style={styles.arrow}
                >

                    {
                        showSettings
                            ? "▲"
                            : "▼"
                    }

                </Text>

            </TouchableOpacity>


            {
                showSettings && (

                    <AppCard>

                        <View
                            style={
                                styles.settingItem
                            }
                        >

                            <Text
                                style={
                                    styles.settingLabel
                                }
                            >

                                Tema

                            </Text>


                            <ThemeSelector />

                        </View>


                        <View
                            style={
                                styles.settingItem
                            }
                        >

                            <SelectLanguage />

                        </View>

                    </AppCard>

                )
            }


            {/* INFORMACIÓN */}

            <AppCard>

                <Text
                    style={
                        styles.sectionTitle
                    }
                >

                    Información personal

                </Text>


                <View
                    style={
                        styles.inputContainer
                    }
                >

                    <Text
                        style={styles.label}
                    >

                        Nombre

                    </Text>


                    <TextInput

                        style={styles.input}

                        value={name}

                        editable={editing}

                        onChangeText={setName}

                    />

                </View>


                <View
                    style={
                        styles.inputContainer
                    }
                >

                    <Text
                        style={styles.label}
                    >

                        Teléfono

                    </Text>


                    <TextInput

                        style={styles.input}

                        value={phone}

                        editable={editing}

                        onChangeText={setPhone}

                    />

                </View>


                <View
                    style={
                        styles.inputContainer
                    }
                >

                    <Text
                        style={styles.label}
                    >

                        Correo

                    </Text>


                    <TextInput

                        style={styles.input}

                        value={
                            user?.email ?? ""
                        }

                        editable={false}

                    />

                </View>


                {/* CAMBIAR CONTRASEÑA */}

                <TouchableOpacity

                    style={
                        styles.passwordButton
                    }

                    onPress={() =>
                        router.push("/count")
                    }

                >

                    <Text
                        style={
                            styles.passwordText
                        }
                    >

                        Cambiar contraseña

                    </Text>

                </TouchableOpacity>

            </AppCard>


            {/* BOTONES */}

            <View
                style={
                    styles.buttonsRow
                }
            >

        <TouchableOpacity
            style={styles.editButton}
            onPress={() => {

                if (editing) {

                    handleSave();

                } else {

                    setEditing(true);

                }

            }}
        >
            <Text style={styles.buttonEditar}>

                {editing ? "Guardar" : "Editar"}

            </Text>
        </TouchableOpacity>


                <TouchableOpacity

                    style={
                        styles.outCesionButton
                    }

                    onPress={
                        handleLogout
                    }

                >

                    <Text
                        style={
                            styles.outCesionButtonText
                        }
                    >

                        Cerrar sesión

                    </Text>

                </TouchableOpacity>

            </View>

        </ScrollView>

    );

}