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

  const handleLogin = () => {
    console.log("Login");
  };
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
