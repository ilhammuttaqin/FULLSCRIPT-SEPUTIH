import {
  GET_IN_KERANJANG,
  READ_KERANJANG,
  DELETE_KERANJANG
} from "../../actions/KeranjangAction";

const initialState = {
  getKeranjangLoading: false,
  getKeranjangResults: false,
  getKeranjangError: false,

  readKeranjangLoading: false,
  readKeranjangResults: false,
  readKeranjangError: false,

  deleteKeranjangLoading: false,
  deleteKeranjangResults: false,
  deleteKeranjangError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_IN_KERANJANG:
      return {
        ...state,
        getKeranjangLoading: action.payload.loading,
        getKeranjangResults: action.payload.data,
        getKeranjangError: action.payload.errorMassage,
      };

    case READ_KERANJANG:
      return {
        ...state,
        readKeranjangLoading: action.payload.loading,
        readKeranjangResults: action.payload.data,
        readKeranjangError: action.payload.errorMassage,
      };

      case DELETE_KERANJANG:
        return {
          ...state,
          deleteKeranjangLoading: action.payload.loading,
          deleteKeranjangResults: action.payload.data,
          deleteKeranjangError: action.payload.errorMassage,
        };
    default:
      return state;
  }
}
