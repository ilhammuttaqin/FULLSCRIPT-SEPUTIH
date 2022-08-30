import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { ListHistory } from "../../components";
import { colors, getData } from "../../utils";
import { connect } from "react-redux";
import { getListHistory } from "../../actions/HistoryAction";

class HistoryPemesanan extends Component {
  componentDidMount() {
    getData("user").then((res) => {
      const data = res;

      if (!data) {
        this.props.navigation.replace("Login");
      } else {
        this.props.dispatch(getListHistory(data.uid));
      }
    });
  }

  render() {
    return (
      <View style={styles.pages}>
        <ListHistory navigation={this.props.navigation} />
      </View>
    );
  }
}

export default connect()(HistoryPemesanan);

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.primary,
    flex: 1,
  },
});
