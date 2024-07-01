import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const HomeScreen:React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={}>
        <Image source={require("../../assets/avatar.jpg")} style={styles.avatar}></Image>
      <Text style={styles.txtInfor}>HomeScreen</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  
  },
  avatar:{
    width:75,
    height:75,
    marginTop:40,
    marginLeft:20,
  },
  txtInfor:{
    flexDirection:"row"
  }
})

export default HomeScreen