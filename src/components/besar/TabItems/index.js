import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Homes, HomeShadow, ShoppingBag, ShoppingBagShadow, User, UserShadow } from "../../../assets";




const TabItems = ({ index, isFocused, options, onPress, onLongPress, label }) => {
  const Iconku = () =>{
    if (label=== 'Home'){
      return isFocused ? <Homes/> : <HomeShadow/>
    }
    if (label=== 'Pesanan'){
      return isFocused ? <ShoppingBag/> : <ShoppingBagShadow/>
    }
    if (label=== 'User'){
      return isFocused ? <User/> : <UserShadow/>
    }v
    return (
      <ShoppingBag/>
    )
  }
  return (
    <TouchableOpacity
      key={index}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Iconku />
      
    </TouchableOpacity>
  );
};

export default TabItems;

const styles = StyleSheet.create({
  
});
