import { Text, StyleSheet, View, Alert } from "react-native";
import React, { Component } from "react";
import { DataTransaksi } from "../../DataDummy";
import { ListKeranjang, Tombol } from "../../components";
import {
  colors,
  getData,
  numberWithCommas,
  responsiveHeight,
} from "../../utils";
import { connect } from "react-redux";
import { getListKeranjang } from "../../actions/KeranjangAction";

class KeranjangPesanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keranjangPesan: DataTransaksi[0],
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps) {
    const { deleteKeranjangResults } = this.props;
    if (
      deleteKeranjangResults &&
      prevProps.deleteKeranjangResults !== deleteKeranjangResults
    ) {
      // this.props.navigation.navigate("KeranjangPesanan");
      Alert.alert("Success", "Hapus Pesanan keranjang Berhasil");
      this.getUserData();
    }
  }

  getUserData = () => {
    getData("user").then((res) => {
      const data = res;

      if (!data) {
        this.props.navigation.replace("Login");
      } else {
        this.props.dispatch(getListKeranjang(res.uid));
      }
    });
  };

  render() {
    const { keranjangPesan } = this.state;
    const { navigation, readKeranjangResults } = this.props;

    return (
      <View style={styles.page}>
        <ListKeranjang {...this.props} />
        <View style={styles.footer}>
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Sub Total :</Text>
            <Text style={styles.textBold}>
              Rp.{" "}
              {readKeranjangResults
                ? numberWithCommas(readKeranjangResults.totalHarga)
                : 0}
            </Text>
          </View>
          {readKeranjangResults ? (
            <Tombol
              tittle="Pembayaran"
              type="text"
              fontSize={18}
              padding={responsiveHeight(15)}
              onPress={() =>
                navigation.navigate("Checkout", {
                  totalHarga: readKeranjangResults.totalHarga,
                  totalBerat: readKeranjangResults.totalBerat,
                })
              }
            />
          ) : (
            <Tombol
              tittle="Data Kosong"
              type="text"
              fontSize={18}
              padding={responsiveHeight(15)}
              backgroundColor={"#DCDCDC"}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  readKeranjangLoading: state.CartReducer.readKeranjangLoading,
  readKeranjangResults: state.CartReducer.readKeranjangResults,
  readKeranjangError: state.CartReducer.readKeranjangError,

  deleteKeranjangLoading: state.CartReducer.deleteKeranjangLoading,
  deleteKeranjangResults: state.CartReducer.deleteKeranjangResults,
  deleteKeranjangError: state.CartReducer.deleteKeranjangError,
});

export default connect(mapStateToProps, null)(KeranjangPesanan);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  footer: {
    paddingHorizontal: 30,
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 11,
    paddingBottom: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  totalHarga: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
