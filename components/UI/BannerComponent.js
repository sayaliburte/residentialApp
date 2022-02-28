import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Banner } from "react-native-paper";

const BannerComponent = (props) => {
  return (
    <Banner
      visible={props.visible}
      actions={[...props.actions]}
      icon={({ size }) =>
        props.image ? (
          <Image
            source={props.image}
            style={{
              width: size,
              height: size,
            }}
          />
        ) : (
          <Image
            source={{
              uri: "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
            }}
            style={{
              width: size,
              height: size,
            }}
          />
        )
      }
    >
      {props.description}
    </Banner>
  );
};
const styles = StyleSheet.create({});

export default BannerComponent;
