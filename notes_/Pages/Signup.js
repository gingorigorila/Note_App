import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../firebase";

export default function Signup({ navigation }) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");

  registerUser = async (email, password, firstName, lastName, phoneno) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://fir-auth-ed3c4.firebaseapp.com",
          })
          .then(() => {
            alert("Verification email sent");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
                phoneno,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <Text style={{ color: "#003580", fontWeight: "700", fontSize: 17 }}>
          Register
        </Text>
        <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
          Create an account
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <View>
          <Text style={{ fontSize: 17, fontWeight: "500" }}>First name</Text>
          <TextInput
            value={firstName}
            onChangeText={(text) => setFirstname(text)}
            placeholder="enter your first name"
            placeholderTextColor={"black"}
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
              width: 300,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Last name</Text>
          <TextInput
            value={lastName}
            onChangeText={(text) => setLastname(text)}
            placeholder="enter your last name"
            placeholderTextColor={"black"}
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
              width: 300,
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="enter your email"
            placeholderTextColor={"black"}
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
              width: 300,
            }}
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder="enter your password"
            placeholderTextColor={"black"}
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
              width: 300,
            }}
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Phone number</Text>
          <TextInput
            value={phoneno}
            onChangeText={(text) => setPhoneno(text)}
            placeholder="enter your phone number"
            placeholderTextColor={"black"}
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
              width: 300,
            }}
          />
        </View>
      </View>
      <Pressable
        onPress={() =>
          registerUser(email, password, firstName, lastName, phoneno)
        }
        style={{
          backgroundColor: "#003580",
          padding: 15,
          width: 200,
          marginTop: 40,
          marginRight: "auto",
          marginLeft: "auto",
          borderRadius: 7,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 17,
            textAlign: "center",
          }}
        >
          Register
        </Text>
      </Pressable>
      <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>
          Already have an account? Login{" "}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
