import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

    import { themes } from "../../../theme/themes";
import { useTheme } from "../../../theme/useTheme";
import { Branch } from "../../../types/branch";
import { filterStyles } from "./Filter.style";

    import { branches } from "../../branches/data/branches";

    export type SearchData = {
    branch: Branch;
    startDate: Date;
    endDate: Date;
    };

    type Props = {
    onSearch: (data: SearchData) => void;
    };

    export default function FilterCalendar({ onSearch }: Props) {
    const { t } = useTranslation();
    const { themeName } = useTheme();
    const colors = themes[themeName];
    const styles = filterStyles(colors);

    const today = new Date();
    const getTomorrow = () => {
        const t = new Date();
        t.setDate(t.getDate() + 1);
        return t;
    };
    
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Branch[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

    const [startDate, setStartDate] = useState<Date>(today);
    const [endDate, setEndDate] = useState<Date>(getTomorrow());

    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);

    const [errorBranch, setErrorBranch] = useState("");
    const [errorDate, setErrorDate] = useState("");

    useEffect(() => {
        setErrorDate(
        endDate < startDate ? "La fecha de devolución no puede ser menor." : ""
        );
    }, [startDate, endDate]);

    const handleChange = (value: string) => {
        setQuery(value);
        setErrorBranch("");

        if (!value.trim()) {
        setSuggestions([]);
        return;
        }

        const filtered = branches.filter((branch) =>
        branch.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
    };

    const handleSelect = (branch: Branch) => {
        setQuery(branch.name);
        setSelectedBranch(branch);
        setSuggestions([]);
        setErrorBranch("");
    };

    const applyTime = (date: Date, time: Date | null): Date => {
        const result = new Date(date);
        if (time) {
        result.setHours(time.getHours(), time.getMinutes(), 0, 0);
        }
        return result;
    };

    const handleSubmit = () => {
        if (!selectedBranch) {
        setErrorBranch("Selecciona una sucursal válida.");
        return;
        }

        const finalStartDate = applyTime(startDate, startTime);
        const finalEndDate = applyTime(endDate, endTime);

        onSearch({
        branch: selectedBranch,
        startDate: finalStartDate,
        endDate: finalEndDate,
        });
    };

    const formatDate = (d: Date) => d.toLocaleDateString();
    
    const formatTime = (d: Date | null) => {
        const date = d ?? new Date();
        return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        });
    };

    return (
        <View style={styles.filter}>
        {/* BRANCH */}
        <View style={styles.fieldFull}>
            <Text style={styles.labelFilter}>
            {t("filterCalendar.branch")}
            </Text>

            <TextInput
            style={styles.inputContainer}
            placeholder={t("filterCalendar.deliveryLocationPlaceholder")}
            value={query}
            onChangeText={handleChange}
            />

            {errorBranch ? (
            <Text style={styles.error}>{errorBranch}</Text>
            ) : null}

            {suggestions.length > 0 && (
            <FlatList
                data={suggestions}
                keyExtractor={(item) => item.id.toString()}
                keyboardShouldPersistTaps="handled"
                style={styles.sucursalDropdown}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.sucursalDropdownItem}
                    onPress={() => handleSelect(item)}
                >
                    <Text style={styles.labelFilter}>{item.name}</Text>
                </TouchableOpacity>
                )}
            />
            )}
        </View>

        {/* DATES & TIMES */}
        <View style={styles.row}>
            {/* Start Date */}
            <View style={styles.field}>
            <Text style={styles.labelFilter}>
                {t("filterCalendar.deliveryDate")}
            </Text>
            <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowStartDate(true)}
            >
                <Text>{formatDate(startDate)}</Text>
            </TouchableOpacity>

            {showStartDate && (
                <DateTimePicker
                value={startDate}
                mode="date"
                onChange={(_, d) => {
                    setShowStartDate(false);
                    if (d) setStartDate(d);
                }}
                />
            )}
            </View>

            {/* Start Time */}
            <View style={styles.field}>
            <Text style={styles.labelFilter}>
                {t("filterCalendar.deliveryHour")}
            </Text>
            <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowStartTime(true)}
            >
                <Text>{formatTime(startTime)}</Text>
            </TouchableOpacity>

            {showStartTime && (
                <DateTimePicker
                value={startTime || new Date()}
                mode="time"
                onChange={(_, d) => {
                    setShowStartTime(false);
                    if (d) setStartTime(d);
                }}
                />
            )}
            </View>
        </View>

        {/* RETURN */}
        <View style={styles.row}>
            {/* End Date */}
            <View style={styles.field}>
            <Text style={styles.labelFilter}>
                {t("filterCalendar.returnDate")}
            </Text>
            <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowEndDate(true)}
            >
                <Text>{formatDate(endDate)}</Text>
            </TouchableOpacity>

            {showEndDate && (
                <DateTimePicker
                value={endDate}
                mode="date"
                minimumDate={startDate}
                onChange={(_, d) => {
                    setShowEndDate(false);
                    if (d) setEndDate(d);
                }}
                />
            )}
            </View>

            {/* End Time */}
            <View style={styles.field}>
            <Text style={styles.labelFilter}>
                {t("filterCalendar.returnHour")}
            </Text>
            <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowEndTime(true)}
            >
                <Text>{formatTime(endTime)}</Text>
            </TouchableOpacity>

            {showEndTime && (
                <DateTimePicker
                value={endTime || new Date()}
                mode="time"
                onChange={(_, d) => {
                    setShowEndTime(false);
                    if (d) setEndTime(d);
                }}
                />
            )}
            </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.btnSearch} onPress={handleSubmit}>
            <Text style={styles.btnSearchText}>
            {t("filterCalendar.search")}
            </Text>
        </TouchableOpacity>
        </View>
    );
    }