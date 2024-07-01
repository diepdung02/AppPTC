import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const HomeScreen:React.FC = () => {
  return (
    < s>
      <View>
        <Image source={require("../../assets/avatar.jpg")} style={styles.avatar}></Image>
      </View>
      <Text>HomeScreen</Text>
    </>
  )
}

const styles = StyleSheet.create({
  avatar:{
    width:100,
    height:100,
  }
})

export default HomeScreen