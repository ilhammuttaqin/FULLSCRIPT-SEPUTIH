import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { colors } from "../../../utils";

const TextInputan = ({
  textarea,
  width,
  height,
  fontSize,
  fontWeight,
  placeholder,
  label,
  value,
  secureTextEntry,
  keyboardType,
  onChangeText,
  disabled
}) => {
  if (textarea) {
    return (
      <View style={styles.container}>
        <Text style={styles.label(fontSize)}>{label} :</Text>
        <TextInput
          style={styles.inputTextArea(fontSize)}
          multiline={true}
          numberOfLines={3}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          onChangeText ={onChangeText}
          editable={disabled ?false:true}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label(fontSize,fontWeight)}>{label} :</Text>
      <TextInput
        style={styles.input(width, height, fontSize)}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText ={onChangeText}
        editable={disabled ?false:true}
      />
    </View>
  );
};

export default TextInputan;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: (fontSize,fontWeight) => ({
    fontSize: fontSize ? fontSize : 18,
    marginBottom:5,
    fontWeight: fontWeight ? fontWeight : "normal",
  }),
  input: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontWeight: "normal",
    width: width,
    height: height,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 10,
  }),
  inputTextArea: (fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontWeight: "normal",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  }),
});
