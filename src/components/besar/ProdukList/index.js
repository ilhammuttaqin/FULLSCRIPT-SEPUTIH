import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { CardProduk } from "../../kecil";
import { connect } from "react-redux";
import { colors } from "../../../utils";

const ProdukList = ({ getProdukLoading, getProdukResults, navigation }) => {
  return (
    <View style={styles.container}>
      {getProdukResults ? (
        Object.keys(getProdukResults).map((key) => {
          return (
            <CardProduk
              produk={getProdukResults[key]}
              key={key}
              navigation={navigation}
            />
            
          );
        })
        
      ) : getProdukLoading ? (
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
  getProdukLoading: state.ProdukReducer.getProdukLoading,
  getProdukResults: state.ProdukReducer.getProdukResults,
  getProdukError: state.ProdukReducer.getProdukError,
});

export default connect(mapStatetoProps, null)(ProdukList);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
