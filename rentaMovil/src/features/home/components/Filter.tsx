    import React, { useEffect, useState } from "react";
    import { filterStyles } from "./Filter.style";
    import {useTranslation} from "react-i18next";
    import { useTheme } from "../../../theme/useTheme";
    import { themes } from "../../../theme/themes";
    import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    } from "react-native";
    import DateTimePicker from "@react-native-community/datetimepicker";
    import { branches } from "../data/branches";
    type SearchData = {
    branch: string;
    startDate: Date;
    endDate: Date;
    };

    type FilterCalendarProps = {
    onSearch: (data: SearchData) => void;
    setPickupDate?: (date: Date) => void;
    setReturnDate?: (date: Date) => void;
    };

    const FilterCalendar = ({ onSearch, setPickupDate, setReturnDate }: FilterCalendarProps) => {
    const today = new Date();
    const getTomorrow = () => {
        const t = new Date();
        t.setDate(t.getDate() + 1);
        return t;
    };
    const { t } = useTranslation();
    const [query, setQuery] = useState("");
    const [sugerencias, setSugerencias] = useState<string[]>([]);
    const [seleccionado, setSeleccionado] = useState("");
    const [date, setDate] = useState<Date>(today);
    const [dateReturn, setDateReturn] = useState<Date>(getTomorrow());
    const [hora, setHora] = useState<Date>(today);
    const [returnHora, setReturnHora] = useState<Date>(today);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
    const [showHourPicker, setShowHourPicker] = useState(false);
    const [showReturnHourPicker, setShowReturnHourPicker] = useState(false);
    const [success, setSuccess] = useState("");
    const [errorSucursal, setErrorSucursal] = useState("");
    const [errorFecha, setErrorFecha] = useState("");
    const [errorHora, setErrorHora] = useState("");
    const [errorReturnHora, setErrorReturnHora] = useState("");

    useEffect(() => {
        setErrorFecha(dateReturn < date ? "La fecha de devolución no puede ser menor." : "");
    }, [date, dateReturn]);

    useEffect(() => { if (setPickupDate) setPickupDate(date); }, [date]);
    useEffect(() => { if (setReturnDate) setReturnDate(dateReturn); }, [dateReturn]);

    const handleChange = (value: string) => {
        setQuery(value);
        setSeleccionado("");
        setErrorSucursal("");
        if (!value.trim()) { setSugerencias([]); return; }
        setSugerencias(branches.filter((s) => s.toLowerCase().includes(value.toLowerCase())));
    };

    const handleSelect = (sucursal: string) => {
        setQuery(sucursal);
        setSeleccionado(sucursal);
        setSugerencias([]);
    };

    const validarHora = (f: Date) => { const h = f.getHours(); return h >= 8 && h <= 18; };
    const formatDate = (f: Date) => f.toLocaleDateString();
    const formatHour = (f: Date) => f.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const handleSubmit = () => {
        setErrorSucursal(""); setErrorHora(""); setErrorReturnHora(""); setSuccess("");
        if (!seleccionado) { setErrorSucursal("Selecciona una sucursal válida."); return; }
        if (!validarHora(hora)) { setErrorHora("La hora debe estar entre 8 AM y 6 PM."); return; }
        if (!validarHora(returnHora)) { setErrorReturnHora("La hora debe estar entre 8 AM y 6 PM."); return; }
        onSearch({ branch: seleccionado, startDate: date, endDate: dateReturn });
    };
    
    
        const { themeName } = useTheme();
    
        const colors = themes[themeName];
    
        const styles = filterStyles(colors);

    return (
        <View style={styles.filter}>
        <View style={styles.fieldFull}>
            <Text style={styles.labelFilter}>{t("filterCalendar.branch")}</Text>
            <TextInput
            style={[styles.inputContainer, errorSucursal ? styles.inputInvalid : undefined]}
            placeholder={t("filterCalendar.deliveryLocationPlaceholder")}
            placeholderTextColor={styles.labelFilter.color}
            value={query}
            onChangeText={handleChange}
            />
            {errorSucursal ? <Text style={styles.error}>{errorSucursal}</Text> : null}
            {sugerencias.length > 0 && (
            <FlatList
                data={sugerencias}
                keyExtractor={(_, i) => i.toString()}
                style={styles.sucursalDropdown}
                renderItem={({ item }) => (
                <TouchableOpacity style={styles.sucursalDropdownItem} onPress={() => handleSelect(item)}>
                    <Text style={styles.labelFilter}>{item}</Text>
                </TouchableOpacity>
                )}
            />
            )}
        </View>
        <View style={styles.row}>
            <View style={styles.field}>
            <Text style={styles.labelFilter}>{t("filterCalendar.deliveryDate")}</Text>
            <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.labelFilter}>{formatDate(date)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker value={date} mode="date" minimumDate={today}
                onChange={(_, d) => { setShowDatePicker(false); if (d) setDate(d); }} />
            )}
            {errorFecha ? <Text style={styles.error}>{errorFecha}</Text> : null}
            </View>

            <View style={styles.field}>
            <Text style={styles.labelFilter}>{t("filterCalendar.deliveryHour")}</Text>
            <TouchableOpacity style={styles.inputContainer} onPress={() => setShowHourPicker(true)}>
                <Text style={styles.labelFilter}>{formatHour(date)}</Text>
            </TouchableOpacity>
            {showReturnDatePicker && (
                <DateTimePicker value={dateReturn} mode="date" minimumDate={date}
                onChange={(_, d) => { setShowReturnDatePicker(false); if (d) setDateReturn(d); }} />
            )}
            </View>
        </View>

        <View style={styles.row}>
            <View style={styles.field}>
            <Text style={styles.labelFilter}>{t("filterCalendar.returnDate")}</Text>
            <TouchableOpacity style={styles.inputContainer} onPress={() => setShowReturnDatePicker(true)}>
                <Text style={styles.labelFilter}>{formatDate(dateReturn)}</Text>
            </TouchableOpacity>
            {showReturnDatePicker && (
                <DateTimePicker value={dateReturn} mode="date" minimumDate={date}
                onChange={(_, d) => { setShowReturnDatePicker(false); if (d) setDateReturn(d); }} />
            )}
            </View>

            <View style={styles.field}>
            <Text style={styles.labelFilter}>{t("filterCalendar.returnHour")}</Text>
            <TouchableOpacity style={styles.inputContainer} onPress={() => setShowReturnHourPicker(true)}>
                <Text style={styles.labelFilter}>{formatHour(dateReturn)}</Text>
            </TouchableOpacity>
            {showReturnHourPicker && (
                <DateTimePicker value={dateReturn} mode="time" minimumDate={date}
                onChange={(_, d) => { setShowReturnHourPicker(false); if (d) setDateReturn(d); }} />
            )}
            </View>
        </View>

        <TouchableOpacity style={styles.btnSearch} onPress={handleSubmit}>
            <Text style={styles.btnSearchText}>{t("filterCalendar.search")}</Text>
        </TouchableOpacity>

        {success ? (
            <Text style={styles.btnSearchText}>{success}</Text>
        ) : null}

        </View>
    );
    };

    export default FilterCalendar;