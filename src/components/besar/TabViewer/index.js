import * as React from "react";
import { Text, StyleSheet, View, useWindowDimensions, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { colors } from "../../../utils";
import { Sabun, AHA, Vitamin, InstanGlow } from "../../../assets";
import ItemListProduk from "../ItemListProduk";
import { useNavigation } from "@react-navigation/native";

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle}
    style={styles.tabStyle}
    renderLabel={({ route, focused, color }) => (
      <Text
        style={{
          color: focused ? colors.secondary : colors.shadow,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {route.title}
      </Text>
    )}
  />
);

const RekomendasiRoute = () => {
  return (
    <View style={styles.tabRoute}>
      <ItemListProduk gambar={AHA} text={"AHA Body Serum"} harga={"47.000"} />
      <ItemListProduk
        gambar={InstanGlow}
        text={"Instant Glow"}
        harga={"35.000"}
         
      />
    </View>
  );
};

const SabunRoute = () => {
  return (
    <View style={styles.tabRoute}>
      <ItemListProduk gambar={Sabun} text={"Whitening Soap"} harga={"35.000"} />
    </View>
  );
};

const VitaminRoute = () => {
  return (
    <View style={styles.tabRoute}>
      <ItemListProduk gambar={Vitamin} text={"Vitamin 15"} harga={"35.000"}  />
      <ItemListProduk gambar={Vitamin} text={"Vitamin 30"} harga={"180.000"}  />
    </View>
  );
};

const TabViewer = () => {
  const initialLayout = { width: Dimensions.get("window").width };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "rekomendasi", title: "Rekomendasi" },
    { key: "sabun", title: "Sabun" },
    { key: "vitamin", title: "Vitamin" },
  ]);

  const renderScene = SceneMap({
    rekomendasi: RekomendasiRoute,
    sabun: SabunRoute,
    vitamin: VitaminRoute,
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.style}
    />
  );
};

export default TabViewer;

const styles = StyleSheet.create({
  style: {
    backgroundColor: colors.primary,
    flex:1,
    height:300,
  },
  tabRoute: {
    backgroundColor: colors.primary,
    flex: 1,
    marginVertical: 10,
  },
  textStyle: {
    margin: 8,
    fontSize: 16,
  },
  indicatorStyle: {
    backgroundColor: colors.secondary,
  },
  tabStyle: {
    backgroundColor: colors.primary,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  gambar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignItems: "center",
  },
  tittle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#121212",
  },
  subtittle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#181818",
  },
});
