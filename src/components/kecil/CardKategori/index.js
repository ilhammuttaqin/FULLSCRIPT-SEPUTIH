import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors, responsiveHeight } from "../../../utils";
import { getKategoriProduk } from "../../../actions/ProdukAction";
import { connect } from "react-redux";

const CardKategori = ({ kategori, navigation, id, dispatch }) => {

  const kategoriproduk = (id, namaKategori) => {

    // ke Jersey Action 
    dispatch(getKategoriProduk(id, namaKategori));

    // navigate ke ListJersey
    navigation.navigate('Pesanan');

  };


  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => kategoriproduk(id, kategori.namaKategori)}
    >
      <Image source={{ uri: kategori.image }} style={styles.logo} />
    </TouchableOpacity>
  );
};

export default connect() (CardKategori);

const styles = StyleSheet.create({
  logo: {
    width: responsiveHeight(64),
    height: responsiveHeight(64),
  },
  container: {},
});
