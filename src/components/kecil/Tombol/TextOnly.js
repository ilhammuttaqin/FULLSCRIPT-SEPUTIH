import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../../utils";

const TextOnly = ({ tittle, padding, fontSize, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={styles.container(padding, backgroundColor)}
      onPress={onPress}
    >
      <Text style={styles.text(fontSize)}>{tittle}</Text>
    </TouchableOpacity>
  );
};

export default TextOnly;

const styles = StyleSheet.create({
  container: (padding, backgroundColor) => ({
    backgroundColor: backgroundColor ? backgroundColor:colors.dark,
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
  }),
});
