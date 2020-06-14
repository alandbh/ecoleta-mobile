import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

// import { Container } from './styles';
interface PropsType {
    inputStyle?: {};
    listStyle?: {};
    listItemStyle?: {};
    listItemStyleText?: {};
    data: string[];
    onSelect: (value: string) => void;
}
const Autocomplete: React.FC<PropsType> = (props) => {
    const [value, onChangeText] = useState("");
    const [items, setItems] = useState<string[]>([""]);
    const [filteredItems, setFilteredItems] = useState<string[]>([]);
    // const [selectedItem, setSelectedItem] = useState<string>("");
    const { onSelect } = props;

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
                : items.filter((item) => item.includes(text));
        setFilteredItems(queryItems);
        onChangeText(text);
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
            {props.data.length > 1 && (
                <TextInput
                    style={props.inputStyle}
                    onChangeText={(text) => hangleOnChange(text)}
                    value={value}
                    autoCapitalize="characters"
                    maxLength={2}
                />
            )}
            <View style={props.listStyle}>
                {filteredItems.map((item, index) => (
                    <TouchableOpacity
                        key={String(index)}
                        style={props.listItemStyle}
                        onPress={() => handleOnPress(item)}
                    >
                        <Text style={props.listItemStyleText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    );
};

export default Autocomplete;
