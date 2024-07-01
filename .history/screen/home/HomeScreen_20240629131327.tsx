import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../../constants/Color'

const HomeScreen:React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inforContainer}>
        <Image source={require("../../assets/avatar.jpg")} style={styles.avatar}></Image>
        <View style={styles.txtInfor}>
      <Text style={styles.txtName}>Diệp Minh Dũng</Text>
      <Text style={styles.txtDept}>Intern ERP</Text>
      </View>
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
    marginTop:50,
    paddingLeft:10,
  },
  txtName:{
    fontSize:20
  },
  txtDept:{
    fontSize
  }
})

export default HomeScreen