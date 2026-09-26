import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../../../shared/api/httpClient';
import { API_URL } from '../../../config/env';

/**
 * Traduce el error de una excepcion a algo mostrable.
 *
 * Un fallo de red en React Native lanza un `TypeError` con el mensaje
 * "Network request failed", que no le dice nada a nadie. Lo mas probable
 * es que el mock server no este corriendo, asi que se dice explicitamente.
 */
function readableError(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  const message = error instanceof Error ? error.message : '';

  if (message.includes('Network request failed')) {
    return `No se pudo conectar con la API en ${API_URL}. Verifica que este corriendo.`;
  }

  return message || 'Ocurrio un error inesperado.';
}

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    if (isSubmitting) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.replace("/");
    } catch (err) {
      setError(readableError(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('loginForm.Title')}</Text>

      <View style={styles.form}>
        <TextInput
          placeholder={t('loginForm.emailPlaceholder')}
          placeholderTextColor="#8A8A8A"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder={t('loginForm.passwordPlaceholder')}
          placeholderTextColor="#8A8A8A"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>{t('loginForm.submit')}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: '#B3261E',
    fontSize: 14,
    marginBottom: 12,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  container: {
    flex: 1,
    backgroundColor: '#F1EFE8',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A2E4A',
    marginBottom: 32,
    textAlign: 'center',
  },

  form: {
    gap: 16,
  },

  input: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#2C2C2C',
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },

  button: {
    height: 55,
    backgroundColor: '#1A2E4A',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});