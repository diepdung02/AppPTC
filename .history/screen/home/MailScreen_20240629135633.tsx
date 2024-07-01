import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const MailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MailScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:""
  }
})

export default MailScreen