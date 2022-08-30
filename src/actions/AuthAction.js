import FIREBASE from "../config/FIREBASE";
import { storeData } from "../utils";
import { dispatchError, dispatchLoading, dispatchSukses } from "../utils";

export const GET_REGISTER = "GET_REGISTER";
export const GET_LOGIN = "GET_LOGIN";

export const getRegister = (data, password) => {
  return (dispatch) => {
    dispatch({
      type: GET_REGISTER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    FIREBASE.auth()
      .createUserWithEmailAndPassword(data.email, password)
      .then((success) => {
        // Signed in
        const databaru = {
          ...data,
          uid: success.user.uid,
        };
        FIREBASE.database()
          .ref("Users/" + success.user.uid)
          .set(databaru);

        dispatch({
          type: GET_REGISTER,
          payload: {
            loading: false,
            data: databaru,
            errorMessage: false,
          },
        });
        storeData("user", databaru);
      })
      .catch((error) => {
        // ..
        dispatch({
          type: GET_REGISTER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        alert(error.message);
      });
  };
};

export const getLogin = (email, password) => {
  return (dispatch) => {
    // LOADING
    dispatchLoading(dispatch,GET_LOGIN);

    FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then((success) => {
        // Signed in
        FIREBASE.database()
          .ref("/Users/" + success.user.uid)
          .once("value")
          .then((resDB) => {
            if (resDB.val()) {
              //SUKSES
              dispatchSukses(dispatch, GET_LOGIN, resDB.val() ? resDB.val() : []);

              //Local Storage (Async Storage)
              storeData("user", resDB.val());
            } else {
              // ERROR
              dispatch({
                type: GET_LOGIN,
                payload: {
                  loading: false,
                  data: false,
                  errorMessage: "Data User tidak ada",
                },
              });

              alert("Data User tidak ada");
            }
          });
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, GET_LOGIN, error.message);

        alert(error.message);
      });
  };
};
