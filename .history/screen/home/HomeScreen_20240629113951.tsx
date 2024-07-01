import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const HomeScreen:React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/avatar.jpg")} style={styles.avatar}></Image>
      </View>
      <Text>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    
  }
  avatar:{
    width:100,
    height:100,
  }
})

export default HomeScreen