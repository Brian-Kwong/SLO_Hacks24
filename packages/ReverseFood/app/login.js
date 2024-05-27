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
import SecureStore from "expo-secure-store";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const url="https://mealathon.azurewebsites.net";

  async function handleLogin() {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response)=>{
      if(response.status === 200){
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
      <Text style={styles.text}>Login</Text>
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
      <Pressable onPress={() => {handleLogin}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
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