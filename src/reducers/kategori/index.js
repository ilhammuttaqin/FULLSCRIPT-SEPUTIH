import { GET_KATEGORI } from "../../actions/KategoriAction";

const initialState = {
  getKategoriLoading: false,
  getKategoriResults: false,
  getKategoriError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_KATEGORI:
      return {
        ...state,
        getKategoriLoading: action.payload.loading,
        getKategoriResults: action.payload.data,
        getKategoriError: action.payload.errorMassage,
      };
    default:
      return state;
  }
}
