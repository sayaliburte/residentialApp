import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Firebase from "firebase";
import { firebaseConfig } from "../../config/config";
import { Button } from "react-native-paper";
const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    props.onImageTake(pickedImage, isUploading);
  }, [pickedImage,isUploading]);

  const uploadImageToServer = async () => {
    if (!Firebase.apps.length) {
      Firebase.initializeApp(firebaseConfig);
    }
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network Request Failed"));
      };
      xhr.responseType = "blob";

      xhr.open("GET", pickedImage, true);
      xhr.send(null);
    });

    const ref = Firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);
    snapshot.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setIsUploading(true);
      },
      (error) => {
        setIsUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setIsUploading(false);
          setPickedImage(downloadURL);
          blob.close();
          return downloadURL;
        });
      }
    );
  };

  const takeImageHandler = async () => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 16],
      quality: 0.9,
    }); //opening Camera
    if (!image.cancelled) {
      setPickedImage(image.uri);
    }
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No Image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginHorizontal: 20 }}>
          <Button
            icon="camera"
            labelStyle={{ fontSize: 40 }}
            onPress={takeImageHandler}
          ></Button>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Button
            icon="cloud-upload"
            loading={isUploading}
            labelStyle={{ fontSize: 40 }}
            onPress={uploadImageToServer}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: { alignItems: "center", marginBottom: 15 },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: { height: "100%", width: "100%" },
});
export default ImgPicker;
