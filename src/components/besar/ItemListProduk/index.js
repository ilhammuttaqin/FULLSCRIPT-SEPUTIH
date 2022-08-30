import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const ItemListProduk = ({ gambar, text, harga, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <Image source={gambar} style={styles.gambar} />
        <View style={styles.content}>
          <Text style={styles.tittle}>{text}</Text>
          <Text style={styles.subtittle}>Rp {harga}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemListProduk;

const styles = StyleSheet.create({
  gambar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 20,
  },
  content: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tittle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#121212",
  },
  subtittle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#181818",
  },
});
