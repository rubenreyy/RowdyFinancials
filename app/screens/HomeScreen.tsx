import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { useAccounts } from '../AccountsContext';

const HomeScreen: React.FC = () => {
  const { accounts, updateAccountBalance } = useAccounts(); // Access accounts and update function from context

  const [selectedAccount, setSelectedAccount] = useState<string>('Checking');
  const [showDropdownMenu, setShowDropdownMenu] = useState(false); // Toggle menu visibility
  const [amount, setAmount] = useState<string>(''); // Store amount as a string for easy concatenation

  const handleAccountSelect = (accountName: string) => {
    setSelectedAccount(accountName);
    setShowDropdownMenu(false); // Hide menu after selection
  };

  const handlePress = (value: string) => {
    if (value === 'C') {
      setAmount(''); // Clear the amount
    } else if (value === '.') {
      if (!amount.includes('.')) {
        setAmount(prevAmount => prevAmount + value); // Add decimal point only if it doesn't already exist
      }
    } else {
      // Ensure input only allows two decimal places
      if (amount.includes('.')) {
        const [integer, decimal] = amount.split('.');
        if (decimal.length < 2) {
          setAmount(prevAmount => prevAmount + value);
        }
      } else {
        setAmount(prevAmount => prevAmount + value);
      }
    }
  };

  const handleSend = () => {
    const amountNumber = parseFloat(amount); // Convert amount to a number

    if (selectedAccount && amountNumber > 0) {
      // Find the selected account by name and deduct the amount
      const account = accounts.find(acc => acc.name === selectedAccount);
      if (account && account.balance >= amountNumber) {
        updateAccountBalance(account.id, -amountNumber); // Subtract the amount
        alert(`Transaction of $${amount} sent from ${selectedAccount}`);
        setAmount(''); // Clear the amount after sending
      } else {
        alert(`Insufficient funds in ${selectedAccount}.`);
      }
    } else {
      alert('Please select an account and enter a valid amount.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Account Selection Button */}
        <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowDropdownMenu(true)}>
          <Text style={styles.dropdownButtonText}>{selectedAccount}</Text>
        </TouchableOpacity>

        {/* Modal Dropdown Menu */}
        <Modal visible={showDropdownMenu} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={() => setShowDropdownMenu(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Account</Text>
            {accounts.map(account => (
              <TouchableOpacity 
                key={account.id} 
                style={styles.modalButton} 
                onPress={() => handleAccountSelect(account.name)}
              >
                <Text style={styles.modalButtonText}>{account.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowDropdownMenu(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Display Entered Amount */}
        <Text style={styles.amountText}>${amount || '0'}</Text>

        {/* Numeric Keypad */}
        <View style={styles.keyboardContainer}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'C'].map((key) => (
            <TouchableOpacity 
              key={key} 
              style={styles.keyButton} 
              onPress={() => handlePress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    padding: 20,
    alignItems: 'center',
  },
  dropdownButton: { 
    backgroundColor: Colors.accent, 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 20,
    width: '80%',
  },
  dropdownButtonText: { 
    color: Colors.text, 
    fontSize: 16,
  },
  amountText: { 
    fontSize: 50,
    color: Colors.text, 
    marginBottom: 20,
  },
  keyboardContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    width: '80%',
    marginBottom: 20,
  },
  keyButton: { 
    backgroundColor: Colors.accent, 
    width: 70,
    height: 70,
    borderRadius: 35, 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 10, 
  },
  keyText: { 
    fontSize: 24,
    color: Colors.text,
  },
  sendButton: { 
    backgroundColor: Colors.accent, 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    width: '80%',
    marginBottom: 20,
  },
  sendButtonText: { 
    color: Colors.text, 
    fontSize: 18, 
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.background,
    padding: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: { 
    fontSize: 20, 
    color: Colors.text, 
    marginBottom: 15,
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    width: '80%',
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
