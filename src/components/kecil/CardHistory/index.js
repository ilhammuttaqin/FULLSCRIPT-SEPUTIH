import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {colors, fonts, numberWithCommas, responsiveWidth} from '../../../utils';
import {updateStatus} from '../../../actions/HistoryAction';
import Gap from '../Gap';

class CardHistory extends Component {
  componentDidMount() {
    const {pesan} = this.props;
    this.props.dispatch(updateStatus(pesan.order_id));
  }

  masukMidtrans = () => {
    const {pesan} = this.props;
    if (pesan.status === 'lunas') {
      Alert.alert('Info', 'Pesanan Sudah Lunas');
    } else {
      this.props.navigation.navigate('Midtrans', {url: pesan.url});
    }
  };

  render() {
    const {pesan, updateStatusLoading} = this.props;
    const history = pesan.orderPesanan;
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.masukMidtrans()}>
        <Text style={styles.tanggal}>{pesan.tanggal}</Text>
        {Object.keys(history).map((key, index) => {
          return (
            <View key={index} style={styles.history}>
              <Text style={styles.textBold}>{index + 1}.</Text>
              <Image
                source={{uri: history[key].produk.gambar}}
                style={styles.jersey}
              />
              <View style={styles.desc}>
                <Text style={styles.nama}>{history[key].produk.nama}</Text>
                <Text style={styles.harga}>
                  Rp. {numberWithCommas(history[key].produk.harga)}
                </Text>

                <Gap height={10} />

                <Text style={styles.textBold}>
                  Pesan : {history[key].jumlahPesanan}
                </Text>
                <Text style={styles.textBold}>
                  Total Harga : Rp. {numberWithCommas(history[key].totalHarga)}
                </Text>
              </View>
            </View>
          );
        })}

        <Gap height={10} />

        <View style={styles.footer}>
          <View style={styles.label}>
            <Text style={styles.textBlue}>Status :</Text>
            <Text style={styles.textBlue}>
              Ongkir ({pesan.estimasi} Hari) :
            </Text>
            <Text style={styles.textBlue}>Total Harga :</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.textBlue}>
              {updateStatusLoading ? 'Loading' : pesan.status}
            </Text>
            <Text style={styles.textBlue}>
              Rp. {numberWithCommas(pesan.ongkir)}
            </Text>
            <Text style={styles.textBlue}>
              Rp. {numberWithCommas(pesan.totalHarga + pesan.ongkir)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => ({
  updateStatusLoading: state.HistoryReducer.updateStatusLoading,
});

export default connect(mapStateToProps, null)(CardHistory);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBackground,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  history: {
    flexDirection: 'row',
    marginTop: 10,
  },
  jersey: {
    width: responsiveWidth(66),
    height: responsiveWidth(66),
  },
  tanggal: {
    fontSize: 14,
    fontWeight:'bold',
  },
  textBold: {
    fontSize: 11,
    fontWeight:'bold',
  },
  desc: {
    marginLeft: responsiveWidth(7),
  },
  nama: {
    fontSize: 13,
    fontWeight:'bold',
    textTransform: 'capitalize',
  },
  harga: {
    fontSize: 12,
    fontWeight:'normal',
  },
  footer: {
    flexDirection: 'row',
  },
  label: {
    flex: 1,
  },
  textBlue: {
    fontSize: 14,
    fontWeight:'bold',
    color: colors.shadow,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
});
