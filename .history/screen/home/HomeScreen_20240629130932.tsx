import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../../constants/Color'

const HomeScreen:React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inforContainer}>
        <Image source={require("../../assets/avatar.jpg")} style={styles.avatar}></Image>
      <Text style={styles.txtInfor}></Text>
      <Text style={styles.txtInfor}></Text>
      </View>
    </View>
  )
}

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
    fontSize:20,
    marginTop:50,
  }
})

export default HomeScreen