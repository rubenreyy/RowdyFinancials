import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';
import Colors from '../constants/Colors';

const ProfileScreen: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const [showLanguageModal, setShowLanguageModal] = useState(false); // Controls modal visibility
  const user = { name: "Mock User", email: "mockuser@example.com" };

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
  ];

  const handleLanguageSelect = (value: string) => {
    setLanguage(value);
    setShowLanguageModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      {/* Profile Information */}
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.infoText}>{user.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.infoText}>{user.email}</Text>

        <Text style={styles.label}>Language:</Text>
        <TouchableOpacity style={styles.languageButton} onPress={() => setShowLanguageModal(true)}>
          <Text style={styles.languageButtonText}>
            {language === 'en' ? 'English' : 'Spanish'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Language Selection Modal */}
      <Modal visible={showLanguageModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setShowLanguageModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Language</Text>
          <FlatList
            data={languageOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleLanguageSelect(item.value)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.modalButton} onPress={() => setShowLanguageModal(false)}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
  title: { 
    fontSize: 24, 
    color: Colors.text, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  profileContainer: { 
    backgroundColor: Colors.accent, 
    borderRadius: 10, 
    padding: 20, 
    marginBottom: 20 
  },
  label: { 
    fontSize: 16, 
    color: Colors.text, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  infoText: { 
    fontSize: 16, 
    color: Colors.text, 
    marginBottom: 15 
  },
  languageButton: { 
    backgroundColor: Colors.background, 
    borderRadius: 8, 
    paddingVertical: 12, 
    alignItems: 'center', 
    marginTop: 10 
  },
  languageButtonText: { 
    color: Colors.text, 
    fontSize: 16 
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
  optionButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%', // Ensures enough room for text
    alignSelf: 'center', // Center each option within the modal
  },
  optionText: {
    color: Colors.text,
    fontSize: 18,
    textAlign: 'center', // Center aligns text within the option
  },
  modalButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    width: '80%',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
