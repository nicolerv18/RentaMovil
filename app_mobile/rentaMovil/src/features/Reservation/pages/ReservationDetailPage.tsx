import {
    ActivityIndicator,
    Alert,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Reservation } from "../types/reservastion";
import {
    cancelReservation,
    getReservationById,
} from "../services/reservationServices";
import { themes } from "../../../theme/themes";
import { useTheme } from "../../../theme/useTheme";
import { createStyles } from "./ReservationDetailPage.style";

const statusLabels: Record<Reservation["status"], string> = {
    PENDING: "Pendiente",
    CONFIRMED: "Confirmada",
    COMPLETED: "Completada",
    CANCELLED: "Cancelada",
};

export default function ReservationDetailPage() {
    const { id } = useLocalSearchParams();
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const { themeName } = useTheme();
    const colors = themes[themeName];
    const styles = createStyles(colors);

    useEffect(() => {
        async function loadReservation() {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                const data = await getReservationById(String(id));
                setReservation(data ?? null);
            } catch (error) {
                console.log("Error cargando reserva:", error);
            } finally {
                setLoading(false);
            }
        }

        loadReservation();
    }, [id]);

    async function handleCancelReservation() {
        if (!reservation || isCancelling) return;

        setIsCancelling(true);

        try {
            const updatedReservation = await cancelReservation(reservation.id);

            if (!updatedReservation) {
                Alert.alert("Error", "No se encontró la reserva.");
                return;
            }

            setReservation(updatedReservation);
            setIsCancelModalVisible(false);
            Alert.alert("Reserva cancelada", "Tu reserva ha sido cancelada correctamente.");
        } catch (error) {
            console.log("Error cancelando reserva:", error);
            Alert.alert("Error", "No fue posible cancelar la reserva.");
        } finally {
            setIsCancelling(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.stateContainer}>
                <ActivityIndicator color={colors.primary} size="large" />
                <Text style={styles.stateText}>Cargando reserva...</Text>
            </View>
        );
    }

    if (!reservation) {
        return (
            <View style={styles.stateContainer}>
                <Text style={styles.stateTitle}>Reserva no encontrada</Text>
                <Text style={styles.stateText}>No pudimos cargar los detalles de esta reserva.</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const canCancel = reservation.status === "CONFIRMED";

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Detalle de la reserva</Text>
                    <View style={[styles.statusBadge, reservation.status === "CANCELLED" && styles.cancelledBadge]}>
                        <Text style={[styles.statusText, reservation.status === "CANCELLED" && styles.cancelledStatusText]}>
                            {statusLabels[reservation.status]}
                        </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Vehículo</Text>
                    <Text style={styles.vehicleName}>{reservation.vehicle.name}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Información del viaje</Text>
                    <DetailRow label="Recogida" value={reservation.pickupBranch.name} styles={styles} />
                    <DetailRow label="Devolución" value={reservation.returnBranch.name} styles={styles} />
                    <DetailRow label="Fecha de recogida" value={reservation.pickupDate} styles={styles} />
                    <DetailRow label="Fecha de devolución" value={reservation.returnDate} styles={styles} last />
                </View>

                <View style={styles.totalCard}>
                    <Text style={styles.totalLabel}>Total a pagar</Text>
                    <Text style={styles.totalAmount}>${reservation.amount.toLocaleString()}</Text>
                </View>

                {canCancel && (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel="Cancelar reserva"
                        activeOpacity={0.85}
                        style={styles.cancelButton}
                        onPress={() => setIsCancelModalVisible(true)}
                    >
                        <Text style={styles.cancelButtonText}>Cancelar reserva</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            <Modal
                visible={isCancelModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => !isCancelling && setIsCancelModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => !isCancelling && setIsCancelModalVisible(false)}
                >
                    <Pressable style={styles.modalContent} onPress={(event) => event.stopPropagation()}>
                        <View style={styles.modalIcon}>
                            <Text style={styles.modalIconText}>!</Text>
                        </View>
                        <Text style={styles.modalTitle}>¿Cancelar reserva?</Text>
                        <Text style={styles.modalMessage}>
                            ¿De verdad quieres cancelar la reserva de {reservation.vehicle.name}? Esta acción no se puede deshacer.
                        </Text>

                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                disabled={isCancelling}
                                style={styles.keepButton}
                                onPress={() => setIsCancelModalVisible(false)}
                            >
                                <Text style={styles.keepButtonText}>Conservar reserva</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={isCancelling}
                                style={[styles.confirmCancelButton, isCancelling && styles.disabledButton]}
                                onPress={handleCancelReservation}
                            >
                                <Text style={styles.confirmCancelButtonText}>
                                    {isCancelling ? "Cancelando..." : "Sí, cancelar"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}

function DetailRow({
    label,
    value,
    styles,
    last = false,
}: {
    label: string;
    value: string;
    styles: ReturnType<typeof createStyles>;
    last?: boolean;
}) {
    return (
        <View style={[styles.detailRow, last && styles.lastDetailRow]}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
}
