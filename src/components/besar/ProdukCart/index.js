import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { colors } from "../../../utils";
import { connect } from "react-redux";

const ListProdukCart = ({ produk, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProdukDetail", { produk })}
      >
        <Image source={{ uri: produk.gambar }} style={styles.gambar} />
        <View style={styles.content}>
          <Text style={styles.textItem}>{produk.nama}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

//props detail produk
const ProdukCart = ({ getProdukLoading, getProdukResults, navigation }) => {
  return (
    <>
      {getProdukResults ? (
        Object.keys(getProdukResults).map((key) => {
          return (
            <ListProdukCart
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
    </>
  );
};
const mapStatetoProps = (state) => ({
  getProdukLoading: state.ProdukReducer.getProdukLoading,
  getProdukResults: state.ProdukReducer.getProdukResults,
  getProdukError: state.ProdukReducer.getProdukError,
});
export default connect(mapStatetoProps, null)(ProdukCart);

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    overflow: "hidden",
    marginRight: 20,
  },
  textItem: {
    fontSize: 16,
    color: "#121212",
    fontWeight: "bold",
    textAlign: "center",
  },
  gambar: {
    width: 160,
    height: 160,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
});
