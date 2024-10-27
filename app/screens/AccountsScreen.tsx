import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { useAccounts } from '../AccountsContext';

const AccountsScreen: React.FC = () => {
  const { accounts, updateAccountBalance } = useAccounts();

  const [depositPercentage, setDepositPercentage] = useState<number>(0);
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<'none' | 'transferFromChecking' | 'savingsOptions' | 'setPercentage' | 'transferToChecking'>('none');

  const handleDepositChange = (percentage: string) => {
    const parsed = parseFloat(percentage);
    if (parsed >= 0 && parsed <= 100) setDepositPercentage(parsed);
  };

  const handleTransfer = (fromAccount: string, toAccount: string, amount: number) => {
    const from = accounts.find(acc => acc.name === fromAccount);
    const to = accounts.find(acc => acc.name === toAccount);

    if (from && to && from.balance >= amount) {
      updateAccountBalance(from.id, -amount); 
      updateAccountBalance(to.id, amount); 
      alert(`Transferred $${amount.toFixed(2)} from ${fromAccount} to ${toAccount}`);
    } else {
      alert(`Insufficient funds in ${fromAccount}.`);
    }

    setTransferAmount('');
    setModalVisible('none');
  };

  return (
    <View style={styles.container}>
      {/* Checking Account */}
      <TouchableOpacity style={styles.accountContainer} onPress={() => setModalVisible('transferFromChecking')}>
        <Text style={styles.accountName}>Checking</Text>
        <Text style={styles.accountBalance}>${(accounts.find(acc => acc.name === 'Checking')?.balance || 0).toFixed(2)}</Text>
        <Text style={styles.accountDescription}>Tap to transfer to Savings</Text>
      </TouchableOpacity>

      {/* Savings Account */}
      <TouchableOpacity style={styles.accountContainer} onPress={() => setModalVisible('savingsOptions')}>
        <Text style={styles.accountName}>Savings</Text>
        <Text style={styles.accountBalance}>${(accounts.find(acc => acc.name === 'Savings')?.balance || 0).toFixed(2)}</Text>
        <Text style={styles.accountDescription}>Tap to set deposit percentage or transfer to Checking</Text>
      </TouchableOpacity>

      {/* Modal for Checking Transfer Options */}
      <Modal visible={modalVisible === 'transferFromChecking'} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => { setModalVisible('none'); Keyboard.dismiss(); }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.modalTitle}>Transfer from Checking to Savings</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter transfer amount"
              keyboardType="numeric"
              value={transferAmount}
              onChangeText={setTransferAmount}
            />
            <TouchableOpacity style={styles.modalButton} onPress={() => handleTransfer('Checking', 'Savings', parseFloat(transferAmount))}>
              <Text style={styles.modalButtonText}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible('none')}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal for Savings Options */}
      <Modal visible={modalVisible === 'savingsOptions'} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => { setModalVisible('none'); Keyboard.dismiss(); }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Savings Options</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible('setPercentage')}>
            <Text style={styles.modalButtonText}>Set Savings Percentage</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible('transferToChecking')}>
            <Text style={styles.modalButtonText}>Transfer to Checking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible('none')}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for Setting Deposit Percentage */}
      <Modal visible={modalVisible === 'setPercentage'} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => { setModalVisible('none'); Keyboard.dismiss(); }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.modalTitle}>Set Deposit Percentage to Savings</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter percentage (0-100)"
              keyboardType="numeric"
              value={String(depositPercentage)}
              onChangeText={handleDepositChange}
            />
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible('none')}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible('none')}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal for Transfer to Checking */}
      <Modal visible={modalVisible === 'transferToChecking'} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => { setModalVisible('none'); Keyboard.dismiss(); }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.modalTitle}>Transfer from Savings to Checking</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter transfer amount"
              keyboardType="numeric"
              value={transferAmount}
              onChangeText={setTransferAmount}
            />
            <TouchableOpacity style={styles.modalButton} onPress={() => handleTransfer('Savings', 'Checking', parseFloat(transferAmount))}>
              <Text style={styles.modalButtonText}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible('none')}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    padding: 20 
  },
  accountContainer: { 
    backgroundColor: Colors.accent, 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 20 
  },
  accountName: { 
    fontSize: 20, 
    color: Colors.text 
  },
  accountBalance: { 
    fontSize: 24, 
    color: Colors.text, 
    fontWeight: 'bold' 
  },
  accountDescription: { 
    fontSize: 14, 
    color: Colors.text, 
    marginTop: 5 
  },
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
  scrollViewContent: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  modalTitle: { 
    fontSize: 20, 
    color: Colors.text, 
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: { 
    borderBottomColor: Colors.text, 
    borderBottomWidth: 1, 
    color: Colors.text, 
    marginBottom: 20, 
    width: '100%', 
    padding: 5,
    textAlign: 'center',
    fontSize: 18
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

export default AccountsScreen;
