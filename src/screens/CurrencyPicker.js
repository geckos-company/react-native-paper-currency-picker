import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  useColorScheme,
} from "react-native";
import { TextInput, Text } from "react-native-paper";
import { Styles } from "../styles";
import currencies from "../constants/currency.json";
import { DialogCurrency } from "../components";
import { CurrencyFlag } from "../components/CurrencyFlag";

export const CurrencyPicker = (props) => {
  const {
    onSelectCurrency,
    currencyCode,
    showFlag = true,
    showCurrencyName = true,
    showSymbol = false,
    showNativeSymbol = true,
    darkMode,
    renderChildren,
    showCurrencyCode = false,

    currencyPickerRef,
    enable = true,
    onOpen,
    onClose,

    containerStyle = {},
    modalStyle = {},

    language = "en",

    mode = "outlined",
    label,
    title,
    searchPlaceholder,
    textEmpty,
    showCloseButton = true,
    showModalTitle = true,
  } = props;

  console.log("darkMode", darkMode);

  const [currencyName, setCurrencyName] = useState(
    currencies["USD"]["name"][language]
  );
  const [code, setCode] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [symbolNative, setSymbolNative] = useState("$");
  const [visible, setVisible] = useState(false);

  const isDarkMode = useColorScheme() === "dark";

  const {
    container,
    flagWidth = 25,
    currencyCodeStyle,
    currencyNameStyle,
    symbolStyle,
    symbolNativeStyle,
  } = containerStyle;

  useEffect(() => {
    let currency = undefined;
    currencyPickerRef && currencyPickerRef(currencyRef);

    if (currencyCode) {
      currency = Object.values(currencies).filter(
        (item) => item.code === currencyCode
      )[0];
    }

    if (currency) {
      const { code, symbol, symbol_native, name } = currency;
      setCurrencyName(name[language]);
      setCode(code);
      setSymbol(symbol);
      setSymbolNative(symbol_native);
    }
  }, [props]);

  const currencyRef = {
    open: () => {
      setVisible(true);
      onOpen && onOpen();
    },
    close: () => {
      setVisible(false);
      onClose && onClose();
    },
  };

  const onSelect = (data) => {
    const { code, symbol, symbol_native, name } = data;
    onSelectCurrency && onSelectCurrency(data);
    setCurrencyName(name[language]);
    setCode(code);
    setSymbol(symbol);
    setSymbolNative(symbol_native);
  };

  return (
    <View style={[{ width: "100%" }, container]}>
      {enable ? (
        renderChildren ? (
          renderChildren
        ) : (
          <TextInput
            value={code}
            label={label}
            mode={mode}
            showSoftInputOnFocus={false}
            editable={false}
            right={
              <TextInput.Icon
                icon={visible ? "chevron-up" : "chevron-down"}
                onPress={() => setVisible(!visible)}
              />
            }
            render={(props) => {
              console.log(props.style[3]);
              return (
                <TouchableOpacity
                  onPress={() => setVisible(!visible)}
                  style={[
                    ...props.style,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    },
                  ]}
                >
                  {showFlag && (
                    <CurrencyFlag currency={code} width={flagWidth} />
                  )}
                  {showCurrencyCode && (
                    <Text
                      style={[
                        props.style[3],
                        styles.txtCurrencyCode,
                        currencyCodeStyle,
                      ]}
                    >
                      {code}
                    </Text>
                  )}
                  {showCurrencyName && (
                    <Text
                      style={[
                        props.style[3],
                        styles.txtCountryName,
                        currencyNameStyle,
                        { maxWidth: "70%", flexWrap: "wrap" },
                      ]}
                      numberOfLines={1}
                    >
                      {currencyName}
                    </Text>
                  )}
                  {showSymbol && (
                    <Text
                      style={[
                        props.style[3],
                        styles.txtCountryName,
                        symbolStyle,
                      ]}
                    >
                      {symbol}
                    </Text>
                  )}
                  {showNativeSymbol && (
                    <Text
                      style={[
                        props.style[3],
                        styles.txtCountryName,
                        symbolNativeStyle,
                      ]}
                    >
                      {symbolNative}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        )
      ) : null}
      <Modal visible={visible}>
        <DialogCurrency
          language={language}
          onSelectItem={(data) => {
            onSelect(data);
          }}
          setVisible={(value) => {
            setVisible(value);
            onClose && onClose();
          }}
          title={title}
          searchPlaceholder={searchPlaceholder}
          textEmpty={textEmpty}
          darkMode={darkMode || isDarkMode}
          modalStyle={modalStyle}
          showCloseButton={showCloseButton}
          showModalTitle={showModalTitle}
          showCurrencySymbol={showSymbol}
          showCurrencyNativeSymbol={showNativeSymbol}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  txtCountryName: {
    ...Styles.fontDefault,
    marginLeft: 16,
    minWidth: undefined,
    paddingHorizontal: 0,
  },
  txtCurrencyCode: {
    ...Styles.fontDefault,
    marginLeft: 16,
    fontWeight: "600",
    minWidth: undefined,
    paddingHorizontal: 0,
  },
});
