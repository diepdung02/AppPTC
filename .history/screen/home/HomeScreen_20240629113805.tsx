import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const HomeScreen:React.FC = () => {
  return (
    <View>
      <View>
        <Image source={require("../../assets/avatar.jpg")} style={st}></Image>
      </View>
      <Text>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
})

export default HomeScreen