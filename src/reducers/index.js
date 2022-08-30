import { combineReducers } from "redux";
import UserReducer from "./user";
import RajaOngkirReducer from "./rajaongkir";
import AuthReducer from "./Auth";
import ProfileReducer from "./Profile";
import KategoriReducer from "./kategori";
import ProdukReducer from "./Produk";
import CartReducer from "./Cart";
import PaymentReducer from "./Payment";
import PesananReducer from "./Pesanan";
import HistoryReducer from "./History";

const rootReducer = combineReducers({
  UserReducer,
  RajaOngkirReducer,
  AuthReducer,
  ProfileReducer,
  KategoriReducer,
  ProdukReducer,
  CartReducer,
  PaymentReducer,
  PesananReducer,
  HistoryReducer,
});

export default rootReducer;
