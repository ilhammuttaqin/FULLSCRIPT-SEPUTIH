import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ShoppingCart, Search } from "../../../assets";
import { colors } from "../../../utils";
import TextOnly from "./TextOnly";
import TombolLoading from "./TombolLoading";

const Tombol = (props) => {
  const Icon = () => {
    if (icon === "keranjang") {
      return <ShoppingCart />;
    }
    if (icon === "search") {
      return <Search/> ;
    } 
    return <ShoppingCart />;
  };

  const { icon, totalkeranjang, padding, type, tittle, onPress,loading } = props;

  if (loading){
    return <TombolLoading {...props}/>
  }

  if (type === "text") {
    return <TextOnly {...props} />;
  }

  return (
    <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
      <Icon />
      {totalkeranjang && (
        <View style={styles.notifikasi}>
          <Text style={styles.textNotifikasi}>{totalkeranjang}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Tombol;


const styles = StyleSheet.create({
  container: (padding) => ({
    backgroundColor: colors.white,
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
  }),
  notifikasi: {
    position: "absolute",
    top: 5,
    right: 0,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 3,
  },
  textNotifikasi: {
    fontSize: 12,
    color: colors.white,
    fontWeight: "bold",
  },
});
