import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import React, { Component } from "react";
import { colors, getData } from "../../utils";
import { ProfileContent } from "../../components";
import { noWithCommas } from "../../utils";
import { DataProfile } from "../../DataDummy";
import { DataUser } from "../../DataDummy/DataUser";
// import { connect } from "react-redux";
import {profilDummy} from "../../assets"

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar:profilDummy,
      profils: DataProfile,
      users: false,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      // do something

      this.getUserData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  
  getUserData = () => {
    getData("user").then((res) => {
      const data = res;

      if (!data) {
        this.props.navigation.replace("Login");
      } else {
        this.setState({
          users: data,
        });
      }
    });
  };
  // componentDidMount(){
  //   this.props.getUser()
  // }

  render() {
    const { profils, users,avatar } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.photo}>
            <View style={styles.borderPhoto}>
              <Image
                source={avatar}
                style={styles.photoContainer}
              />
            </View>
          </View>
          <Text style={styles.nama}>{users.nama}</Text>
          <Text style={styles.no}>{users.nohp}</Text>

          <View style={styles.tab}>
            <ProfileContent profils={profils} navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

// const emok =(state)=>({
//   dataUser:state.UserReducer.dataUser
// })

export default User;
// connect(emok,{getUser}) (User)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  tab: {
    flex: 1,
    backgroundColor: colors.primary,
    marginTop: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  photo: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 16,
  },
  nama: {
    textAlign: "center",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 6,
  },
  no: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "normal",
    marginBottom: 6,
  },
  borderPhoto: {
    borderWidth: 1,
    borderBottomColor: "#8D92A3",
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    padding: 24,
  },
  addPhoto: {
    fontSize: 14,
    color: "#8D92A3",
    textAlign: "center",
  },
});
