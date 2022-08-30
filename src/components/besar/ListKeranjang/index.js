import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { CardKeranjang } from "../../kecil";
import { colors } from "../../../utils";

const ListKeranjang = ({
  readKeranjangLoading,
  readKeranjangResults,
  readKeranjangError,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {readKeranjangResults ? (
          Object.keys(readKeranjangResults.orderPesanan).map((key) => {
            return (
              <CardKeranjang
                pesan={readKeranjangResults.orderPesanan[key]}
                keranjangUtama={readKeranjangResults}
                key={key}
                id={key}
              />
            );
          })
        ) : readKeranjangLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : readKeranjangError ? (
          <Text>{readKeranjangError}</Text>
        ) : (
          <Text>Data Kosong</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ListKeranjang;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
