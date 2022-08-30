import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { Component } from "react";
import { AHA, IconBack, ShoppingCart } from "../../assets";
import {
  colors,
  getData,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
} from "../../utils";
import { Tombol, Gap, Counter, TextInputan } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { connect } from "react-redux";
import { masukKeranjang } from "../../actions/KeranjangAction";

class ProdukDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produk: this.props.route.params.produk,
      image: this.props.route.params.produk.gambar,
      jumlah: "",
      uid: "",
    };
  }

  masukKeranjangku = () => {
    const { jumlah } = this.state;
    getData("user").then((res) => {
      if (res) {
        this.setState({
          uid: res.uid,
        });
        if (jumlah>=10) {
          this.props.dispatch(masukKeranjang(this.state));
        } else {
          Alert.alert("Warning", "Masukan Jumlah Pesanan minimum 10");
        }
      } else {
        Alert.alert("Silahkan Login Terlebih Dahulu");
        this.props.navigation.replace("Login");
      }
    });
  };

  componentDidUpdate(prevProps) {
    const { getKeranjangResults } = this.props;
    if (
      getKeranjangResults &&
      prevProps.getKeranjangResults !== getKeranjangResults
    ) {
      this.props.navigation.navigate("KeranjangPesanan");
      this.setState({
        jumlah: "",
      });
      Alert.alert("Sukses", "menambahkan ke keranjang");
    }
  }

  render() {
    const { navigation } = this.props;
    const { produk, jumlah } = this.state;

    // const onCountChange = (jumlah)=>{
    //   console.log("count :", jumlah);
    // }
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: produk.gambar }} style={styles.gambar}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.goBack()}
            >
              <IconBack />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.back}>
              <ShoppingCart />
            </TouchableOpacity> */}
          </View>
        </ImageBackground>
        <View style={styles.konten}>
          <View style={styles.mainKonten}>
            <View style={styles.containerProduk}>
              <View>
                <Text style={styles.tittleProduk}>{produk.nama}</Text>
                <Text style={styles.tittleHarga}>
                  Rp.{numberWithCommas(produk.harga)}
                </Text>
              </View>
              {/* <Counter onValueChange={onCountChange}/>
               */}
              <TextInputan
                label={"Jumlah"}
                fontSize={18}
                width={responsiveWidth(60)}
                height={responsiveHeight(60)}
                fontWeight={"bold"}
                value={jumlah}
                onChangeText={(jumlah) => this.setState({ jumlah })}
                keyboardType={"number-pad"}
              />
            </View>
            <Gap height={15} />

            <Text style={styles.desc}>{produk.desc}</Text>
            <Gap height={16} />
            <Text style={styles.label}>Komposisi</Text>
            <Text style={styles.desc}>Detail Komposisi</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.stokContainer}>
              <Text style={styles.labelTotal}>Minimum Pesan</Text>
              <Text style={styles.descStok}>10 Pcs</Text>
            </View>
            <View style={styles.button}>
              <Tombol
                type="text"
                tittle="Masukan Keranjang"
                fontSize={14}
                padding={14}
                style={styles.buttonText}
                onPress={() => this.masukKeranjangku()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getKeranjangLoading: state.CartReducer.getKeranjangLoading,
  getKeranjangResults: state.CartReducer.getKeranjangResults,
  getKeranjangError: state.CartReducer.getKeranjangError,
});

export default connect(mapStateToProps, null)(ProdukDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gambar: {
    height: 330,
    paddingTop: 26,
    paddingLeft: 22,
    paddingRight: 22,
  },
  back: {
    backgroundColor: colors.white,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  konten: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 30,
    paddingHorizontal: 26,
    flex: 1,
    position: "absolute",
    bottom: 0,
    height: responsiveHeight(475),
    width: "100%",
  },
  mainKonten: {
    flex: 1,
  },
  tittleProduk: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tittleHarga: {
    fontSize: 24,
    color: colors.secondary,
  },
  containerProduk: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  desc: {
    textAlign: "justify",
    fontSize: 14,
    color: colors.gray,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  button: {
    width: 168,
  },
  buttonText: {
    fontSize: 18,
  },
  stokContainer: {
    flex: 1,
  },
  labelTotal: {
    fontSize: 14,
    marginTop: -10,
    fontWeight: "bold",
  },
  descStok: {
    fontSize: 20,
  },
});
