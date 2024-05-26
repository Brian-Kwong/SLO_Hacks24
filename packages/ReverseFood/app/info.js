import {View , Text } from "react-native";
import { our_styles } from "../styles/styles.jsx";
import { useLocalSearchParams } from "expo-router";
import Table from "../components/table.js";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry.js";
import { params } from "../components/FoodInput.js";
const URL = "http:/10.144.207.193:3000/image";




export default info = () => {
    const [myData , setData] = useState({ name : "Loading", description : "Loading", foodCategory : "Loading", ingredients : "Loading", nutrients : []})
    async function fetchData () { await SecureStore.getItemAsync("token").then((token) => {
        if (token === undefined) {
            console.log("No token found");
        }
        let searchData = {
            image: params.image,
            foodName: params.foodName,
            ingredients: params.ingredients,
            description: params.description,
        };
        console.log(searchData.foodName, searchData.ingredients, searchData.description);
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,     
        },
        body: JSON.stringify(searchData),
    }).then((response) => {
        if (response.status === 200) {
            response.json().then((myData) => {
                return myData
            });
        } else {
           console.log("Error: " + response.status);
        }
    }).catch((error) => {
        console.log(error);
        return null;
    });
}).catch((error) => {{
    console.log(error);
    return null;
}})};
    
    useEffect(() => {
        fetchData().then((data) => {setData({
        name : data.name, description : data.name, foodCategory : data.foodCategory, ingredients : data.ingredients, nutrients : data.nutrients
    })}).catch((error) => console.log(error))
    ;}, []);


    

return <View style={our_styles.center_container}>
<Text style={our_styles.heading}>{(myData.name === 0) ? "Loading" : myData.name}</Text>
<Text></Text>
<Text style={our_styles.subheading}>{myData.name}</Text>
<Text style={our_styles.subheading}>{myData.foodCategory}</Text>
<Text style={our_styles.body}>{myData.ingredients}</Text>
</View>
}  