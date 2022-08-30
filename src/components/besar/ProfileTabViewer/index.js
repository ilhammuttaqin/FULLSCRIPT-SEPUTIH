import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Logout } from "../../../assets";

import { colors } from "../../../utils";
import ProfileContent from "../ProfileContent";

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorTabStyle}
    style={styles.tabBarStyle}
    tabStyle={styles.tabStyle}
    renderLabel={({ route, focused }) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
  />
);

const AkunRoute = () => {
  return (
    <View style={styles.scene}>
      <View>
        <ProfileContent/>
      </View>
    </View>
  );
};

const PesananRoute = ({logo}) => {
  return (
    <View style={styles.scene}>
      <View>
        
      </View>
    </View>
  );
};

const initialLayout = { width: Dimensions.get("window").width };

const renderScene = SceneMap({
  akun: AkunRoute,
  pesanan: PesananRoute,
});

export default function ProfileTabViewer() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "akun", title: "Akun" },
    { key: "pesanan", title: "Pesanan" },
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    height: 400,
  },
  containerAkun: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  scene: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  indicatorTabStyle: {
    backgroundColor: "#020202",
    height: 3,
    marginLeft: 3,
  },
  tabBarStyle: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
  },
  tabStyle: {
    width: "auto",
  },
  tabText: (focused) => ({
    color: focused ? "#020202" : "#8D92A3",
    fontSize: 13,
    fontWeight: "bold",
  }),
});
