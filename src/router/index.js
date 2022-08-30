import React from "react";
import {
  SplashScreen,
  Home,
  Pesanan,
  User,
  ProdukDetail,
  KeranjangPesanan,
  Checkout,
  EditProfile,
  HistoryPemesanan,
  CekResiPemesanan,
  Login,
  Register,
  Register2,
  Midtrans
} from "../pages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigation } from "../components/besar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabNavigation {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, title: "Home" }}
      />
      <Tab.Screen
        name="Pesanan"
        component={Pesanan}
        options={{ headerShown: false, title: "Pesanan" }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{ headerShown: false, title: "User" }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProdukDetail"
        component={ProdukDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="KeranjangPesanan" component={KeranjangPesanan} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="History Pemesanan" component={HistoryPemesanan} />
      <Stack.Screen
        name="Cek Resi"
        component={CekResiPemesanan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register2"
        component={Register2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Midtrans"
        component={Midtrans}
        
      />
    </Stack.Navigator>
  );
};

export default Router;
