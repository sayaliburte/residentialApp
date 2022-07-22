import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  List,
  Card,
  Button,
  Paragraph,
  Menu,
  Divider,
  Provider,
  Caption,
  AnimatedFAB,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector, useDispatch } from "react-redux";
import { fetchMonths } from "../../services/service";
import {
  printableHtmlHeader,
  printableHtmlFooter,
  monthNames,
} from "../../constants/constants";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
const MaintenanceReports = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [visitorList, setVisitorList] = useState([]);
  const [openMonthDropDown, setOpenMonthDropDown] = useState(false);
  const [month, setMonth] = useState(-1);
  const [filter, setFilter] = useState("");

  const [value, setValue] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const monthList = fetchMonths();

  const allMaintenanceDetails = useSelector(
    (state) => state.communication.communications
  );
  const filteredMaintenanceData = allMaintenanceDetails.filter(
    (m) => m.communication_type === "maintenance" && m.active === true
  );
  useEffect(() => {
    const todayFullDate = new Date();
    if (filter === "") {
      let filterData = allMaintenanceDetails.filter((m) => {
        const todayMonth = todayFullDate.getMonth();
        const todayYear = todayFullDate.getFullYear();
        const todayDay = todayFullDate.getDate();

        let date = new Date(m.date);

        let dateMonth = date.getMonth();
        let dateYear = date.getFullYear();
        let dateDay = date.getDate();
        return (
          todayMonth === dateMonth &&
          todayYear === dateYear &&
          todayDay === dateDay &&
          m.communication_type === "maintenance" &&
          m.active === true
        );
      });
      setVisitorList(filterData.reverse());
    }
    if (filter === "maintenanceByYear") {
      let filterData = allMaintenanceDetails.filter((m) => {
        const todayYear = todayFullDate.getFullYear();
        let date = new Date(m.date);

        let dateYear = date.getFullYear();
        return (
          todayYear === dateYear &&
          m.communication_type === "maintenance" &&
          m.active === true
        );
      });
      setVisitorList(filterData.reverse());
    }
  }, [allMaintenanceDetails, filter, setVisitorList]);
  useEffect(() => {
    const todayFullDate = new Date();
    if (month !== -1) {
      let filterData = allMaintenanceDetails.filter((m) => {
        let date = new Date(m.date);
        return (
          date.getMonth() === month &&
          m.communication_type === "maintenance" &&
          m.active === true
        );
      });
      setVisitorList(filterData.reverse());
    }
  }, [month]);
  useEffect(() => {
    if (visibleAlert) {
      Alert.alert("Opps!", "Detail Not Available!", [
        {
          text: "Okay",
          onPress: () => {
            setVisibleAlert(false);
          },
        },
      ]);
    }
  }, [visibleAlert]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const handleDownload = async () => {
    setIsDownloading(true);

    let html = `${printableHtmlHeader}
    <h2 style="text-align:center">Maintenance Details List Of ${
      filter === "maintenanceByMonth"
        ? `${monthNames[month]}`
        : filter === "maintenanceByYear"
        ? "This Year"
        : "Today"
    }</h2>
    <h3 style="text-align:center">Total Records: ${visitorList.length}</h3>
    <div style="display:flex;flex-direction:row;justify-content:center;align-items=center;margin:20">
      <table border="1">
          <thead>
              <tr>
              <th>Sr.No</th>
              <th>Member Name</th>
              <th>Flat No</th>
              <th>Pay Month</th>
              <th>Transaction Type</th>
              <th>Amount</th>
              <th>Transaction Id</th>
              ${filter === "" ? "" : "<th>Paid Date</th>"}
              </tr>
          </thead>
          <tbody>
              ${visitorList.map((item, index) => {
                return `<tr key=${index} style="text-align:center;">
                      <td>${index + 1}</td>
                      <td>${item.memberName}</td>
                      <td>${item.flatno}</td>
                      <td>${item.maintenanceMonth}</td>
                      <td>${item.transactionType}</td>
                      <td>${item.amount}</td>
                      <td>${item.transactionId ? item.transactionId : "-"}</td>
                     ${
                       filter === ""
                         ? ""
                         : `<td>
                           ${new Date(item.date).toLocaleString("en-US", {
                             hour: "numeric",
                             minute: "numeric",
                             hour12: true,
                           })}
                         </td>`
                     }
                      </tr>`;
              }).join('')}
          </tbody>
      </table>
    </div>
    ${printableHtmlFooter}`;

    const { uri } = await Print.printToFileAsync({
      html,
    });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    setIsDownloading(false);
    //setDownloadSuccess(true);*/
  };
  return (
    <Provider>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu}>Filter Maintenance Details By</Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setFilter("maintenanceByMonth");
              closeMenu();
            }}
            title="Maintenance by month"
          />
          <Menu.Item
            onPress={() => {
              setFilter("maintenanceByYear");
              closeMenu();
            }}
            title="Maintenance By Year"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setFilter("");
              closeMenu();
            }}
            title="Clear filter"
          />
        </Menu>
      </View>
      {filter === "maintenanceByMonth" && (
        <View
          style={{
            marginHorizontal: 50,

            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <DropDownPicker
            open={openMonthDropDown}
            value={month}
            items={monthList}
            setValue={setMonth}
            setOpen={setOpenMonthDropDown}
          />
        </View>
      )}
      {visitorList.length !== 0 ? (
        <View style={{ marginTop: 20, marginBottom: 70 }}>
          <FlatList
            data={visitorList}
            keyExtractor={(item, index) => item.key}
            renderItem={(itemData) => {
              let date = new Date(itemData.item.date);
              //let photo = itemData.item.visitorPhoto_url;

              return (
                <TouchableOpacity
                  onPress={() => {
                    itemData.item.photo_url
                      ? navigation.navigate("ViewInvitationPhoto", {
                          photo: itemData.item.photo_url,
                        })
                      : setVisibleAlert(true);
                  }}
                >
                  <Card style={styles.Card}>
                    <View style={{ flexDirection: "row" }}>
                      <Card
                        style={{
                          backgroundColor: "#F2D7D9",
                          flexDirection: "column",
                        }}
                      >
                        <View style={{ margin: 7 }}>
                          <Image
                            style={{
                              width: 120,
                              height: 120,
                              borderRadius: 10,
                            }}
                            source={{ uri: itemData.item.photo_url }}
                          />

                          <Paragraph style={{ alignSelf: "center" }}>
                            {itemData.item.memberName.toUpperCase()}
                          </Paragraph>
                          <Paragraph style={{ alignSelf: "center" }}>
                            {itemData.item.flatno}
                          </Paragraph>
                        </View>
                      </Card>
                      <ScrollView style={{ margin: 9, marginTop: 30 }}>
                        <Paragraph style={{ flex: 1, color: "white" }}>
                          {date.toLocaleString()}
                        </Paragraph>

                        <Paragraph style={{ flex: 1, color: "white" }}>
                          Pay Month:{itemData.item.maintenanceMonth}
                        </Paragraph>

                        <Paragraph style={{ flex: 1, color: "white" }}>
                          Transaction Type: {itemData.item.transactionType}
                        </Paragraph>

                        <Paragraph style={{ flex: 3, color: "white" }}>
                          Amount:{itemData.item.amount}
                        </Paragraph>
                        {itemData.item.transactionId ? (
                          <Paragraph style={{ flex: 3, color: "white" }}>
                            Transaction Id :{itemData.item.transactionId}
                          </Paragraph>
                        ) : null}
                      </ScrollView>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <Card
          style={{
            margin: 5,
            padding: 12,
            borderRadius: 8,
            backgroundColor: "#827397",
            elevation: 5,
            shadowColor: "black",
            shadowOpacity: 0.26,
            height: 50,
            justifyContent: "flex-end",
            marginTop: 200,
          }}
        >
          <Paragraph style={{ color: "white", alignSelf: "center" }}>
            No Visitors Found
          </Paragraph>
        </Card>
      )}
      <SafeAreaView style={styles.container}>
        <AnimatedFAB
          icon="file-download-outline"
          label={"Downloading"}
          extended={isDownloading}
          color={isDownloading ? "red" : "blue"}
          onPress={handleDownload}
          visible={visitorList.length > 0}
          animateFrom={"right"}
          iconMode={"static"}
          style={
            isDownloading
              ? { ...styles.fabStyle, backgroundColor: "white" }
              : styles.fabStyle
          }
        />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Card: {
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#827397",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
  },
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
    marginBottom: 80,
  },
});
export default MaintenanceReports;
