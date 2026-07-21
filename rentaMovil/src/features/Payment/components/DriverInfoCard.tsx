import {
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";

import { useAuth } from "../../auth/hooks/useAuth";

import {
    usePayment,
} from "../../Payment/context/PaymentContext";

import AppCard from "../../../shared/components/appCard/AppCard";

import { themes } from "../../../theme/themes";

import { useTheme } from "../../../theme/useTheme";

import {
    createStyles,
} from "./DriverInfoCard.style";


export default function DriverInfoCard() {

    const { user } = useAuth();


    const {
        driver,
        setDriver,
    } = usePayment();


    const {
        themeName,
    } = useTheme();


    const colors =
        themes[themeName];


    const styles =
        createStyles(colors);


    const [
        isOpen,
        setIsOpen,
    ] =
        useState(false);


    const [
        name,
        setName,
    ] =
        useState("");


    const [
        phone,
        setPhone,
    ] =
        useState("");


    useEffect(() => {

        if (user && !driver) {

            setDriver({

                email: user.email,

                name:
                    `${user.firstName} ${user.lastName}`,

                phone: user.phone,

            });


            setName(
                `${user.firstName} ${user.lastName}`
            );


            setPhone(
                user.phone
            );

        }

    }, [user]);


    function handleNameChange(
        value: string
    ) {

        setName(value);

        if (!driver) return;


        setDriver({

            ...driver,

            name: value,

        });

    }


    function handlePhoneChange(
        value: string
    ) {

        setPhone(value);

        if (!driver) return;


        setDriver({

            ...driver,

            phone: value,

        });

    }


    return (

        <AppCard>

            <TouchableOpacity

                style={styles.header}

                onPress={() =>
                    setIsOpen(!isOpen)
                }

            >

                <Text
                    style={styles.title}
                >

                    Datos del conductor

                </Text>


                <Text
                    style={styles.arrow}
                >

                    {isOpen ? "▲" : "▼"}

                </Text>

            </TouchableOpacity>


            {isOpen && (

                <>

                    <Text
                        style={styles.label}
                    >

                        Correo

                    </Text>


                    <TextInput

                        style={[
                            styles.input,
                            styles.disabledInput,
                        ]}

                        value={
                            driver?.email ?? ""
                        }

                        editable={false}

                    />


                    <Text
                        style={styles.label}
                    >

                        Nombre

                    </Text>


                    <TextInput

                        style={styles.input}

                        value={name}

                        onChangeText={
                            handleNameChange
                        }

                    />


                    <Text
                        style={styles.label}
                    >

                        Teléfono

                    </Text>


                    <TextInput

                        style={styles.input}

                        value={phone}

                        onChangeText={
                            handlePhoneChange
                        }

                        keyboardType="phone-pad"

                    />

                </>

            )}

        </AppCard>

    );

}