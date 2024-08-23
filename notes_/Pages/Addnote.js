import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Addnote() {
  return (
    <View>
      <Text style = {styles.Addnote}>Addnote</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    Addnote: {
        textAlign: 'center'
    }
})