import { StyleSheet, View, Image } from "react-native";
import React, { Component } from "react";
import { SeputihKecil, profilDummy } from "../../../assets";
import { colors, responsiveHeight } from "../../../utils";

class HeaderComponents extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SeputihKecil style={styles.logo} />
        <Image source={profilDummy} style={styles.profile} />
      </View>
    );
  }
}

export default HeaderComponents;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 20,
    height: responsiveHeight(150),
  },

  logo: {},

  profile: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
