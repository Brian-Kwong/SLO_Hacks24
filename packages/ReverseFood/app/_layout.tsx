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
      <Stack.Screen name="Home" options={{}} />
      <Stack.Screen name="Login" options={{}} />
      <Stack.Screen name="Signup" options={{}} />
      <Stack.Screen name="Info" options={{}} />
    </Stack>
  );
}
