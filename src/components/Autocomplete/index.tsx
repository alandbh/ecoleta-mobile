import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// import { Container } from './styles';
interface PropsType {
    inputStyle?: {};
    listStyle?: {};
    listItemStyle?: {};
    listItemStyleText?: {};
    data: string[];
    maxLength?: number;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    autoFocus?: boolean;
    onSelect: (value: string) => void;
}
const Autocomplete: React.FC<PropsType> = (props) => {
    const [value, onChangeText] = useState("");
    const [items, setItems] = useState<string[]>([""]);
    const [filteredItems, setFilteredItems] = useState<string[]>([]);
    const [focus, setFocus] = useState<boolean>(false);
    // const [selectedItem, setSelectedItem] = useState<string>("");
    const {
        onSelect,
        maxLength = 255,
        autoCapitalize = "none",
        autoFocus = false,
    } = props;

    useEffect(() => {
        setItems(props.data);
        console.log(props.data.length);
    }, []);

    //e.nativeEvent.text
    function hangleOnChange(text: string) {
        console.log(text);
        const queryItems =
            text === "" || text.length < 1
                ? []
                : items.filter((item) =>
                      item
                          .toLocaleLowerCase()
                          .includes(text.toLocaleLowerCase())
                  );
        onChangeText(text);
        if (text.length === 2) {
            setFilteredItems([]);
        } else {
            setFilteredItems(queryItems);
        }
    }

    function handleOnPress(item: string) {
        // setSelectedItem(item);

        setFilteredItems([]);
        onChangeText(item);
        // onSelect(value);
    }

    useEffect(() => {
        onSelect(value);
    }, [value]);

    return (
        <>
            {/* {props.data.length > 1 && ( */}
            {true && (
                <TextInput
                    style={props.inputStyle}
                    onChangeText={(text) => hangleOnChange(text)}
                    value={value}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onFocus={() => setFocus(true)}
                    autoFocus={autoFocus}
                />
            )}
            {focus && (
                <View style={{ ...props.listStyle }}>
                    {/* <ScrollView style={{}}> */}
                    {filteredItems.map((item, index) => (
                        <TouchableOpacity
                            key={String(index)}
                            style={props.listItemStyle}
                            onPress={() => handleOnPress(item)}
                        >
                            <Text style={props.listItemStyleText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                    {/* </ScrollView> */}
                </View>
            )}
        </>
    );
};

export default Autocomplete;
