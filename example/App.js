import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CurrencyPicker from "react-native-paper-currency-picker";

export default function App() {
  // const currencyPickerRef = React.useRef(undefined);
  return (
    <View style={styles.container}>
      <CurrencyPicker
        // currencyPickerRef={(ref) => {
        //   currencyPickerRef = ref;
        // }}
        label={'Devise'}
        language={'fr'}
        enable={true}
        darkMode={false}
        currencyCode={"EUR"}
        showFlag={true}
        showCurrencyName={true}
        showCurrencyCode={true}
        onSelectCurrency={(data) => {
          console.log("DATA", data);
        }}
        onOpen={() => {
          console.log("Open");
        }}
        onClose={() => {
          console.log("Close");
        }}
        showNativeSymbol={true}
        showSymbol={false}
        containerStyle={{
          container: {},
          flagWidth: 25,
          currencyCodeStyle: {},
          currencyNameStyle: {},
          symbolStyle: {},
          symbolNativeStyle: {},
        }}
        modalStyle={{
          container: {},
          searchStyle: {},
          tileStyle: {},
          itemStyle: {
            itemContainer: {},
            flagWidth: 25,
            currencyCodeStyle: {},
            currencyNameStyle: {},
            symbolStyle: {},
            symbolNativeStyle: {},
          },
        }}
        title={"Currency"}
        searchPlaceholder={"Search"}
        showCloseButton={true}
        showModalTitle={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '100%',
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
