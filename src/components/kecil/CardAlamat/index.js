import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../../utils";

const CardAlamat = ({ users, alamat, provinsi, kota, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alamat :</Text>
      <Text>{users.nama}</Text>
      <Text style={styles.alamat}>{alamat} </Text>
      <Text style={styles.alamat}>Kota/Kab : {kota}</Text>
      <Text style={styles.alamat}>Provinsi : {provinsi}</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("Edit Profile")}>
        <Text style={styles.ubahAlamat}>Ubah Alamat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardAlamat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
  },
  alamat: {
    fontWeight: "normal",
    fontSize: 14,
  },
  ubahAlamat: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.secondary,
    textAlign: "right",
  },
});
