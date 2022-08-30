import FIREBASE from "../config/FIREBASE";
import { storeData } from "../utils";
import { dispatchError, dispatchLoading, dispatchSukses } from "../utils";

export const GET_UPDATE_PROFILE = "GET_UPDATE_PROFILE";

export const getUpdateProfile = (data) => {
  return (dispatch) => {
    //loading
    dispatchLoading(dispatch, GET_UPDATE_PROFILE);
    const dataBaru = {
      uid: data.uid,
      nama: data.nama,
      email: data.email,
      nohp: data.nohp,
      alamat: data.alamat,
      password: data.password,
      kota: data.kota,
      provinsi: data.provinsi,
      status: "user",
      // avatar: data.updateAvatar ? data.avatarForDB : data.avatarLama,
    };
    FIREBASE.database()
      .ref("Users/" + dataBaru.uid)
      .update(dataBaru)
      .then((response) => {
        //SUKSES
        dispatchSukses(dispatch, GET_UPDATE_PROFILE, response ? response : []);
        //Local Storage (Async Storage)
        storeData("user", dataBaru);
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, GET_UPDATE_PROFILE, error.message);

        alert(error.message);
      });
  };
};
