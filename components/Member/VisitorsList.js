import React, { useState } from "react";
import {
  StyleSheet,
  View,
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

const VisitorList=(props)=>{
    return(
        <Card style={{ width: "80%", borderRadius: 25 }} elevation={20}>
          <Card.Title
            title="Visitor's List"
            style={styles.cardTitle}
            titleStyle={{
              color: "white",
              alignSelf: "center",
            }}
          />
          <FlatList
            data={props.data}
            renderItem={(itemData) => (
              <View>
                <Card.Content>
                  <List.Item
                    left={(props) => <List.Icon {...props} icon="account" />}
                    title={itemData.item.memberName}
                    description={itemData.item.date + " " + itemData.item.time}
                  />
                </Card.Content>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          <Card.Actions>
            <Button>View More</Button>
          </Card.Actions>
        </Card>
    
    );
}

const styles=StyleSheet.create({
    cardTitle: {
        backgroundColor: "#8100ff",
        borderRadius: 15,
      },
})

export default VisitorList;

