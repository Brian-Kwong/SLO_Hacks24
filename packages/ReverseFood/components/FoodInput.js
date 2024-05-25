import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  Dimensions,
  Form,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function FoodInput() {
  const [image, setImage] = useState(null);
  const [foodName, setFoodName] = useState("");

  const pickImage = async () => {
    console.log("herello");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log(image);
    console.log(foodName);
  };

  return (
    <View>
      <Text>Name of food:</Text>
      <TextInput
        placeholder="test"
        onChangeText={(text) => setFoodName(text)}
        value={foodName}
      ></TextInput>
      <Text>Picture of food:</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ height: 300, width: 300 }} />
      )}
      <TextInput></TextInput>
      <Text>Ingredients:</Text>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
