import {
    Text,
    TextInput,
    View,
} from "react-native";

import { usePayment } from "../context/PaymentContext";

export default function CardPaymentForm() {

    const {
        card,
        setCard,
    } = usePayment();


    return (

        <View>

            <Text>
                Número de tarjeta
            </Text>

            <TextInput

                value={
                    card.cardNumber
                }

                onChangeText={

                    value =>

                        setCard({

                            ...card,

                            cardNumber:
                                value,

                        })

                }

                placeholder="0000 0000 0000 0000"

                keyboardType="numeric"

            />


            <Text>
                Nombre del titular
            </Text>

            <TextInput

                value={
                    card.cardHolder
                }

                onChangeText={

                    value =>

                        setCard({

                            ...card,

                            cardHolder:
                                value,

                        })

                }

                placeholder="Nombre completo"

            />


            <View>

                <View>

                    <Text>
                        Fecha de vencimiento
                    </Text>

                    <TextInput

                        value={
                            card.expirationDate
                        }

                        onChangeText={

                            value =>

                                setCard({

                                    ...card,

                                    expirationDate:
                                        value,

                                })

                        }

                        placeholder="MM/AA"

                    />

                </View>


                <View>

                    <Text>
                        CVV
                    </Text>

                    <TextInput

                        value={
                            card.cvv
                        }

                        onChangeText={

                            value =>

                                setCard({

                                    ...card,

                                    cvv: value,

                                })

                        }

                        placeholder="123"

                        secureTextEntry

                        keyboardType="numeric"

                    />

                </View>

            </View>

        </View>

    );

}