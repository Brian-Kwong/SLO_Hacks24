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
    //submitData(image, foodName, ingredients, desc)
    const myData = {
      name: "Lay's Classic Potato Chips",
      description: "Lay S Classic Potato Chips",
      foodCategory: "Chips Pretzels Snacks",
      ingredients: "Potatoes Vegetable Oil Sunflower Corn And Or Canola Oil And Salt",
      nutrients: [
          {
              name: "Protein",
              unit: "G",
              value: 7.14,
              dailyValue: 0
          },
          {
              name: "Total lipid (fat)",
              unit: "G",
              value: 35.7,
              dailyValue: 0
          },
          {
              name: "Carbohydrate, by difference",
              unit: "G",
              value: 53.6,
              dailyValue: 0
          },
          {
              name: "Energy",
              unit: "KCAL",
              value: 571,
              dailyValue: 0
          },
          {
              name: "Total Sugars",
              unit: "G",
              value: 3.57,
              dailyValue: 0
          },
          {
              name: "Fiber, total dietary",
              unit: "G",
              value: 3.6,
              dailyValue: 0
          },
          {
              name: "Calcium, Ca",
              unit: "MG",
              value: 0,
              dailyValue: 0
          },
          {
              name: "Iron, Fe",
              unit: "MG",
              value: 1.29,
              dailyValue: 0
          },
          {
              name: "Magnesium, Mg",
              unit: "MG",
              value: 57,
              dailyValue: 0
          },
          {
              name: "Potassium, K",
              unit: "MG",
              value: 1250,
              dailyValue: 0
          },
          {
              name: "Sodium, Na",
              unit: "MG",
              value: 607,
              dailyValue: 0
          },
          {
              name: "Zinc, Zn",
              unit: "MG",
              value: 1.07,
              dailyValue: 0
          },
          {
              name: "Vitamin A, IU",
              unit: "IU",
              value: 0,
              dailyValue: 0
          },
          {
              name: "Vitamin C, total ascorbic acid",
              unit: "MG",
              value: 21.4,
              dailyValue: 0
          },
          {
              name: "Thiamin",
              unit: "MG",
              value: 0,
              dailyValue: 0
          },
          {
              name: "Riboflavin",
              unit: "MG",
              value: 0.364,
              dailyValue: 0
          },
          {
              name: "Niacin",
              unit: "MG",
              value: 4.29,
              dailyValue: 0
          },
          {
              name: "Vitamin B-6",
              unit: "MG",
              value: 0.714,
              dailyValue: 0
          },
          {
              name: "Cholesterol",
              unit: "MG",
              value: 0,
              dailyValue: 0
          },
          {
              name: "Fatty acids, total trans",
              unit: "G",
              value: 0,
              dailyValue: 0
          },
          {
              name: "Fatty acids, total saturated",
              unit: "G",
              value: 5.36,
              dailyValue: 0
          }
      ],
      image: null
    }
    router.push({pathname: "/info", params: myData});
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
        <Text style={styles.text}>Ingredients:</Text>
        <TextInput style={styles.textinput}
          placeholder="Ingredients"
          onChangeText={(text) => setIngredients(text)}
          value={ingredients}
        ></TextInput>
      </View>
      <View>
        <Text style={styles.text}>Description:</Text>
        <TextInput style={styles.textinput}
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
    padding: 5,
    textAlign: "center"
  },
  textinput: {
    fontSize: 16,
    padding: 5,
    textAlign: "center",

  },
});
