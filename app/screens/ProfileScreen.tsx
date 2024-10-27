import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProfileScreen: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const user = { name: "Mock User", email: "mockuser@example.com" };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Language:</Text>
      <Picker
        selectedValue={language}
        onValueChange={(value: string) => setLanguage(value)}
        style={styles.picker}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Spanish" value="es" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#32292F', padding: 20 },
  title: { fontSize: 24, color: '#D1E3DD', marginBottom: 10 },
  text: { color: '#D1E3DD', marginBottom: 10 },
  picker: { color: '#D1E3DD' }
});

export default ProfileScreen;
