import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { Gap, HeaderRegister, Pilih, TextInputan, Tombol } from "../../components";
import { colors } from "../../utils";
import WebView from "react-native-webview";

export default class CekResiPemesanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Ekspedisi: [],
    };
  }
  render() {
    const { navigation } = this.props;
    const { Ekspedisi } = this.state;
    return (
      <View style={styles.container}>
        <HeaderRegister
          onPress={() => navigation.goBack()}
          tittle={"Cek Resi"}
          subtittle={"Silahkan Cek Resi Pesanan Kamu"}
        />
        {/* <Gap height={20}/> */}
        {/* <View style={styles.card}>
          <TextInputan label="Masukan Resi" />
          <Pilih label="Pilih Ekspedisi" datas={Ekspedisi} />
          <Gap height={20}/>
          <Tombol
                  tittle="Cek Resi"
                  type="text"
                  padding={10}
                  fontSize={18}
                  onPress={() => this.props.navigation.navigate("MainApp")}
                />
        </View> */}
      <WebView source={{ uri: 'https://www.tiki.id/id/tracking' }} onMessage={this.onMessage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  card: {
    marginHorizontal: 30,
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
