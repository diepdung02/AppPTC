import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'

const MailScreen:React.FC = () => {
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.text}>MailScreen</Text>
    </View>
    </SafeAreaView>
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