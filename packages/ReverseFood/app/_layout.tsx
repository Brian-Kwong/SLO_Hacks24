import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="login" options={{}} />
      <Stack.Screen name="signup" options={{}} />
      <Stack.Screen name="info" options={{}} />
    </Stack>
  );
}
