import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  colors,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
} from "../../../utils";

const CardProduk = ({ produk, navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("ProdukDetail", { produk })}
      >
        <Image source={{uri:produk.gambar}} style={styles.gambarProduk} />
        <Text style={styles.judulProduk}>{produk.nama}</Text>
        <Text style={styles.hargaProduk}>
          Rp.{numberWithCommas(produk.harga)}
        </Text>
      </TouchableOpacity>
      {/* <Tombol type="text" tittle="Detail Produk" fontSize={12} padding={10}/> */}
    </View>
  );
};

export default CardProduk;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: responsiveWidth(158),
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 11,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  gambarProduk: {
    height: 114,
    width: 114,
  },
  judulProduk: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    marginTop: 8,
  },
  hargaProduk: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
    textTransform: "capitalize",
  },
});
