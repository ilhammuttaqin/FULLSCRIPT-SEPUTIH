import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import React from "react";
import {
  colors,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
} from "../../../utils";
import Gap from "../Gap";
import { Hapus} from "../../../assets";
import { deleteCart } from "../../../actions/KeranjangAction";
import { connect } from "react-redux";

const CardKeranjang = ({ pesan,keranjangUtama,id,dispatch }) => {

  const hapusPesanan=()=>{
    dispatch(deleteCart(id,keranjangUtama,pesan))
  }

  return (
    <View style={styles.container}>
      <Image source={{uri:pesan.produk.gambar}} style={styles.gambar} />

      <View style={styles.desc}>
        <Text style={styles.nama}>{pesan.produk.nama}</Text>
        <Text style={styles.text}>
          Rp. {numberWithCommas(pesan.produk.harga)}
        </Text>
        <Gap height={responsiveHeight(14)} />

        <Text style={styles.textBold}>Qty : {pesan.jumlahPesanan}</Text>
        <Text style={styles.textBold}>
          Total Harga: Rp. {numberWithCommas(pesan.totalHarga)}
        </Text>
        <Text style={styles.textBold}>Keterangan:</Text>
        <Text style={styles.textBold}>{pesan.produk.nama} </Text>
      </View>
      <TouchableOpacity style={styles.hapus} onPress={() => hapusPesanan()}>
        <Hapus />
      </TouchableOpacity>
    </View>
  );
};

export default connect() (CardKeranjang);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  
  hapus: {
    flex: 1,
    alignItems: 'flex-end',
  },
  gambar: {
    width: responsiveWidth(77),
    height: responsiveHeight(88),
    resizeMode: "contain",
    marginRight:10,
  },
  nama: {
    fontWeight:'bold',
    fontSize: 13,
    textTransform: 'capitalize',
  },
  text: {
    fontSize: 14,
    color:colors.secondary,
    fontWeight:'bold'
  },
  textBold: {
    fontSize: 14,
    fontWeight:'bold'
  },
});
