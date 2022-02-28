import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
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
const { width, height } = Dimensions.get("screen");
const IncomingRequestScreen = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Card elevation={20}>
        <Card.Title
          title="Visitor's List"
          style={styles.cardTitle}
          titleStyle={{
            color: "white",
            alignSelf: "center",
          }}
        />
        <FlatList
          data={data}
          renderItem={(itemData) => (
            <View>
              <Card.Content >
                <Image
                  style={{width:100,height:100}}
                  source={{
                    uri: "https://spng.subpng.com/20190305/opf/kisspng-computer-icons-portable-network-graphics-clip-art-conference-background-selec-icons-5c7f139f2e4071.9721598415518319671895.jpg",
                  }}
                />
                <List.Item title={itemData.item.visitorName} />
              </Card.Content>
            </View>
          )}
          keyExtractor={(item) => item.vid}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    backgroundColor: "#8100ff",
    borderRadius: 15,
  },
});

export default IncomingRequestScreen;
