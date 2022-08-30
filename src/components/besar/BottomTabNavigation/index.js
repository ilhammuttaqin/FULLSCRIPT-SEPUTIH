import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import react from "react";
import TabItems from "../TabItems";
import { colors } from "../../../utils";
import { connect } from "react-redux";
import { deleteParams } from "../../../actions/ProdukAction";

const BottomTabNavigation = ({ state, descriptors, navigation,dispatch }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }

          if (route.name !=="Pesanan"){
            dispatch(deleteParams())
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabItems
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            options={options}
            isFocused={isFocused}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default connect() (BottomTabNavigation);

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 50,
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
