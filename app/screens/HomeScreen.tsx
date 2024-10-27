import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HomeScreen: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<number>(0);
  const mockAccounts = [
    { id: "1", name: "Mock Account 1" },
    { id: "2", name: "Mock Account 2" },
  ];

  const handleTransaction = () => {
    alert(`Transaction of $${amount} completed for ${selectedAccount}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Account</Text>
      <Picker
        selectedValue={selectedAccount}
        onValueChange={(itemValue: string) => setSelectedAccount(itemValue)}
        style={styles.picker}
      >
        {mockAccounts.map(account => (
          <Picker.Item label={account.name} value={account.id} key={account.id} />
        ))}
      </Picker>
      <Text style={styles.text}>Enter Amount:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(amount)}
        onChangeText={(value) => setAmount(Number(value))}
      />
      <Button title="Send Money" color="#D1E3DD" onPress={handleTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#32292F', padding: 20 },
  title: { fontSize: 24, color: '#D1E3DD', marginBottom: 10 },
  picker: { color: '#D1E3DD', marginBottom: 20 },
  text: { color: '#D1E3DD' },
  input: { borderBottomColor: '#D1E3DD', borderBottomWidth: 1, color: '#D1E3DD', marginBottom: 20 }
});

export default HomeScreen;
