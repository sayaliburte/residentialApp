import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Image,
  Button,ImageBackground
} from "react-native";
import { List, Card } from "react-native-paper";
const { width, height } = Dimensions.get("screen");
const IncomingRequestScreen = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <View style={{ flex: 1 }}>
       <ImageBackground source={require('../assets/building.jpg')} resizeMode="cover" style={styles.image}>
      <FlatList
        data={data}
        renderItem={(itemData) => (
          <Card style={{ margin: 4, borderRadius: 30 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 2 }}>
                {itemData.item.photo ? (
                  <Image
                    style={{
                      width: 80,
                      height: 90,
                      borderRadius: 60,
                      margin: 6,
                    }}
                    source={itemData.item.photo}
                  />
                ) : (
                  <Image
                    style={{
                      width: 80,
                      height: 90,
                      borderRadius: 60,
                      margin: 3,
                    }}
                    source={{
                      uri: "https://spng.subpng.com/20190305/opf/kisspng-computer-icons-portable-network-graphics-clip-art-conference-background-selec-icons-5c7f139f2e4071.9721598415518319671895.jpg",
                    }}
                  />
                )}
              </View>
              <View style={{ flex: 1}}>
                <List.Item
                  title={itemData.item.visitorName}
                  titleNumberOfLines={2}
                  description={`${itemData.item.role}\n${itemData.item.reason}`}
                />
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Button title="Accept" color="forestgreen" onPress={() => {}} />
                <Button title="Decline" color="tomato" onPress={() => {}} />
              </View>
            </View>
          </Card>
        )}
        keyExtractor={(item) => item.vid}
      />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    backgroundColor: "#8100ff",
    borderRadius: 15,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});

export default IncomingRequestScreen;
