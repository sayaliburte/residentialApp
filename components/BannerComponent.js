import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  Image,ScrollView,SafeAreaView
} from "react-native";
import {
  List,
  Card,
  Button,
  Appbar,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Title,
  Avatar,
  Banner,
} from "react-native-paper";



const BannerComponent=(props)=>{
  
return(<Banner
  visible={props.visible}
 actions={[...props.actions]}
 icon={({size})=>(props.image ?<Image
  source={props.image}
  style={{
    width: size,
    height: size,
  }}
/>:<View></View>)}
>
  There was a problem processing a transaction on your credit card.
</Banner>
)
    }
const styles=StyleSheet.create({

})

export default BannerComponent;