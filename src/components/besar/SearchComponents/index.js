import { StyleSheet, TextInput, View } from "react-native";
import React, { Component } from "react";
import { colors, getData } from "../../../utils";
import { Tombol, Gap } from "../../kecil";
import { connect } from "react-redux";
import { saveKeyword } from "../../../actions/ProdukAction";
import { getListKeranjang } from "../../../actions/KeranjangAction";

class SearchComponents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }

  endSearch = () => {
    const { navigation, page, dispatch } = this.props;
    const { search } = this.state;

    dispatch(saveKeyword(search));

    if (page !== "Pesanan") {
      navigation.navigate("Pesanan");
      this.setState({
        search: "",
      });
    }
  };

  componentDidMount() {
    this.getUserData();
  }
  getUserData = () => {
    getData("user").then((res) => {
      const data = res;

      if (data) {
        this.props.dispatch(getListKeranjang(res.uid));
      }
    });
  };

  render() {
    const { search } = this.state;
    const { navigation, readKeranjangResults } = this.props;
    let totalCartNotifikasi;

    if (readKeranjangResults) {
      totalCartNotifikasi = Object.keys(
        readKeranjangResults.orderPesanan
      ).length;
      console.log("total", totalCartNotifikasi);
    }

    return (
      <View style={styles.WrapperSection}>
        <View style={styles.SectionSearch}>
          <TextInput
            placeholder="Cari Produk "
            style={styles.InputText}
            value={search}
            onChangeText={(search) => this.setState({ search })}
            //onSumbitEditing={() => this.endSearch()}
          />
        </View>
        <Gap width={8} />
        <Tombol icon="search" padding={10} onPress={() => this.endSearch()} />
        <Gap width={8} />
        <Tombol
          icon="keranjang"
          totalkeranjang={totalCartNotifikasi}
          padding={10}
          onPress={() => navigation.navigate("KeranjangPesanan")}
        />
      </View>
    );
  }
}

const mapStatetoProps = (state) => ({
  readKeranjangLoading: state.CartReducer.readKeranjangLoading,
  readKeranjangResults: state.CartReducer.readKeranjangResults,
  readKeranjangError: state.CartReducer.readKeranjangError,
});

export default connect(mapStatetoProps, null)(SearchComponents);

const styles = StyleSheet.create({
  WrapperSection: {
    marginTop: 15,
    marginHorizontal: 30,
    flexDirection: "row",
  },
  SectionSearch: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.8,

    elevation: 2,
  },

  InputText: {
    fontSize: 16,
    marginLeft: 10,
    width: 185,
  },
});
