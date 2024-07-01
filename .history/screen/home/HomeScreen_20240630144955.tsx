import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import COLORS from '../../constants/Color';
import { ApiResponse, fetchUser } from '../../API'; // Adjust the path to match your file structure

const HomeScreen: React.FC = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = '1'; 
      const response: ApiResponse<any> = await fetchUser(userId);
      if (response.success) {
        setUserData(response.data);
      } else {
        console.error('Error fetching user data:', response.error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        <View style={styles.textInfo}>
          <Text style={styles.textName}>{userData.name}</Text>
          <Text style={styles.textDept}>{userData.dept}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    marginLeft: 20,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
  },
  textInfo: {
    paddingLeft: 10,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textDept: {
    fontSize: 18,
  },
});

export default HomeScreen;
