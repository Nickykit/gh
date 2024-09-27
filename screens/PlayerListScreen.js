import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialPlayers = [
  { id: '1', name: 'Enzo Fernández', position: 'Midfielder#8', image: 'https://th.bing.com/th/id/OIP.xC3b5oFJK9Es4AfI0HGaVgAAAA?rs=1&pid=ImgDetMain' },
  { id: '2', name: 'Pedro Neto', position: 'Forward#7', image: 'https://th.bing.com/th/id/OIP.b-rjQFYCbBE4AVWaajb_RAHaEK?w=1200&h=675&rs=1&pid=ImgDetMain' },
  { id: '3', name: 'Raheem Sterling', position: 'Forward#43', image: 'https://i2-prod.dailystar.co.uk/incoming/article31399371.ece/ALTERNATES/s615b/2_Tottenham-Hotspur-v-Chelsea-FC-Premier-League.jpg' },
];

const PlayerListScreen = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '', image: '' });
  const [editingPlayerId, setEditingPlayerId] = useState(null);

  const savePlayersToStorage = async (updatedPlayers) => {
    try {
      await AsyncStorage.setItem('players', JSON.stringify(updatedPlayers));
      setPlayers(updatedPlayers);
      Alert.alert('Success', 'บันทึกผู้เล่นเรียบร้อยแล้ว');
    } catch (error) {
      Alert.alert('Error', 'ไม่สามารถบันทึกข้อมูลได้');
    }
  };

  const loadPlayersFromStorage = async () => {
    try {
      const storedPlayers = await AsyncStorage.getItem('players');
      if (storedPlayers !== null) {
        setPlayers(JSON.parse(storedPlayers));
      }
    } catch (error) {
      Alert.alert('Error', 'ไม่สามารถโหลดข้อมูลได้');
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('players');
      setPlayers(initialPlayers);
      Alert.alert('Success', 'ลบข้อมูลผู้เล่นแล้ว');
    } catch (error) {
      Alert.alert('Error', 'ไม่สามารถลบข้อมูลได้');
    }
  };

  const addPlayer = () => {
    if (newPlayer.name && newPlayer.position && newPlayer.image) {
      const updatedPlayers = [...players, { ...newPlayer, id: (players.length + 1).toString() }];
      savePlayersToStorage(updatedPlayers);
      setNewPlayer({ name: '', position: '', image: '' });
    } else {
      Alert.alert('Error', 'กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  const editPlayer = (player) => {
    setNewPlayer({ name: player.name, position: player.position, image: player.image });
    setEditingPlayerId(player.id);
  };

  const updatePlayer = () => {
    if (editingPlayerId) {
      const updatedPlayers = players.map((player) =>
        player.id === editingPlayerId ? { ...player, ...newPlayer } : player
      );
      savePlayersToStorage(updatedPlayers);
      setNewPlayer({ name: '', position: '', image: '' });
      setEditingPlayerId(null);
    } else {
      Alert.alert('Error', 'ไม่สามารถแก้ไขได้');
    }
  };

  const deletePlayer = (id) => {
    const updatedPlayers = players.filter((player) => player.id !== id);
    savePlayersToStorage(updatedPlayers);
  };

  useEffect(() => {
    loadPlayersFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="บันทึกผู้เล่นลง Storage" onPress={() => savePlayersToStorage(players)} />
      <Button title="ลบข้อมูลผู้เล่นทั้งหมด" onPress={clearStorage} />

      <TextInput
        style={styles.input}
        placeholder="ชื่อผู้เล่น"
        value={newPlayer.name}
        onChangeText={(text) => setNewPlayer({ ...newPlayer, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="ตำแหน่ง"
        value={newPlayer.position}
        onChangeText={(text) => setNewPlayer({ ...newPlayer, position: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="URL รูปภาพ"
        value={newPlayer.image}
        onChangeText={(text) => setNewPlayer({ ...newPlayer, image: text })}
      />
      {editingPlayerId ? (
        <Button title="แก้ไขผู้เล่น" onPress={updatePlayer} />
      ) : (
        <Button title="เพิ่มผู้เล่น" onPress={addPlayer} />
      )}

      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerItem}>
            <Image source={{ uri: item.image }} style={styles.playerImage} />
            <View>
              <Text style={styles.playerName}>{item.name}</Text>
              <Text style={styles.playerPosition}>{item.position}</Text>
            </View>
            <TouchableOpacity onPress={() => editPlayer(item)}>
              <Text style={styles.editButton}>แก้ไข</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deletePlayer(item.id)}>
              <Text style={styles.deleteButton}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  playerItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerPosition: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default PlayerListScreen;
