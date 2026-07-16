import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import AppCard from "../../../shared/components/appCard/AppCard";

import { paymentMethods } from "../data/paymentMethod";

import { usePayment } from "../context/PaymentContext";


export default function PaymentMethodSelector(){

    const {
        selectedPaymentMethod,
        setSelectedPaymentMethod,
    } = usePayment();


    return (

        <AppCard>

            <Text>
                Método de pago
            </Text>


            {paymentMethods.map(method => {

                const selected =
                    selectedPaymentMethod?.id === method.id;


                return (

                    <TouchableOpacity

                        key={method.id}

                        disabled={!method.enabled}

                        onPress={() =>
                            setSelectedPaymentMethod(method)
                        }

                    >

                        <View>

                            <Text>
                                {method.name}
                            </Text>

                            <Text>
                                {method.description}
                            </Text>


                            {!method.enabled && (

                                <Text>
                                    No disponible
                                </Text>

                            )}

                        </View>


                        <Text>
                            {selected ? "●" : "○"}
                        </Text>


                    </TouchableOpacity>

                );

            })}

        </AppCard>

    );

}