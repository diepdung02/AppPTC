import { View, Text, Image } from 'react-native'
import React from 'react'

const HomeScreen:React.FC = () => {
  return (
    <View>
      <View>
        <Image source={require("../../assets/avatar.jpg")} style={}></Image>
      </View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen