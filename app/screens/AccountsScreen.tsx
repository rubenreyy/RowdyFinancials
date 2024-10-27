import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface Account {
  id: string;
  name: string;
  balance: number;
}

const AccountsScreen: React.FC = () => {
  const [newAccount, setNewAccount] = useState<{ name: string; type: string; initialBalance: number }>({
    name: '',
    type: 'Checking',
    initialBalance: 0,
  });
  
  const [accounts, setAccounts] = useState<Account[]>([
    { id: "1", name: "Mock Account 1", balance: 1000 },
    { id: "2", name: "Mock Account 2", balance: 2000 },
  ]);

  const createAccount = () => {
    // Convert `initialBalance` to `balance` to match `Account` interface
    const account: Account = {
      id: String(accounts.length + 1),
      name: newAccount.name,
      balance: newAccount.initialBalance,
    };
    
    setAccounts([...accounts, account]);
    setNewAccount({ name: '', type: 'Checking', initialBalance: 0 });
    alert(`Created new account: ${account.name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Accounts</Text>
      {accounts.map(account => (
        <Text style={styles.account} key={account.id}>{account.name}: ${account.balance}</Text>
      ))}
      <Text style={styles.text}>Create New Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newAccount.name}
        onChangeText={(value) => setNewAccount({ ...newAccount, name: value })}
      />
      <Button title="Create Account" color="#D1E3DD" onPress={createAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#32292F', padding: 20 },
  title: { fontSize: 24, color: '#D1E3DD', marginBottom: 10 },
  account: { color: '#D1E3DD' },
  text: { color: '#D1E3DD' },
  input: { borderBottomColor: '#D1E3DD', borderBottomWidth: 1, color: '#D1E3DD', marginBottom: 20 }
});

export default AccountsScreen;
