import {
  Text,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import React, { Component } from "react";
import { colors, responsiveWidth } from "../../utils";
import { Gap, HeaderRegister, TextInputan, Tombol } from "../../components";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: "",
      email: "",
      nohp: "",
      password: "",
    };
  }
  onContinue = ()=>{
    const { nama, email, nohp, password } = this.state;
    if (nama&&email&&nohp&&password){
      this.props.navigation.navigate('Register2',this.state)
    }else{
      Alert.alert("Error","Harap Lengkapi Data Diri Kalian")
    }
  }
  render() {
    const { nama, email, nohp, password } = this.state;
    const { navigation } = this.props;
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
                tittle={"Register"}
                subtittle={"Selamat datang di aplikasi Seputih.itu"}
              />
              <View style={styles.desc}>
                <View style={styles.wrapperCircle}>
                  <View style={styles.circlePrimary}></View>
                  <Gap width={10} />
                  <View style={styles.circleDisabled}></View>
                </View>
              </View>
              {/* <View style={styles.photo}>
                <View style={styles.borderPhoto}>
                  <Image source={users.avatar} style={styles.photoContainer} />
                  <View style={styles.photoContainer}>
                    <Text style={styles.addPhoto}>Tambah Photo</Text>
                  </View>
                </View>
              </View> */}
              <View style={styles.card}>
                <TextInputan
                  label="Nama"
                  value={nama}
                  onChangeText={(nama)=>this.setState({nama})}
                />
                <TextInputan
                  label="Email"
                  value={email}
                  onChangeText={(email)=>this.setState({email})}
                />
                <TextInputan
                  label="No. Handphone"
                  keyboardType="number-pad"
                  value={nohp}
                  onChangeText={(nohp)=>this.setState({nohp})}
                />
                <TextInputan
                  label="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={(password)=>this.setState({password})}
                />
                <Gap height={25} />
                <Tombol
                  tittle="Continue"
                  type="text"
                  padding={10}
                  fontSize={18}
                  onPress={() => this.onContinue()}
                />
              </View>
              <Gap height={20} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  desc: {
    marginTop: 15,
    alignItems: "center",
  },
  photo: {
    alignItems: "center",
    marginTop: 18,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderBottomColor: "#8D92A3",
    width: 130,
    height: 130,
    borderRadius: 130,
    borderStyle: "dashed",
    borderColor: "rgba(161,155,183,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 90,
    padding: 24,
    backgroundColor: colors.shadow,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  addPhoto: {
    fontSize: 14,
    color: "#8D92A3",
    textAlign: "center",
  },
  card: {
    backgroundColor: colors.primary,
    marginHorizontal: 30,
    marginVertical:24,
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
