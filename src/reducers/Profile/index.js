import { GET_UPDATE_PROFILE } from "../../actions/ProfileAction";

const initialState = {
  getUpdateProfileLoading: false,
  getUpdateProfileResults: false,
  getUpdateProfileError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_UPDATE_PROFILE:
      return {
        ...state,
        getUpdateProfileLoading: action.payload.loading,
        getUpdateProfileResults: action.payload.data,
        getUpdateProfileError: action.payload.errorMassage,
      };

    default:
      return state;
  }
}
