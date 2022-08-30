import {
  GET_PRODUK,
  GET_PRODUK_KATEGORI,
  SAVE_KEYWOARD,
  DELETE_PARAMS,
} from "../../actions/ProdukAction";

const initialState = {
  getProdukLoading: false,
  getProdukResults: false,
  getProdukError: false,

  idProdutcs: false,
  namaKategori: false,
  keyword: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUK:
      return {
        ...state,
        getProdukLoading: action.payload.loading,
        getProdukResults: action.payload.data,
        getProdukError: action.payload.errorMassage,
      };
    case GET_PRODUK_KATEGORI:
      return {
        ...state,
        idProdutcs: action.payload.idProdutcs,
        namaKategori: action.payload.namaKategori,
      };

    case DELETE_PARAMS:
      return {
        ...state,
        idProdutcs: false,
        namaKategori: false,
        keyword: false,
      };

    case SAVE_KEYWOARD:
      return {
        ...state,
        keyword: action.payload.data,
      };

    default:
      return state;
  }
}
