import FIREBASE from "../config/FIREBASE";
import { storeData } from "../utils";
import { dispatchError, dispatchLoading, dispatchSukses } from "../utils";

export const GET_KATEGORI = "GET_KATEGORI";

export const getKategoriList = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_KATEGORI);

    FIREBASE.database()
      .ref("categories")
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val();
        dispatchSukses(dispatch,GET_KATEGORI,data)
      })
      //   .then((querySnapshot) => {
      //   });
      .catch((error) => {
        dispatchError(dispatch, GET_KATEGORI, error.message);
        alert(error.message);
      });
  };
};
