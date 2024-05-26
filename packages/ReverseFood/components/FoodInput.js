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

  // To handle submission of form. probably fetch here
  const handleSubmit = () => {
    // console.log(image);
    // console.log(foodName);
    // console.log(ingredients);
    // console.log(desc);
    submitData(image, foodName, ingredients, desc)
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Name of food:</Text>
        <TextInput style={styles.textinput}
          placeholder="Name"
          onChangeText={(text) => setFoodName(text)}
          value={foodName}
        ></TextInput>
      </View>
      <View> 
        <Text style={styles.text}>Picture of food:</Text>
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
      <Button title="Submit" onPress={handleSubmit} />
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
    fontSize: 18,  // Increase this value to make the font bigger
    padding: 5
  },
  textinput: {
    fontSize: 16,
    padding: 5,
  },
});
