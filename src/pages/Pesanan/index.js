import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { Component } from "react";
import { colors } from "../../utils";
import {
  Gap,
  KategoriList,
  ListHeadComponents,
  ProdukList,
} from "../../components";
import { DataKategori, DataProduk } from "../../DataDummy";
import { connect } from "react-redux";
import { getKategoriList } from "../../actions/KategoriAction";
import { getProdukList } from "../../actions/ProdukAction";

class Pesanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: DataKategori,
      products: DataProduk,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      // do something
      const { idProdutcs, keyword } = this.props;

      this.props.dispatch(getKategoriList());
      this.props.dispatch(getProdukList(idProdutcs, keyword));
    });
  }

  componentDidUpdate(prevProps) {
    const { idProdutcs, keyword } = this.props;

    if (idProdutcs && prevProps.getUpdateProfileResults !== idProdutcs) {
      this.props.dispatch(getProdukList(idProdutcs, keyword));
    }
    if (keyword && prevProps.getUpdateProfileResults !== keyword) {
      this.props.dispatch(getProdukList(idProdutcs, keyword));
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const { products } = this.state;
    const { navigation, keyword } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ListHeadComponents navigation={navigation} page={"Pesanan"} />
          <View style={styles.viewProduk}>
            <KategoriList navigation={navigation} />
          </View>

          {/* <View style={{ flex: 1 }}></View> */}
          <View style={styles.pilihProduk}>
            <ProdukList products={products} navigation={navigation} />
          </View>
          <Gap height={64} />
        </View>
      </ScrollView>
    );
  }
}

const mapStatetoProps = (state) => ({
  idProdutcs: state.ProdukReducer.idProdutcs,
  namaKategori: state.ProdukReducer.namaKategori,
  keyword: state.ProdukReducer.keyword,
});

export default connect(mapStatetoProps, null)(Pesanan);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  viewProduk: {
    marginBottom: 10,
    flex: 1,
  },
  pilihProduk: {
    marginTop: 10,
    marginHorizontal: 20,
    flex: 1,
  },
});
