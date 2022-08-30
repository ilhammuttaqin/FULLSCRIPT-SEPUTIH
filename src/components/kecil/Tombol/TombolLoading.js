import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../../../utils";
import { Gap } from "../";

const TombolLoading = ({
  padding,
  fontSize,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      style={styles.container(padding, backgroundColor)}
     
    >
      <ActivityIndicator size={"small"} color="#FFFFFF" />
      
      <Text style={styles.text(fontSize)}>loading</Text>
    </TouchableOpacity>
  );
};

export default TombolLoading;

const styles = StyleSheet.create({
  container: (padding, backgroundColor) => ({
    backgroundColor: '#000000',
    padding: padding,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.8,

    elevation: 2,
    marginBottom: 15,
  }),
  text: (fontSize) => ({
    fontWeight: "bold",
    textAlign: "center",
    fontSize: fontSize,
    color:colors.white,
  }),
});
