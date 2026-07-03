import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    console.log({
      email,
      password,
    });
    router.replace('/');
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{t('loginForm.submit')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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