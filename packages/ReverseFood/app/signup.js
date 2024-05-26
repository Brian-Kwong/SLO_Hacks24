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
    const response = await fetch("10.144.42.152/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const result = await response.json();
    if (result) {
      console.log("Account created");
    } else {
      throw Error("Error creating account");
    }
  }

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.text}>SIGN UP</Text>
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
          <Text>Sign In</Text>
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
    padding: 5
  },
  textinput: {
    fontSize: 16,
    padding: 5,
  },
});
