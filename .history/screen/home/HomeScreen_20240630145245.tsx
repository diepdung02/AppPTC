import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import COLORS from '../../constants/Color';
import { ApiResponse, fetchUser } from '../../API'; 

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
      <View style={styles.inforContainer}>
        <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        <View style={styles.txtInfor}>
          <Text style={styles.txtName}>{userData.name}</Text>
          <Text style={styles.txtDept}>{userData.dept}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:COLORS.colorMain,
  },
  avatar:{
    width:75,
    height:75,
    marginTop:70,
    marginLeft:20,
  },
  inforContainer:{
    flexDirection:"row",
    alignItems:"center"
  },
  txtInfor:{
    marginTop:70,
    paddingLeft:10,
  },
  txtName:{
    fontSize:20
  },
  txtDept:{
    fontSize:18
  }
});

export default HomeScreen;
