import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

export default function ProfileScreen({ navigation }: any) {
  const [username, setUsername] = useState<string>('Guest User');
  const [avatar, setAvatar] = useState<string>('https://i.pinimg.com/736x/21/f6/fc/21f6fc4abd29ba736e36e540a787e7da.jpg');
  const [loading, setLoading] = useState(true);
  const [userJabatan, setUserJabatan] = useState<string>('Staff');
  const handleSignOut = async (navigation: any) => {
  try {
    // Hapus token dan user info
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');

    // Arahkan ke halaman login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  } catch (error) {
    Alert.alert('Error', 'Gagal keluar, coba lagi.');
    console.error('Error sign out:', error);
  }
};

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedAvatar = await AsyncStorage.getItem('userAvatar');
        const storedJabatan = await AsyncStorage.getItem('userJabatan');

        if (storedJabatan) setUserJabatan(storedJabatan);
        if (storedName) setUsername(storedName);
        if (storedAvatar) setAvatar(storedAvatar);

        setLoading(false);
      } catch (error) {
        console.log('Error loading profile:', error);
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleCameraPress = () => {
    console.log('Fitur ganti foto profil');
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header + Avatar */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
            <Icon name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>{username}</Text>
        <Text style={styles.jabatanText}>{userJabatan}</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('detailprofil')}
        >
          <View style={styles.menuLeft}>
            <Icon name="user" size={24} color="#333" />
            <Text style={styles.menuText}>Profil Saya</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pengaturan</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('changePassword')}>
          <View style={styles.menuLeft} >
            <Icon name="key" size={24} color="#7c3aed" />
            <Text style={styles.menuText}>Keamanan</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Icon name="moon" size={24} color="#0ea5e9" />
            <Text style={styles.menuText}>Dark Mode</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutButton}
  onPress={() =>
    Alert.alert(
      'Konfirmasi',
      'Apakah kamu yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Ya', onPress: () => handleSignOut(navigation) },
      ],
      { cancelable: true }
    )
  }>
  <Text style={ styles.signOutText}>Sign Out</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
  jabatanText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 10,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 30,
  },
  signOutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
});
