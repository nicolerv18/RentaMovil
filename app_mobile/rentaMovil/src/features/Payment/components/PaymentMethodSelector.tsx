import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import AppCard from "../../../shared/components/appCard/AppCard";

import { paymentMethods } from "../data/paymentMethod";

import { usePayment } from "../context/PaymentContext";

import { useTheme } from "../../../theme/useTheme";
import { themes } from "../../../theme/themes";

import { createStyles } from "./PaymentMethodSelector.style";


export default function PaymentMethodSelector() {


    const {

        selectedPaymentMethod,

        setSelectedPaymentMethod,

    } = usePayment();


    const {
        themeName,
    } = useTheme();


    const colors =
        themes[themeName];


    const styles =
        createStyles(colors);


    return (


        <AppCard>


            <Text
                style={styles.title}
            >

                Método de pago

            </Text>


            <Text
                style={styles.subtitle}
            >

                Selecciona cómo deseas pagar tu reserva

            </Text>


            <View
                style={styles.methodsContainer}
            >


                {
                    paymentMethods.map(

                        method => {


                            const selected =

                                selectedPaymentMethod?.id ===
                                method.id;


                            return (


                                <TouchableOpacity


                                    key={method.id}


                                    disabled={
                                        !method.enabled
                                    }


                                    onPress={() =>

                                        setSelectedPaymentMethod(
                                            method
                                        )

                                    }


                                    style={[

                                        styles.methodCard,


                                        selected &&
                                        styles.selectedMethod,


                                        !method.enabled &&
                                        styles.disabledMethod,

                                    ]}


                                >


                                    <View
                                        style={styles.methodInfo}
                                    >


                                        <Text
                                            style={styles.methodName}
                                        >

                                            {
                                                method.name
                                            }

                                        </Text>


                                        <Text
                                            style={styles.description}
                                        >

                                            {
                                                method.description
                                            }

                                        </Text>


                                        {
                                            !method.enabled && (


                                                <Text
                                                    style={
                                                        styles.unavailable
                                                    }
                                                >

                                                    No disponible

                                                </Text>


                                            )
                                        }


                                    </View>


                                    <View

                                        style={[

                                            styles.radio,


                                            selected &&
                                            styles.radioSelected,

                                        ]}

                                    >

                                        {
                                            selected && (

                                                <View
                                                    style={
                                                        styles.radioDot
                                                    }
                                                />

                                            )
                                        }

                                    </View>


                                </TouchableOpacity>


                            );

                        }

                    )


                }


            </View>


        </AppCard>


    );

}