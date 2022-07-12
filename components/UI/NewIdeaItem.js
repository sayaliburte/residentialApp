import React, { useState, useCallback, useReducer, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import ImagePicker from "./ImagePicker";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as communicationActions from "../../store/actions/communication";
const NewIdeaItem = (props) => {
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const memberData = useSelector((state) => state.member.loggedInMember);
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);
  const [liked, setLiked] = useState(false);
  const communicationData = useSelector(
    (state) => state.communication.communications
  );

  const filterCommunication = communicationData.filter(
    (comm) => comm.key === props.id
  );

  const IdeaData = filterCommunication.pop();
  const loadedIdeasData = IdeaData.like ? IdeaData.like : [];
  const likeOn = loadedIdeasData.includes(memberData.userId);

  let mydate = new Date(props.mydate);
  let date =
    mydate.getDate() +
    "-" +
    (mydate.getMonth() + 1) +
    "-" +
    mydate.getFullYear();
  let time = mydate.getHours() + ":" + mydate.getMinutes();
  const add_like = () => {
    setLiked(true);
    let tempIdeasArray = [];
    tempIdeasArray = [...loadedIdeasData];
    tempIdeasArray.push(memberData.userId);

    try {
      dispatch(communicationActions.add_Like(tempIdeasArray, props.id));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const deleteHandler=(key)=>{
    try {
      dispatch(communicationActions.delete_communication(key));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <Card style={styles.card}>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Paragraph>{date}</Paragraph>
            <Paragraph>{time}</Paragraph>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Paragraph style={{ fontSize: 20, marginVertical: 8 }}>
              {props.memberName + ":"}
            </Paragraph>
            <Paragraph style={{ fontSize: 20, marginVertical: 8 }}>
              {props.title}
            </Paragraph>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {likeOn ? (
                <AntDesign name="like1" size={30} color="#000" />
              ) : (
                <AntDesign
                  name="like2"
                  size={30}
                  color="#000"
                  onPress={add_like.bind(
                    this,
                    props.id,
                    props.communicationUserId
                  )}
                />
              )}
              <Text>{loadedIdeasData.length}</Text>
            </View>
            <View>
              {props.memberUserId === props.communicationUserId ? (
                <AntDesign
                  name="delete"
                  size={30}
                  color="#000"
                  onPress={deleteHandler.bind(this,props.id)}
                />
              ) : null}
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#F4BFBF",
    justifyContent: "space-between",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
  },
});

export default NewIdeaItem;
