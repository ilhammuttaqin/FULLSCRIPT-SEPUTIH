import {
  Text,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { Component } from "react";
import { colors, responsiveWidth } from "../../utils";
import {
  Gap,
  HeaderRegister,
  Pilih,
  TextInputan,
  Tombol,
} from "../../components";

import { connect } from "react-redux";
import { getKotaList, getProvinsiList } from "../../actions/RajaOngkirAction";
import { getRegister } from "../../actions/AuthAction";

class Register2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alamat: "",
      kota: false,
      provinsi: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getProvinsiList());
  }

  componentDidUpdate(prevProps) {
    const { getRegisterResults } = this.props;
    if (
      getRegisterResults &&
      prevProps.getRegisterResults !== getRegisterResults
    ) {
      this.props.navigation.navigate("MainApp");
    }
  }

  ubahProvinsi = (provinsi) => {
    this.setState({
      provinsi: provinsi,
    });

    this.props.dispatch(getKotaList(provinsi));
  };

  onContinue = () => {
    const { kota, provinsi, alamat } = this.state;
    if (kota && provinsi && alamat) {
      const data = {
        nama: this.props.route.params.nama,
        email: this.props.route.params.email,
        nohp: this.props.route.params.nohp,
        alamat: alamat,
        provinsi: provinsi,
        kota: kota,
        status: "user",
      };

       //ke Auth Action
      this.props.dispatch(getRegister(data, this.props.route.params.password));
      // this.props.navigation.navigate('MainApp',this.state)
    } else {
      Alert.alert("Error", "Harap Lengkapi Data Diri Kalian");
    }
  };

  render() {
    const { kota, provinsi, alamat } = this.state;
    const { navigation, getProvinsiResults, getKotaResult,getRegisterLoading } = this.props;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.page}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.pages}>
              <HeaderRegister
                onPress={() => navigation.goBack()}
                tittle={"Alamat"}
                subtittle={"Selamat datang di aplikasi Seputih.itu"}
              />

              <View style={styles.desc}>
                <View style={styles.wrapperCircle}>
                  <View style={styles.circleDisabled}></View>
                  <Gap width={10} />
                  <View style={styles.circlePrimary}></View>
                </View>
              </View>
              <Gap height={20} />
              <View style={styles.card}>
                <TextInputan
                  label="Alamat"
                  textarea
                  onChangeText={(alamat) => this.setState({ alamat })}
                  value={alamat}
                />
                <Pilih
                  label="Provinsi"
                  selectedValue={provinsi}
                  datas={getProvinsiResults ? getProvinsiResults : []}
                  onValueChange={(provinsi) => this.ubahProvinsi(provinsi)}
                />
                <Pilih
                  label="Kota/Kab"
                  datas={getKotaResult ? getKotaResult : []}
                  selectedValue={kota}
                  onValueChange={(kota) => this.setState({ kota: kota })}
                />

                <Gap height={25} />
                <Tombol
                  tittle="Continue"
                  type="text"
                  padding={10}
                  fontSize={18}
                  onPress={() => this.onContinue()}
                  loading={getRegisterLoading}
                />
              </View>

              <Gap height={80} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const setStatetoProvince = (state) => ({
  getProvinsiResults: state.RajaOngkirReducer.getProvinsiResults,
  getKotaResult: state.RajaOngkirReducer.getKotaResult,
  
  getRegisterLoading: state.AuthReducer.getRegisterLoading,
  getRegisterResults: state.AuthReducer.getRegisterResults,
  getRegisterError: state.AuthReducer.getRegisterError,
});

export default connect(setStatetoProvince, null)(Register2);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  desc: {
    marginTop: 15,
    alignItems: "center",
  },
  card: {
    backgroundColor: colors.primary,
    marginHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  wrapperCircle: {
    flexDirection: "row",
    marginTop: 10,
  },
  circlePrimary: {
    backgroundColor: colors.gray,
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: 10,
  },
  circleDisabled: {
    backgroundColor: colors.shadow,
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    color: colors.secondary,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 5,
  },
});
