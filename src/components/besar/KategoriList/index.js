import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import React from "react";
import { colors } from "../../../utils";
import { CardKategori } from "../../kecil";
import { connect } from "react-redux";

const KategoriList = ({
  getKategoriLoading,
  getKategoriResults,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {getKategoriResults ? (
        Object.keys(getKategoriResults).map((key) => {
          return (
            <CardKategori
              kategori={getKategoriResults[key]}
              key={key}
              id={key}
              navigation={navigation}
            />
          );
        })
      ) : getKategoriLoading ? (
        <View style={styles.load}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <Text style={{ fontSize: 16, color: "red", fontWeight: "bold" }}>
          Data Kosong
        </Text>
      )}
    </View>
  );
};

const mapStatetoProps = (state) => ({
  getKategoriLoading: state.KategoriReducer.getKategoriLoading,
  getKategoriResults: state.KategoriReducer.getKategoriResults,
  getKategoriError: state.KategoriReducer.getKategoriError,
});

export default connect(mapStatetoProps, null)(KategoriList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  load: {
    flex: 1,
    marginBottom: 20,
    marginTop: 10,
  },
});
