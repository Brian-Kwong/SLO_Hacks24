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
import ImgToBase64 from "react-native-image-base64";
import { submitData } from "../components/submitData";
import { colors, ourStyles } from "../styles/styles.jsx";
import { router } from "expo-router";


function swutchPages(image, foodName, ingredients, desc){
  console.log("switching pages")
  router.push({pathname: "/load", params: {image: image, foodName: foodName, ingredients: ingredients, description: desc}})
}

export var params = {
  image: "",
  foodName: "",
  ingredients: "",
  description: "",
}

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
      base64: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Name of food:</Text>
        <TextInput
          placeholder="Name"
          onChangeText={(text) => setFoodName(text)}
          value={foodName}
        ></TextInput>
      </View>
      <View>
        <Text>Picture of food:</Text>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: 'data:image/jpeg;base64,' + image }} style={{ height: 300, width: 300 }} />
        )}
      </View>
      <View>
        <Text>Ingredients:</Text>
        <TextInput
          placeholder="Ingredients"
          onChangeText={(text) => setIngredients(text)}
          value={ingredients}
        ></TextInput>
      </View>
      <View>
        <Text>Description:</Text>
        <TextInput
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={desc}
        ></TextInput>
      </View>
      <Button title="Submit" onPress={()=> swutchPages(image,foodName,ingredients,desc)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
