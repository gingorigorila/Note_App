import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const forgetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        alert(error);
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
      <KeyboardAvoidingView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ color: "#003580", fontWeight: "700", fontSize: 17 }}>
            Sign In
          </Text>
          <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
            Sign in to your account
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
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
        </View>
        <Pressable
          onPress={() => loginUser(email, password)}
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
            Login
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Signup")}
          style={{ marginTop: 10 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>
            Don't have an account? Sign in{" "}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            forgetPassword();
          }}
          style={{ marginTop: 10 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>
            Forget Password?
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
