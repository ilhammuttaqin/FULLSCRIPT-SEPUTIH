import axios from "axios";
import { dispatchSukses, dispatchError, dispatchLoading } from "../utils";
import {
  API_HEADER_RAJAONGKIR,
  API_RAJAONGKIR,
  API_TIMEOUT,
  API_HEADER_RAJAONGKIR_COST,
  ORIGIN_CITY,
} from "../utils/constant";

export const GET_PROVINSI = "GET_PROVINSI";
export const GET_KOTA = "GET_KOTA";
export const GET_KOTA_DETAIL = "GET_KOTA_DETAIL";
export const POST_ONGKIR = "POST_ONGKIR";

export const getProvinsiList = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_PROVINSI);

    axios({
      method: "GET",
      url: API_RAJAONGKIR + "province",
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then((response) => {
        if (response.status !== 200) {
          dispatchError(dispatch, GET_PROVINSI, response);
        } else {
          dispatchSukses(
            dispatch,
            GET_PROVINSI,
            response.data ? response.data.rajaongkir.results : []
          );
        }
      })
      .catch((error) => {
        dispatchError(dispatch, GET_PROVINSI, error);
        alert(error);
      });
  };
};

export const getKotaList = (provinsi_id) => {
  return (dispatch) => {
    // LOADING
    dispatchLoading(dispatch, GET_KOTA);

    axios({
      method: "GET",
      url: API_RAJAONGKIR + "city?province=" + provinsi_id,
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then((response) => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, GET_KOTA, response);
        } else {
          //SUKSES
          dispatchSukses(
            dispatch,
            GET_KOTA,
            response.data ? response.data.rajaongkir.results : []
          );
        }
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, GET_KOTA, error);
        alert(error);
      });
  };
};

export const getKotaDetail = (kota_id) => {
  return (dispatch) => {
    // LOADING
    dispatchLoading(dispatch, GET_KOTA_DETAIL);

    axios({
      method: "get",
      url: API_RAJAONGKIR + "city?id=" + kota_id,
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then((response) => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, GET_KOTA_DETAIL, response);
        } else {
          //SUKSES
          dispatchSukses(
            dispatch,
            GET_KOTA_DETAIL,
            response.data ? response.data.rajaongkir.results : []
          );
        }
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, GET_KOTA_DETAIL, error);

        alert(error);
      });
  };
};

export const postOngkir = (data, ekspedisi) => {
  return (dispatch) => {
    dispatchLoading(dispatch, POST_ONGKIR);

    console.log("destination", data.users.kota);
    console.log("origin", ORIGIN_CITY);
    console.log("weight", data.totalBerat < 1 ? 1000 : data.totalBerat * 1000);
    console.log("ekspedisi ", ekspedisi.kurir);

    const formData = new URLSearchParams();
    formData.append("origin", ORIGIN_CITY);

    // --> destination data.profile.kota
    formData.append("destination", data.users.kota);

    // --> berat => data.totalBerat
    formData.append(
      "weight",
      data.totalBerat < 1 ? 1000 : data.totalBerat * 1000
    );

    // --> courier => ekspedisi.kurir
    formData.append("courier", ekspedisi.kurir);

    axios({
      method: "POST",
      url: API_RAJAONGKIR + "cost",
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR_COST,
      data: formData,
    })
      .then((response) => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, POST_ONGKIR, response);
        } else {
          const ongkirs = response.data.rajaongkir.results[0].costs;

          const ongkirYangDipilih = ongkirs
            .filter((ongkir) => ongkir.service === ekspedisi.service)
            .map((filterOngkir) => {
              return filterOngkir;
            });

          //SUKSES
          dispatchSukses(dispatch, POST_ONGKIR, ongkirYangDipilih[0]);
          console.log("respon",ongkirYangDipilih[0]);
        }
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, POST_ONGKIR, error);

        alert(error);
      });
  };
};
