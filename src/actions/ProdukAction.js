import FIREBASE from "../config/FIREBASE";
import { storeData } from "../utils";
import { dispatchError, dispatchLoading, dispatchSukses } from "../utils";

export const GET_PRODUK = "GET_PRODUK";
export const GET_PRODUK_KATEGORI = "GET_PRODUK_KATEGORI";
export const SAVE_KEYWOARD = "SAVE_KEYWOARD";
export const DELETE_PARAMS = "DELETE_PARAMS";

export const getProdukList = (idProdutcs, keyword) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_PRODUK);
    if (idProdutcs) {
      FIREBASE.database()
        .ref("products")
        .orderByChild("kategori")
        .equalTo(idProdutcs)
        .once("value", (querySnapshot) => {
          let data = querySnapshot.val();
          dispatchSukses(dispatch, GET_PRODUK, data);
        })
        //   .then((querySnapshot) => {
        //   });
        .catch((error) => {
          dispatchError(dispatch, GET_PRODUK, error.message);
          alert(error.message);
        });
    } else if (keyword) {
      FIREBASE.database()
        .ref("products")
        .orderByChild("keyword")
        .equalTo(keyword)
        .once("value", (querySnapshot) => {
          let data = querySnapshot.val();
          dispatchSukses(dispatch, GET_PRODUK, data);
        })
        .catch((error) => {
          dispatchError(dispatch, GET_PRODUK, error.message);
          alert(error.message);
        });
    } else {
      FIREBASE.database()
        .ref("products")
        .once("value", (querySnapshot) => {
          let data = querySnapshot.val();
          dispatchSukses(dispatch, GET_PRODUK, data);
        })
        //   .then((querySnapshot) => {
        //   });
        .catch((error) => {
          dispatchError(dispatch, GET_PRODUK, error.message);
          alert(error.message);
        });
    }
  };
};

export const getProdukLimitList = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_PRODUK);

    FIREBASE.database()
      .ref("products")
      .limitToFirst(5)
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val();
        dispatchSukses(dispatch, GET_PRODUK, data);
      })
      //   .then((querySnapshot) => {
      //   });
      .catch((error) => {
        dispatchError(dispatch, GET_PRODUK, error.message);
        alert(error.message);
      });
  };
};
export const getKategoriProduk = (id, namaKategori) => ({
  type: GET_PRODUK_KATEGORI,
  payload: {
    idProdutcs: id,
    namaKategori: namaKategori,
  },
});

export const deleteParams = () => ({
  type: DELETE_PARAMS,
});

export const saveKeyword = (search) => ({
  type: SAVE_KEYWOARD,
  payload: {
    data: search,
  },
});
