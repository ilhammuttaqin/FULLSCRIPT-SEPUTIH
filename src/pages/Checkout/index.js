import { Text, StyleSheet, View, Alert } from "react-native";
import React, { Component } from "react";
import {
  colors,
  getData,
  numberWithCommas,
  responsiveHeight,
} from "../../utils";
import { DataTransaksi, DataKurir } from "../../DataDummy";
import { CardAlamat, Gap, Tombol, Pilih } from "../../components";
import { connect } from "react-redux";
import { getKotaDetail, postOngkir } from "../../actions/RajaOngkirAction";
import { getProdukList } from "../../actions/ProdukAction";
import { snapTransactions } from "../../actions/PaymentAction";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: false,
      ekspedisi: DataKurir,
      ekspedisiSelected: false,
      ongkir: 0,
      estimasi: "",
      totalHarga: this.props.route.params.totalHarga,
      totalBerat: this.props.route.params.totalBerat,
      kota: "",
      provinsi: "",
      alamat: "",
      stok:"",
      date: new Date().getTime(),
    };
  }

  componentDidMount() {
    this.getUserData();
    const { idProdutcs,keyword } = this.props;

      this.props.dispatch(getProdukList(idProdutcs,keyword));
  }

  componentDidUpdate(prevProps) {
    const { getKotaDetailResult, ongkirResult, snapTransactionsResult } = this.props;
    if (
      getKotaDetailResult &&
      prevProps.getKotaDetailResult !== getKotaDetailResult
    ) {
      // this.props.navigation.navigate("KeranjangPesanan");
      this.setState({
        provinsi: getKotaDetailResult.province,
        kota: getKotaDetailResult.type + "" + getKotaDetailResult.city_name,
      });
    }

    if (ongkirResult && prevProps.ongkirResult !== ongkirResult) {
      this.setState({
        ongkir: ongkirResult.cost[0].value,
        estimasi: ongkirResult.cost[0].etd,
      });
    }
    if(snapTransactionsResult && prevProps.snapTransactionsResult !== snapTransactionsResult) {
      
      const params = {
        url: snapTransactionsResult.redirect_url,
        ongkir: this.state.ongkir,
        estimasi: this.state.estimasi,
        order_id: "TEST-"+this.state.date+"-"+this.state.users.uid
      }
      console.log("hasil",snapTransactionsResult);
      this.props.navigation.navigate('Midtrans', params);
    }
  }

  getUserData = () => {
    getData("user").then((res) => {
      const data = res;

      if (data) {
        this.setState({
          users: data,
          alamat: data.alamat,
        });

        this.props.dispatch(getKotaDetail(data.kota));
      } else {
        this.props.navigation.replace("Login");
      }
    });
  };

  ubahekspedisivalue = (ekspedisiSelected) => {
    if (ekspedisiSelected) {
      this.setState({
        ekspedisiSelected: ekspedisiSelected,
      });
      this.props.dispatch(postOngkir(this.state, ekspedisiSelected));
    }
  };

  Bayar = () => {
    const { totalHarga, ongkir, users, date } = this.state;

    const data = {
      transaction_details: {
        order_id: "TEST-" + date + "-" + users.uid,
        gross_amount: parseInt(totalHarga + ongkir),
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: users.nama,
        email: users.email,
        phone: users.nohp,
       
      },
      
    };
    if (!ongkir == 0) {
      this.props.dispatch(snapTransactions(data));
    } else {
      Alert.alert("Warning", "Silahkan Ongkir Dipilih Terlebih Dahulu");
    }
  };

  render() {
    const {
      totalHarga,
      users,
      ekspedisi,
      totalBerat,
      alamat,
      kota,
      provinsi,
      ekspedisiSelected,
      estimasi,
      ongkir,
    } = this.state;
    const { navigation , snapTransactionsLoading} = this.props;

    return (
      <View style={styles.pages}>
        <View style={styles.isi}>
          <Text style={styles.textBold}>Alamat Pengiriman</Text>
          <CardAlamat
            users={users}
            alamat={alamat}
            kota={kota}
            provinsi={provinsi}
            navigation={navigation}
          />
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Sub Total :</Text>
            <Text style={styles.textBold}>
              Rp. {numberWithCommas(totalHarga)}
            </Text>
          </View>

          {/* Pilihan Ekspedisi */}
          <Pilih
            label={"Pilih Ekspedisi"}
            datas={ekspedisi}
            fontSize={15}
            selectedValue={ekspedisiSelected}
            onValueChange={(ekspedisiSelected) =>
              this.ubahekspedisivalue(ekspedisiSelected)
            }
          />
          <Gap height={10} />
          <Text style={styles.textBold}>Biaya Ongkir :</Text>

          <View style={styles.ongkir}>
            <Text style={styles.text}>Untuk Berat : {totalBerat} kg</Text>
            <Text style={styles.textBold}>Rp. {numberWithCommas(ongkir)}</Text>
          </View>
          <View style={styles.ongkir}>
            <Text style={styles.text}>Estimasi Waktu</Text>
            <Text style={styles.textBold}>{estimasi} days</Text>
          </View>
        </View>
        <View style={styles.footer}>
          {/* Total Harga  */}
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga :</Text>
            <Text style={styles.textBold}>
              Rp. {numberWithCommas(totalHarga + ongkir)}
            </Text>
          </View>

          {/* Tombol  */}
          <Tombol
            tittle="Bayar"
            type="text"
            fontSize={18}
            padding={responsiveHeight(15)}
            onPress={() => this.Bayar()}
            loading={snapTransactionsLoading}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getKotaDetailLoading: state.RajaOngkirReducer.getKotaDetailLoading,
  getKotaDetailResult: state.RajaOngkirReducer.getKotaDetailResult,
  getKotaDetailError: state.RajaOngkirReducer.getKotaDetailError,

  ongkirLoading: state.RajaOngkirReducer.ongkirLoading,
  ongkirResult: state.RajaOngkirReducer.ongkirResult,
  ongkirError: state.RajaOngkirReducer.ongkirError,

  snapTransactionsResult: state.PaymentReducer.snapTransactionsResult,
  snapTransactionsLoading: state.PaymentReducer.snapTransactionsLoading,
});

export default connect(mapStateToProps, null)(Checkout);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    paddingTop: 30,
    justifyContent: "space-between",
  },
  isi: {
    paddingHorizontal: 30,
  },
  textBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    fontWeight: "normal",
  },
  totalHarga: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  ongkir: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});
