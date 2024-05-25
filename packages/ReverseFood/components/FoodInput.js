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
  const [ingredients, setIngredients] = useState("");
  const [desc, setDescription] = useState("");

  // uses Image picker to get an image from user's library
  const pickImage = async () => {
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

  // To handle submission of form. probably fetch here
  const handleSubmit = () => {
    console.log(image);
    console.log(foodName);
    console.log(ingredients);
    console.log(desc);
  };

  return (
    <View>
      <Text>Name of food:</Text>
      <TextInput
        placeholder="Name"
        onChangeText={(text) => setFoodName(text)}
        value={foodName}
      ></TextInput>
      <Text>Picture of food:</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ height: 300, width: 300 }} />
      )}
      <Text>Ingredients:</Text>
      <TextInput
        placeholder="Ingredients"
        onChangeText={(text) => setIngredients(text)}
        value={ingredients}
      ></TextInput>
      <Text>Description:</Text>
      <TextInput
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        value={desc}
      ></TextInput>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
