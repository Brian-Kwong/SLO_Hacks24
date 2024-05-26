import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import FoodInput from "../components/FoodInput";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Mealathon</Text>
        <Text style={styles.subtitle}>Your camera takes the first bite</Text>
        <Link style={styles.link} href="/input">Add a food</Link>
        <Link style={styles.link}href="/login">Login</Link>
        <Link style={styles.link}href="signup">Sign Up</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 0.5,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    color: "#38434D",
    textAlign: "center",

  },
  link: {
    fontSize: 18,
    color: "#007BFF", // Link blue color
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 2,
    paddingHorizontal: 2,
    marginVertical: 2,
  }
});
