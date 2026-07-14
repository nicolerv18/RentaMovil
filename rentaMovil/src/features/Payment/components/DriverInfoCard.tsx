import {
    Text,
    TextInput,
    View,
} from "react-native";

import { useEffect, useState } from "react";

import { useAuth } from "../../auth/hooks/useAuth";

import { usePayment } from "../../auth/context/PaymentContext";


export default function DriverInfoCard(){

    const { user } = useAuth();

    const {
        driver,
        setDriver
    } = usePayment();



    const [name, setName] =
        useState("");

    const [phone, setPhone] =
        useState("");



    useEffect(()=>{

        if(user && !driver){

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

    },[user]);



    function handleNameChange(
        value:string
    ){

        setName(value);


        if(!driver) return;


        setDriver({

            ...driver,

            name:value,

        });

    }



    function handlePhoneChange(
        value:string
    ){

        setPhone(value);


        if(!driver) return;


        setDriver({

            ...driver,

            phone:value,

        });

    }



    return (

        <View>

            <Text>
                Datos del conductor
            </Text>


            <Text>
                Correo
            </Text>

            <Text>
                {driver?.email}
            </Text>



            <Text>
                Nombre
            </Text>

            <TextInput

                value={name}

                onChangeText={
                    handleNameChange
                }

            />



            <Text>
                Teléfono
            </Text>

            <TextInput

                value={phone}

                onChangeText={
                    handlePhoneChange
                }

            />

        </View>

    );

}