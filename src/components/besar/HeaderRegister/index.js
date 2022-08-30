import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../../utils";
import { IconBack } from "../../../assets";

const HeaderRegister = ({ tittle, subtittle, onPress }) => {
  return (
    <View style={styles.container}>
      {onPress && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <View style={styles.back}>
            <IconBack />
          </View>
        </TouchableOpacity>
      )}
      <View>
        <Text style={styles.tittle}>{tittle}</Text>
        <Text style={styles.subtittle}>{subtittle}</Text>
      </View>
    </View>
  );
};

export default HeaderRegister;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
  },
  tittle: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtittle: {
    fontSize: 16,
    color: colors.gray,
  },
  back: {
    padding: 16,
    marginRight: 10,
  },
});
