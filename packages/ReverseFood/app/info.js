import {View , Text } from "react-native";
import { our_styles } from "../styles/styles.jsx";
import Table from "../components/table.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { useEffect } from "react";
import { Image } from 'expo-image';
import { Buffer } from "buffer";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default info = () => {
   
   const [myData , setData] = useState({ name: "", image: null , foodCategory: "", ingredients: "", nutrients: []});

   useEffect(() => {
      AsyncStorage.getItem("data").
      then((data) => {let d = JSON.parse(data)
          setData(d); 
   }).catch((error) => {console.log("Error: " + error);})}, []);

        return (<View style={our_styles.center_container}>
        <Text style={our_styles.heading}>{(myData.name === "") ? "Loading" : myData.name}</Text>
         <View style={{width: "30%", aspectRatio: 1/1}}>
         <Image style={{width: "100%", height:"100%"}} placeholder={{blurhash}} source={{uri: (myData.image === null ) ? "" : `data:image/jpeg;base64, ${Buffer.from(myData.image.data, "").toString('base64')}`}}/>
        </View>
        <Text style={our_styles.subheading}>{(myData.name === "") ? "Loading" : myData.name}</Text>
        <Text style={our_styles.subheading}>{(myData.foodCategory === "") ? "Loading" : myData.foodCategory}</Text>
        <Text style={our_styles.body}>{(myData.ingredients === "") ? "Loading" : myData.ingredients.join(" ")}</Text>
        <Table>{myData.nutrients}</Table>
        </View>)
   }