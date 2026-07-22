    import { Text, TouchableOpacity, View } from "react-native";

    import AppCard from "../../../shared/components/appCard/AppCard";

    import { useReservation } from "../context/ReservationContext";

    import { createStyles } from "./InsuranceSelector.Style";

    import { themes } from "../../../theme/themes";
    import { useTheme } from "../../../theme/useTheme";
    import { Insurance } from "../../Insurance/type/insurance";

    type Props = {
    readonly options: Insurance[];
    };

    export default function InsuranceSelector({
    options,
    }: Props) {
    const { reservation, updateInsurance } = useReservation();

    const selectedInsurance =
        reservation?.insuranceId ?? null;

    const { themeName } = useTheme();
    const colors = themes[themeName];
    const styles = createStyles(colors);

    return (
        <AppCard>

        <Text style={styles.title}>
            Seguro
        </Text>

        {options.map(option => {

            const selected =
            selectedInsurance === option.id;

            return (

            <TouchableOpacity
                key={option.id}
                style={[
                styles.option,
                selected && styles.selected
                ]}
                onPress={() => updateInsurance(option.id)}
            >

                <View style={{ flex: 1 }}>

                <Text style={styles.optionTitle}>
                    {option.name}
                </Text>

                <Text style={styles.description}>
                    {option.description}
                </Text>

                <Text style={styles.description}>
                    {option.price}
                </Text>

                </View>

                <Text style={styles.radio}>
                {selected ? "●" : "○"}
                </Text>

            </TouchableOpacity>

            );

        })}

        </AppCard>
    );
    }