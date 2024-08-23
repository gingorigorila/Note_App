import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";

const Dashboard = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("User does not exits");
        }
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fonSize: 20, fontWeight: "bold" }}>
        {" "}
        Hello, {name.firstName}
      </Text>
      <TouchableOpacity onPress={() => firebase.auth().signOut()}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
