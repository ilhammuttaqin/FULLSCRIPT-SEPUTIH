import { StyleSheet, View } from "react-native";
import React from "react";
import { CardProfile, Gap } from "../../kecil";
import { colors } from "../../../utils";

const ProfileContent = ({ profils, navigation }) => {
  return (
    <View style={styles.content}>
      {profils.map((profil) => {
        return <CardProfile profil={profil} key={profil.id} navigation={navigation} />;
      })}
      <Gap height={90} />
    </View>
  );
};

export default ProfileContent;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 13,
  },
});
