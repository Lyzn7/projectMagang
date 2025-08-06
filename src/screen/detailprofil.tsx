import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailProfileScreen({ navigation }: any) {
  // Ubah state user untuk menampung data yang lebih lengkap
  // daripada hanya nama pengguna.
  const [user, setUser] = useState<any>({
    name: null,
    email: null,
    phoneNumber: null,
    gender: null,
    birthPlace: null,
    birthDate: null,
    address: null,
    position: null,
    rank: null,
    department: null,
    bankName: null,
    bankAccountNumber: null,
    bankAccountHolder: null,
    joinDate: null,
  });
  const [activeTab, setActiveTab] = useState<'personal' | 'professional' | 'document'>('personal');

  // Ambil data user dari AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Coba ambil data user lengkap
        const storedUserData = await AsyncStorage.getItem('userData'); 
        if (storedUserData) {
          // Jika ada, parse sebagai JSON
          setUser(JSON.parse(storedUserData));
        } else {
          // Jika tidak ada data lengkap, coba ambil nama saja (untuk tampilan sementara)
          const storedUserName = await AsyncStorage.getItem('userName');
          if (storedUserName) {
            setUser((prevUser: any) => ({ ...prevUser, name: storedUserName }));
          }
        }
      } catch (error) {
        console.error('Gagal memuat data user dari AsyncStorage:', error);
      }
    };

    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#007bff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <TouchableOpacity onPress={() => navigation.navigate('editprofil', { user })}>
          <Feather name="edit" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'personal' && styles.activeTab]}
          onPress={() => setActiveTab('personal')}
        >
          <Text style={[styles.tabText, activeTab === 'personal' && styles.activeTabText]}>
            Personal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'professional' && styles.activeTab]}
          onPress={() => setActiveTab('professional')}
        >
          <Text style={[styles.tabText, activeTab === 'professional' && styles.activeTabText]}>
            Professional
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'document' && styles.activeTab]}
          onPress={() => setActiveTab('document')}
        >
          <Text style={[styles.tabText, activeTab === 'document' && styles.activeTabText]}>
            Document
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'personal' && (
          <View>
            <Text style={styles.label}>Nama:</Text>
            <Text style={styles.value}>{user?.name || '-'}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user?.email || '-'}</Text>

            <Text style={styles.label}>No. Telepon:</Text>
            <Text style={styles.value}>{user?.phoneNumber || '-'}</Text>

            <Text style={styles.label}>Jenis Kelamin:</Text>
            <Text style={styles.value}>{user?.gender || '-'}</Text>

            <Text style={styles.label}>Tempat Lahir:</Text>
            <Text style={styles.value}>{user?.birthPlace || '-'}</Text>

            <Text style={styles.label}>Tanggal Lahir:</Text>
            <Text style={styles.value}>
              {user?.birthDate ? new Date(user.birthDate).toLocaleDateString('id-ID') : '-'}
            </Text>

            <Text style={styles.label}>Alamat:</Text>
            <Text style={styles.value}>{user?.address || '-'}</Text>
          </View>
        )}

        {activeTab === 'professional' && (
          <View>
            <Text style={styles.label}>Jabatan:</Text>
            <Text style={styles.value}>{user?.position || 'Karyawan'}</Text>

            <Text style={styles.label}>Pangkat:</Text>
            <Text style={styles.value}>{user?.rank || 'Member Biasa'}</Text>

            <Text style={styles.label}>Departemen:</Text>
            <Text style={styles.value}>{user?.department || 'Umum'}</Text>
          </View>
        )}

        {activeTab === 'document' && (
          <View>
            <Text style={styles.label}>Bank:</Text>
            <Text style={styles.value}>{user?.bankName || '-'}</Text>

            <Text style={styles.label}>No Rekening:</Text>
            <Text style={styles.value}>{user?.bankAccountNumber || '-'}</Text>

            <Text style={styles.label}>Atas Nama:</Text>
            <Text style={styles.value}>{user?.bankAccountHolder || '-'}</Text>

            <Text style={styles.label}>Tanggal Join:</Text>
            <Text style={styles.value}>{user?.joinDate || '-'}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});