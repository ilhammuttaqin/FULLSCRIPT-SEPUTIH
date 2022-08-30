import { Text, StyleSheet, View, ScrollView, Alert } from "react-native";
import React, { Component } from "react";
import { DataUser } from "../../DataDummy";
import { colors, getData } from "../../utils";
import { Pilih, TextInputan, Tombol } from "../../components";
import { connect } from "react-redux";
import { getKotaList, getProvinsiList } from "../../actions/RajaOngkirAction";
import { getUpdateProfile } from "../../actions/ProfileAction";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      nama: "",
      email: "",
      nohp: "",
      alamat: "",
      password: "",
      provinsi: false,
      kota: false,
      // avatar: false,
      // profils: DataUser,
    };
  }

  componentDidMount() {
    this.getUserData();
    this.props.dispatch(getProvinsiList());
  }

  componentDidUpdate(prevProps) {
    const { getUpdateProfileResults } = this.props;

    if (
      getUpdateProfileResults &&
      prevProps.getUpdateProfileResults !== getUpdateProfileResults
    ) {
      Alert.alert("sukses", "data berhasil diupdate");
      this.props.navigation.replace("MainApp");
    }
  }

  getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      this.setState({
        uid: data.uid,
        nama: data.nama,
        email: data.email,
        nohp: data.nohp,
        alamat: data.alamat,
        kota: data.kota,
        provinsi: data.provinsi,
      });
      this.props.dispatch(getKotaList(data.provinsi));
    });
  };

  ubahProvinsi = (provinsi) => {
    this.setState({
      provinsi: provinsi,
    });

    this.props.dispatch(getKotaList(provinsi));
  };

  onSubmit = () => {
    const { nama, alamat, nohp, provinsi, kota } = this.state;
    if (nama && alamat && nohp && provinsi && kota) {
      this.props.dispatch(getUpdateProfile(this.state));
    }
    else {
      Alert.alert("Warning", "Lengkapi Data Yang Akan Di Update");
    }
  };

  render() {
    const { nama, email, alamat, nohp, provinsi, kota } = this.state;
    const { getProvinsiResults, getKotaResult, getUpdateProfileLoading } =
      this.props;
   
    return (
      <View style={styles.pages}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInputan
            label="Nama"
            value={nama}
            onChangeText={(nama) => this.setState({ nama })}
            fontSize={16}
          />
          <TextInputan
            label="Email"
            value={email}
            onChangeText={(email) => this.setState({ email })}
            fontSize={16}
            disabled
          />
          <TextInputan
            label="No. Handphone"
            value={nohp}
            onChangeText={(nohp) => this.setState({ nohp })}
            fontSize={16}
          />
          <TextInputan
            label="Alamat"
            value={alamat}
            onChangeText={(alamat) => this.setState({ alamat })}
            textarea
            fontSize={16}
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


          <View style={styles.content}>
            <Tombol
              type={"text"}
              tittle={"Update Profile"}
              padding={12}
              loading={getUpdateProfileLoading}
              onPress={() => this.onSubmit()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getProvinsiResults: state.RajaOngkirReducer.getProvinsiResults,
  getKotaResult: state.RajaOngkirReducer.getKotaResult,

  getUpdateProfileLoading: state.ProfileReducer.getUpdateProfileLoading,
  getUpdateProfileResults: state.ProfileReducer.getUpdateProfileResults,
  getUpdateProfileError: state.ProfileReducer.getUpdateProfileError,
});

export default connect(mapStateToProps, null)(EditProfile);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  content: {
    marginVertical: 8,
    marginTop: 15,
  },
});
