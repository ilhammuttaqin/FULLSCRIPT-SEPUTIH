import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { IconButtonMin, IconButtonPlus } from "../../../assets";
import { React, useState,useEffect } from "react";


const Counter = ({ onValueChange }) => {
  const [value, setValue] = useState(1);

  useEffect(()=>{
    onValueChange(value)
  },[])

  const onCount = (type) => {
    let result = value;
    if (type === "plus") {
      result = value + 1;
    }
    if (type === "minus") {
      if (value > 1) {
        result = value - 1;
      }
    }
    setValue(result);
    onValueChange(result);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onCount("minus");
        }}
      >
        <IconButtonMin />
      </TouchableOpacity>
      <Text style={styles.textCounter}>{value}</Text>
      <TouchableOpacity
        onPress={() => {
          onCount("plus");
        }}
      >
        <IconButtonPlus />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textCounter: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
