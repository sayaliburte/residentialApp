import React, { useState, useEffect, Fragment } from "react";

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
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
import DateTimePicker from "react-native-modal-datetime-picker";
import { useSelector, useDispatch } from "react-redux";
import { fetchMonths } from "../../services/service";
import {
  printableHtmlHeader,
  printableHtmlFooter,
  monthNames,
} from "../../constants/constants";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
const Reports = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [visitorList, setVisitorList] = useState([]);
  const [openMonthDropDown, setOpenMonthDropDown] = useState(false);
  const [month, setMonth] = useState(-1);
  const [filter, setFilter] = useState("");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [value, setValue] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const monthList = fetchMonths();
  let minimumDate = new Date();
  minimumDate.setDate(1);
  minimumDate.setMonth(0);
  const allVisitors = useSelector((state) => state.visitors.visitors);
  useEffect(() => {
    const todayFullDate = new Date();
    if (filter === "") {
      let filterData = allVisitors.filter((visitor) => {
        const todayMonth = todayFullDate.getMonth();
        const todayYear = todayFullDate.getFullYear();
        const todayDay = todayFullDate.getDate();
        let validDate = visitor.acceptedDate
          ? visitor.acceptedDate
          : visitor.date;
        let date = new Date(validDate);

        let dateMonth = date.getMonth();
        let dateYear = date.getFullYear();
        let dateDay = date.getDate();
        return (
          todayMonth === dateMonth &&
          todayYear === dateYear &&
          todayDay === dateDay &&
          visitor.status !== "Pending"
        );
      });
      setVisitorList(filterData.reverse());
    }
    if (filter === "visitorByYear") {
      let filterData = allVisitors.filter((visitor) => {
        const todayYear = todayFullDate.getFullYear();
        let validDate = visitor.acceptedDate
          ? visitor.acceptedDate
          : visitor.date;
        let date = new Date(validDate);

        let dateYear = date.getFullYear();
        return todayYear === dateYear && visitor.status !== "Pending";
      });
      setVisitorList(filterData.reverse());
    }
  }, [allVisitors, filter]);
  useEffect(() => {
    const todayFullDate = new Date();
    if (month !== -1) {
      let filterData = allVisitors.filter((visitor) => {
        let validDate = visitor.acceptedDate
          ? visitor.acceptedDate
          : visitor.date;
        let date = new Date(validDate);
        return date.getMonth() === month && visitor.status !== "Pending";
      });
      setVisitorList(filterData.reverse());
    }
  }, [month]);
  const onDateConfirm = (date) => {
    let filterData = allVisitors.filter((visitor) => {
      let validDate = visitor.acceptedDate
        ? visitor.acceptedDate
        : visitor.date;
      let visitordate = new Date(validDate);
      return (
        visitordate.getDate() === date.getDate() &&
        visitordate.getMonth() === date.getMonth() &&
        visitordate.getFullYear() === date.getFullYear() &&
        visitor.status !== "Pending"
      );
    });
    setVisitorList(filterData.reverse());
    setValue(date.toString());
    setOpenDatePicker(false);
  };
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const handleDownload = async () => {
    setIsDownloading(true);

    let html = `${printableHtmlHeader}
    <h2 style="text-align:center">Visitor's List Of ${
      filter === "visitorByDate"
        ? value.toLocaleString()
        : filter === "visitorByMonth"
        ? `${monthNames[month]}`
        : filter === "visitorByYear"
        ? "This Year"
        : "Today"
    }</h2>
    <h3 style="text-align:center">Total ${
      visitorList.length === 1 ? "Visitor" : "Visitors"
    } ${visitorList.length}</h3>
    <div style="display:flex;flex-direction:row;justify-content:center;align-items=center;margin:20">
      <table border="1">
          <thead>
              <tr>
              <th>Sr.No</th>
              <th>Visitor Name</th>
              <th>Flat No</th>
              <th>Society Member Name</th>
              <th>Status</th>
              <th>Visiting Reason</th>
              ${
                filter === "visitorByDate" || filter === ""
                  ? null
                  : "<th>Visited Date</th>"
              }
              </tr>
          </thead>
          <tbody>
              ${visitorList.map((item, index) => {

                return `<tr key=${index}>
                      <td>${index + 1}</td>
                      <td>${item.visitorName}</td>
                      <td>${item.flatno}</td>
                      <td>${item.memberName}</td>
                      <td>${item.status}</td>
                      <td>${item.visitingReason}</td>
                     ${
                       (filter === "visitorByDate" || filter === "")
                         ? null
                         : `<td>
                           ${new Date(
                             item.acceptedDate ? item.acceptedDate : item.date
                           ).toLocaleString("en-US", {
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
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Filters</Button>}
          >
            <Menu.Item
              onPress={() => {
                setFilter("visitorByDate");
                closeMenu();
              }}
              title="Filter By Date"
            />
            <Menu.Item
              onPress={() => {
                setFilter("visitorByMonth");
                closeMenu();
              }}
              title="Filter By Month"
            />

            <Menu.Item
              onPress={() => {
                setFilter("visitorByYear");
                closeMenu();
              }}
              title="Filter By Year"
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
        <Button
          onPress={() => {
            navigation.navigate("MaintenanceReports", {});
          }}
        >
          Maintenance Report
        </Button>
      </View>
      {filter === "visitorByDate" && (
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            mode="contained"
            color="green"
            onPress={() => {
              setOpenDatePicker(true);
            }}
          >
            Select Date
          </Button>
          {value.length > 0 && (
            <Caption style={{ fontSize: 14 }}>
              Picked Date: {new Date(value).toLocaleDateString()}
            </Caption>
          )}
        </View>
      )}
      <DateTimePicker
        isVisible={openDatePicker}
        minimumDate={minimumDate}
        maximumDate={new Date()}
        onConfirm={onDateConfirm}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />
      {filter === "visitorByMonth" && (
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
        <View style={{ marginTop: 20, marginBottom: 60 }}>
          <FlatList
            data={visitorList}
            keyExtractor={(item, index) => item.key}
            renderItem={(itemData) => {
              let date = new Date(itemData.item.date);
              let photo = itemData.item.visitorPhoto_url;

              return (
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
                          style={{ width: 120, height: 120, borderRadius: 10 }}
                          source={{ uri: photo }}
                        />

                        <Paragraph style={{ alignSelf: "center" }}>
                          {itemData.item.visitorName.toUpperCase()}
                        </Paragraph>
                        <Paragraph style={{ alignSelf: "center" }}>
                          {itemData.item.visitingReason}
                        </Paragraph>
                      </View>
                    </Card>
                    <ScrollView style={{ margin: 9, marginTop: 30 }}>
                      <Paragraph style={{ flex: 1, color: "white" }}>
                        {date.toLocaleString()}
                      </Paragraph>

                      <Paragraph style={{ flex: 1, color: "white" }}>
                        Member:{itemData.item.memberName.toUpperCase()}
                      </Paragraph>

                      <Paragraph style={{ flex: 1, color: "white" }}>
                        Flat no.: {itemData.item.flatno}
                      </Paragraph>

                      <Paragraph style={{ flex: 3, color: "white" }}>
                        Request Status:{itemData.item.status}
                      </Paragraph>
                      {itemData.item.status === "Pending" ? (
                        <IconButton
                          style={{
                            justifyContent: "flex-end",
                            alignSelf: "flex-end",
                          }}
                          icon="delete-outline"
                          color="white"
                          size={35}
                          onPress={deleteHandler.bind(this, itemData.item.key)}
                        />
                      ) : null}
                    </ScrollView>
                  </View>
                </Card>
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
    padding: 12,
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
export default Reports;
