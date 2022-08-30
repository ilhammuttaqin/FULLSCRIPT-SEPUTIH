import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import SearchComponents from "../SearchComponents";
import { colors, responsiveHeight } from "../../../utils";

export default class ListHeadComponents extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <SearchComponents navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingTop: 26,
    paddingBottom: 20,
    height: responsiveHeight(150),
  },
});
