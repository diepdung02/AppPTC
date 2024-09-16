import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const VoteScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Nút mở modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openButton}>
        <Text style={styles.openButtonText}>Open Social Apps</Text>
      </TouchableOpacity>

      {/* Modal để hiển thị các icon */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Social</Text>

            <View style={styles.iconContainer}>
              {/* Facebook */}
              <TouchableOpacity style={styles.iconWrapper} onPress={() => alert('Facebook')}>
                <Image
                  source={{ uri: 'https://link_to_facebook_icon' }}
                  style={styles.icon}
                />
                <Text style={styles.iconText}>Facebook</Text>
              </TouchableOpacity>

              {/* Instagram */}
              <TouchableOpacity style={styles.iconWrapper} onPress={() => alert('Instagram')}>
                <Image
                  source={{ uri: 'https://link_to_instagram_icon' }}
                  style={styles.icon}
                />
                <Text style={styles.iconText}>Instagram</Text>
              </TouchableOpacity>

              {/* Zalo */}
              <TouchableOpacity style={styles.iconWrapper} onPress={() => alert('Zalo')}>
                <Image
                  source={{ uri: 'https://link_to_zalo_icon' }}
                  style={styles.icon}
                />
                <Text style={styles.iconText}>Zalo</Text>
              </TouchableOpacity>

              {/* Messenger */}
              <TouchableOpacity style={styles.iconWrapper} onPress={() => alert('Messenger')}>
                <Image
                  source={{ uri: 'https://link_to_messenger_icon' }}
                  style={styles.icon}
                />
                <Text style={styles.iconText}>Messenger</Text>
              </TouchableOpacity>

              {/* TikTok */}
              <TouchableOpacity style={styles.iconWrapper} onPress={() => alert('TikTok')}>
                <Image
                  source={{ uri: 'https://link_to_tiktok_icon' }}
                  style={styles.icon}
                />
                <Text style={styles.iconText}>TikTok</Text>
              </TouchableOpacity>

              {/* YouTube */}
              <TouchableOpacity style={styles.iconWrapper} onPress={() => alert('YouTube')}>
                <Image
                  source={{ uri: 'https://link_to_youtube_icon' }}
                  style={styles.icon}
                />
                <Text style={styles.iconText}>YouTube</Text>
              </TouchableOpacity>
            </View>

            {/* Nút đóng modal */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  openButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  iconWrapper: {
    alignItems: 'center',
    margin: 15,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  iconText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff5c5c',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VoteScreen;
