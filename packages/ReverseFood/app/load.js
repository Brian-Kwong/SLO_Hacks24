import {Viiew, Text, View} from 'react-native';
import { our_styles } from '../styles/styles';
import { router, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import info from './info';

function fetchData (params) { 
    return new Promise((resolve, reject) => {
    console.log("Getting tokem"); SecureStore.getItemAsync("token").then(async (token) => {
    
    const URL = "https://mealathon.azurewebsites.net/image";
    console.log("Token: " + token);
    if (token === undefined) {
        console("Error: Token is undefined");
        reject(401);
    }
    else if ( params.image === undefined && params.foodName === undefined) {
        console.log("Error: No image or food name provided");
        reject(400);
    }
    else{
    fetch(URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,     
    },
    body: JSON.stringify({
        image: (params.image === "") ? undefined : params.image,
        foodName:  (params.foodName === "") ? undefined : params.foodName,
        ingredients: (params.ingredients === "") ? undefined : params.ingredients,
        description: (params.description === "") ? undefined : params.description,
    }),
}).then((response) => {
    console.log("Response: " + response.status);
    if (response.status >= 200 && response.status < 300){
        console.log("Response: OK");
        response.json().then((myData) => {
            if(myData === undefined) {
                console.log("Error5: Data is undefined");
                reject(404)
            }
            console.log("Data from server : " + myData);
            AsyncStorage.setItem("data", JSON.stringify(myData)).then(() => {resolve(200)}).catch((error)=>{
                console.log("Error6: " + error);
                reject(error);
            });
        }).catch((error) => {console.log("Error4: " + error); reject(error)});
    } else {
       console.log("Error3: " + response.status);
       reject(response.status);
    }
}).catch((error) => {
    console.log("Error2: " + error);
    reject(error);
});
}}).catch((error) => {{
    console.log("Error1: " + error);
    reject(error);
}})})};

export default function Page() {

    fetchData(useLocalSearchParams()).then(() => {
        console.log("Data fetched");
        router.replace("info")}).catch((error) => {alert("Error: " + error); router.replace("input")});

    return <View style={our_styles.center_container}>
            <Text style={our_styles.subheading}>🍜 Please Wait 🍜</Text>
            <Text style={our_styles.subheading}>The AI is coooking</Text>
        </View>
}