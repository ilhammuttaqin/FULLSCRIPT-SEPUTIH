import FIREBASE from "../config/FIREBASE";
import { storeData } from "../utils";
import { dispatchError, dispatchLoading, dispatchSukses } from "../utils";

export const GET_IN_KERANJANG = "GET_IN_KERANJANG";
export const READ_KERANJANG = "READ_KERANJANG";
export const DELETE_KERANJANG = "DELETE_KERANJANG";

export const masukKeranjang = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_IN_KERANJANG);

    FIREBASE.database()
      .ref("carts/" + data.uid)
      .once("value", (querySnapshot) => {
        //
        if (querySnapshot.val()) {
          const keranjangUtama = querySnapshot.val();
          const beratBaru =
            parseInt(data.jumlah) * parseFloat(data.produk.berat);
          const hargaBaru = parseInt(data.jumlah) * parseInt(data.produk.harga);

          FIREBASE.database()
            .ref("carts")
            .child(data.uid)
            .update({
              totalBerat: keranjangUtama.totalBerat + beratBaru,
              totalHarga: keranjangUtama.totalHarga + hargaBaru,
            })
            .then((response) => {
              dispatch(masukKeranjangDetail(data));
            })
            .catch((error) => {
              dispatchError(dispatch, GET_IN_KERANJANG, error.message);
            });
        } else {
          const keranjangUtama = {
            user: data.uid,
            tanggal: new Date().toDateString(),
            totalHarga: parseInt(data.jumlah) * parseInt(data.produk.harga),
            totalBerat: parseInt(data.jumlah) * parseFloat(data.produk.berat),
          };
          FIREBASE.database()
            .ref("carts")
            .child(data.uid)
            .set(keranjangUtama)
            .then((response) => {
              console.log("save keranjang utama", response);
              dispatch(masukKeranjangDetail(data));
            })
            .catch((error) => {
              dispatchError(dispatch, GET_IN_KERANJANG, error.message);
            });
        }
        // dispatchSukses(dispatch, GET_IN_KERANJANG, data);
      })
      //   .then((querySnapshot) => {
      //   });
      .catch((error) => {
        dispatchError(dispatch, GET_IN_KERANJANG, error.message);
        alert(error.message);
      });
  };
};

export const masukKeranjangDetail = (data) => {
  return (dispatch) => {
    const orderPesanan = {
      produk: data.produk,
      jumlahPesanan: data.jumlah,
      //kurangStok:parseInt(data.stok)- parseInt(data.jumlah),
      totalHarga: parseInt(data.jumlah) * parseInt(data.produk.harga),
      totalBerat: parseInt(data.jumlah) * parseFloat(data.produk.berat),
    };
    FIREBASE.database()
      .ref("carts/" + data.uid)
      .child("orderPesanan")
      .push(orderPesanan)
      .then((response) => {
        console.log("save keranjang utama detail", response);
        dispatchSukses(dispatch, GET_IN_KERANJANG, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_IN_KERANJANG, error.message);
        alert(error.message);
      });

    dispatchError(dispatch, GET_IN_KERANJANG, error.message);
  };
};

export const getListKeranjang = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, READ_KERANJANG);

    FIREBASE.database()
      .ref("carts/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSukses(dispatch, READ_KERANJANG, data);
      })
      .catch((error) => {
        dispatchError(dispatch, READ_KERANJANG, error);
        alert(error);
      });
  };
};

export const deleteCart = (id, keranjangUtama, pesan) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_KERANJANG);

    const totalHargaBaru = keranjangUtama.totalHarga - pesan.totalHarga;

    const totalBeratBaru = keranjangUtama.totalBerat - pesan.totalBerat;

    if (totalHargaBaru === 0) {
      // hapus keranjang utama & detail
      FIREBASE.database()
        .ref("carts")
        .child(keranjangUtama.user)
        .remove()
        .then((response) => {
          dispatchSukses(
            dispatch,
            DELETE_KERANJANG,
            "Keranjang Sukses Dihapus"
          );
        })
        .catch((error) => {
          dispatchError(dispatch, DELETE_KERANJANG, error);
          alert(error);
        });
    } else {
      // update total harga & total berat keranjang utama
      FIREBASE.database()
        .ref("carts")
        .child(keranjangUtama.user)
        .update({
          totalBerat: totalBeratBaru,
          totalHarga: totalHargaBaru,
        })
        .then((response) => {
          // hapus pesanan/keranjang detail
          dispatch(deleteKeranjangDetail(id, keranjangUtama));
        })
        .catch((error) => {
          dispatchError(dispatch, DELETE_KERANJANG, error);
          alert(error);
        });
    }
  };
};

export const deleteKeranjangDetail = (id, keranjangUtama) => {
  return (dispatch) => {
    FIREBASE.database()
      .ref("carts/" + keranjangUtama.user)
      .child("orderPesanan")
      .child(id)
      .remove()
      .then((response) => {
        dispatchSukses(dispatch, DELETE_KERANJANG, "Keranjang Sukses Dihapus");
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_KERANJANG, error);
        alert(error);
      });
  };
};
