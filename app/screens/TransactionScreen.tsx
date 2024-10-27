import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import { useAccounts } from '../AccountsContext';

type Transaction = {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: 'deposit' | 'withdrawal';
  account: 'Checking' | 'Savings';
};

// Sample transactions with account identifiers
const sampleTransactions: Transaction[] = [
  { id: '1', amount: 150, date: '2024-10-01', description: 'Direct Deposit', type: 'deposit', account: 'Checking' },
  { id: '2', amount: 200, date: '2024-10-15', description: 'Manual Deposit', type: 'deposit', account: 'Savings' },
  { id: '3', amount: 50, date: '2024-10-20', description: 'ATM Withdrawal', type: 'withdrawal', account: 'Checking' },
  { id: '4', amount: 75, date: '2024-10-25', description: 'Withdrawal', type: 'withdrawal', account: 'Savings' },
];

const TransactionScreen: React.FC = () => {
  const { accounts } = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState<'Checking' | 'Savings'>('Checking');

  // Filter transactions based on the selected account
  const filteredTransactions = sampleTransactions.filter(transaction => transaction.account === selectedAccount);
  
  // Get the current balance for the selected account
  const accountBalance = accounts.find(account => account.name === selectedAccount)?.balance || 0;

  return (
    <View style={styles.container}>
      {/* Tabs for Selecting Account */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedAccount === 'Checking' && styles.activeTab]}
          onPress={() => setSelectedAccount('Checking')}
        >
          <Text style={styles.tabText}>Checking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedAccount === 'Savings' && styles.activeTab]}
          onPress={() => setSelectedAccount('Savings')}
        >
          <Text style={styles.tabText}>Savings</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionContainer}>
            <Text style={styles.transactionDescription}>{item.description}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
            <Text
              style={[
                styles.transactionAmount,
                item.type === 'withdrawal' ? styles.withdrawalAmount : styles.depositAmount,
              ]}
            >
              {item.type === 'withdrawal' ? `-$${item.amount.toFixed(2)}` : `+$${item.amount.toFixed(2)}`}
            </Text>
          </View>
        )}
      />

      {/* Total Balance for Selected Account */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Balance: ${accountBalance.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    padding: 20 
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: Colors.accent,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: 'blue', // Active tab color
  },
  tabText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionContainer: {
    backgroundColor: Colors.accent,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  transactionDescription: { 
    fontSize: 16, 
    color: Colors.text, 
    marginBottom: 5 
  },
  transactionDate: { 
    fontSize: 14, 
    color: Colors.text, 
    marginBottom: 5 
  },
  transactionAmount: { 
    fontSize: 18, 
    fontWeight: 'bold',
  },
  depositAmount: {
    color: Colors.text,
  },
  withdrawalAmount: {
    color: 'red',
  },
  totalContainer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.text,
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
});

export default TransactionScreen;