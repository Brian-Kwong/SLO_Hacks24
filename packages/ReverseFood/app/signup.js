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
    const response = await fetch("localhost:3000/auth/register", {
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
    <View>
      <Text>Sign Up</Text>
      <View>
        <TextInput
          placeholder="USERNAME"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="PASSWORD"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <Pressable onPress={handleLogin}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
}
