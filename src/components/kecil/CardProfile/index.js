import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { IconNext } from "../../../assets";
import { clearData, colors, responsiveHeight } from "../../../utils";
import { connect } from "react-redux";
import FIREBASE from "../../../config/FIREBASE";

const CardProfile = ({ profil, navigation, dataUser }) => {
  const onSubmit = () => {
    if (profil.halaman === "Login") {
      FIREBASE.auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          clearData();
          navigation.replace("Login");
        })
        .catch((error) => {
          // An error happened.
        });
    } else {
      navigation.navigate(profil.halaman);
    }
  };
  return (
    <TouchableOpacity onPress={() => onSubmit()}>
      <View style={styles.container}>
        <View style={styles.content}>
          {profil.gambar}
          <Text style={styles.text}>{profil.nama}</Text>
        </View>
        <IconNext />
      </View>
    </TouchableOpacity>
  );
};

const emok = (state) => ({
  dataUser: state.UserReducer.dataUser,
});

export default connect(emok, null)(CardProfile);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // paddingHorizontal: 24,
    // paddingVertical: 8,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderColor: colors.border,
    borderWidth: 1,
    marginHorizontal: 13,
    padding: responsiveHeight(18),
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 18,
  },
});
