import { View, Text, StyleSheet, S } from 'react-native'
import React from 'react'

const MailScreen:React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MailScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    fontSize:20,
    color:"red",

  }
})

export default MailScreen