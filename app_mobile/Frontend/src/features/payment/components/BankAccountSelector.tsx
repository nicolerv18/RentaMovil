import { useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppCard from "../../../shared/components/AppCard/AppCard";

import { themes } from "../../../theme/themes";
import { useTheme } from "../../../theme/useTheme";

import { usePayment } from "../context/PaymentContext";
import { getActiveBankAccounts } from "../services/paymentService";

import type { BankAccount } from "../../../types";

import { createStyles } from "./BankAccountSelector.styles";

/**
 * Selector de cuenta bancaria de destino.
 *
 * Reemplaza al antiguo `PaymentMethodSelector` (metodos de tarjeta), que no
 * corresponde a este dominio: el pago es transferencia manual y el cliente
 * elige a que cuenta transfiere.
 *
 * Muestra solo cuentas activas (INV-002). El numero de cuenta se muestra
 * completo a proposito: es el dato que el cliente necesita para transferiry
 * el Admin necesita para conciliar.
 */
export default function BankAccountSelector() {
  const { selectedBankAccount, setSelectedBankAccount } = usePayment();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  const { themeName } = useTheme();
  const styles = createStyles(themes[themeName]);

  useEffect(() => {
    let cancelled = false;

    getActiveBankAccounts().then((loaded) => {
      if (!cancelled) {
        setAccounts(loaded);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AppCard>
      <Text style={styles.title}>Cuenta de pago</Text>

      <Text style={styles.subtitle}>
        Transfiere a una de estas cuentas y sube el comprobante
      </Text>

      <View style={styles.accountsContainer}>
        {accounts.map((account) => {
          const selected = selectedBankAccount?.id === account.id;

          return (
            <TouchableOpacity
              key={account.id}
              onPress={() => setSelectedBankAccount(account)}
              style={[
                styles.accountCard,
                selected && styles.selectedAccount,
              ]}
            >
              <View style={styles.accountInfo}>
                <Text style={styles.bankName}>{account.bankName}</Text>

                <Text style={styles.accountType}>
                  {account.accountType}
                </Text>

                <Text style={styles.accountNumber}>
                  {account.accountNumber}
                </Text>

                <Text style={styles.holder}>{account.holderName}</Text>

                {account.qrImageUrl ? (
                  <Image
                    source={{ uri: account.qrImageUrl }}
                    style={{ width: 120, height: 120, marginTop: 10 }}
                    resizeMode="contain"
                  />
                ) : null}
              </View>

              <View
                style={[styles.radio, selected && styles.radioSelected]}
              >
                {selected ? <View style={styles.radioDot} /> : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </AppCard>
  );
}
