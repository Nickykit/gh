import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PlayerListScreen from '../screens/PlayerListScreen';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* แทรกรูปภาพโลโก้เชลซี */}
      <Image
        source={{ uri: 'https://logodownload.org/wp-content/uploads/2017/02/chelsea-fc-logo-1.png' }}
        style={styles.logo}
      />
      <Text style={styles.text}>
        เชลซีเป็นสโมสรฟุตบอลที่ก่อตั้งขึ้นในปี ค.ศ. 1905 โดยมีสนามเหย้าคือสนามสแตมฟอร์ดบริดจ์ในกรุงลอนดอน
        ทีมนี้เป็นหนึ่งในสโมสรที่ประสบความสำเร็จมากที่สุดในฟุตบอลอังกฤษและยุโรป คว้าแชมป์พรีเมียร์ลีก, เอฟเอคัพ
        และยูฟ่าแชมเปียนส์ลีกมากมาย
      </Text>

      {/* ปุ่มเพื่อไปยังหน้ารายชื่อนักเตะ */}
      <View style={styles.buttonContainer}>
        <Button 
          title="ดูรายชื่อนักเตะ" 
          onPress={() => navigation.navigate('PlayerList')}
        />
      </View>
      
      {/* ปุ่มเพื่อไปยังหน้าผลการแข่งขัน */}
      <View style={styles.buttonContainer}>
        <Button 
          title="ดูผลการแข่งขัน" 
          onPress={() => navigation.navigate('MatchResults')}
        />
      </View>
      
      {/* ปุ่มเพื่อไปยังหน้าตารางคะแนน */}
      <View style={styles.buttonContainer}>
        <Button 
          title="ดูตารางคะแนน" 
          onPress={() => navigation.navigate('LeagueTable')}
        />
      </View>
    </ScrollView>
  );
};

const MatchResultsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ผลการแข่งขันล่าสุดของเชลซี</Text>
      <Text style={styles.text}>เชลซี 2 - 0 ลิเวอร์พูล</Text>
      <Text style={styles.text}>เชลซี 3 - 1 แมนเชสเตอร์ ซิตี้</Text>
      <Text style={styles.text}>เชลซี 1 - 1 อาร์เซนอล</Text>
      <Text style={styles.text}>เชลซี 4 - 3 แมนเชสเตอร์ ยูไนเต็ด</Text>
      <Text style={styles.text}>เชลซี 1 - 3 สเปอร์ส</Text>
    </View>
  );
};

const LeagueTableScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ตารางคะแนนพรีเมียร์ลีก</Text>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>ทีม</Text>
        <Text style={styles.tableHeader}>แข่ง</Text>
        <Text style={styles.tableHeader}>แต้ม</Text>
      </View>
      {/* ข้อมูลคะแนนตัวอย่าง */}
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>เชลซี</Text>
        <Text style={styles.tableCell}>38</Text>
        <Text style={styles.tableCell}>89</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>แมนเชสเตอร์ ซิตี้</Text>
        <Text style={styles.tableCell}>38</Text>
        <Text style={styles.tableCell}>83</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>ลิเวอร์พูล</Text>
        <Text style={styles.tableCell}>38</Text>
        <Text style={styles.tableCell}>75</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>อาร์เซนอล</Text>
        <Text style={styles.tableCell}>38</Text>
        <Text style={styles.tableCell}>72</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>แมนเชสเตอร์ ยูไนเต็ด</Text>
        <Text style={styles.tableCell}>38</Text>
        <Text style={styles.tableCell}>70</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>สเปอร์ส</Text>
        <Text style={styles.tableCell}>38</Text>
        <Text style={styles.tableCell}>69</Text>
      </View>
      {/* สามารถเพิ่มรายการเพิ่มเติมได้ */}
    </ScrollView>
  );
};

const NongNickApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Chelsea FC' }} />
        <Stack.Screen name="PlayerList" component={PlayerListScreen} options={{ title: 'รายชื่อนักเตะ' }} />
        <Stack.Screen name="MatchResults" component={MatchResultsScreen} options={{ title: 'ผลการแข่งขัน' }} />
        <Stack.Screen name="LeagueTable" component={LeagueTableScreen} options={{ title: 'ตารางคะแนน' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '33%',
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 16,
    width: '33%',
    textAlign: 'center',
  },
});

export default NongNickApp;
