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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const response = await fetch("10.144.42.152/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const result = await response.json();
    if (result) {
      console.log("Logged In");
    } else {
      throw Error("Error logging in");
    }
  }
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.text}>LOGIN</Text>
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
      <Pressable onPress={handleLogin}>
        <Text>LOGIN</Text>
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
    padding: 5
  },
  textinput: {
    fontSize: 16,
    padding: 5,
  },
});