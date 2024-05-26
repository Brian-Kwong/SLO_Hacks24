import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const url="http://10.151.71.149:18000";

  async function handleLogin() {
    console.log(username)
    console.log(password)
    const response = await fetch(`${url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response)=>{
      if(response.status === 201){
        response.json().then((data) => {
          SecureStore.setItemAsync("token", data.token).then(() => {
            alert("Signed up");
          }).catch((error) => {
            console.log(error);
          });
        });
      }
      else{
        console.log("Error logging in", response.status)
      }
    }
    ).catch((error) => {console.log(error)});
  }


  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.text}>Sign Up</Text>
        <View>
          <TextInput style={styles.textinput}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCorrect={false}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <View>
        <TextInput style={styles.textinput}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCorrect={false}
          autoCapitalize="none"
        ></TextInput>
        </View>
      </View>
      <View>
        <Pressable onPress={handleLogin}>
          <Text style={styles.text}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    fontSize: 24,  // Increase this value to make the font bigger
    padding: 5,
    textAlign: "center",
  },
  textinput: {
    fontSize: 16,
    padding: 5,
    textAlign: "center",
  },
});
