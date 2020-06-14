import React, { useState, useEffect } from "react";
import {
    View,
    ImageBackground,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Axios from "axios";

import Autocomplete from "../../components/Autocomplete";

const logo = require("../../assets/logo.png");
const homeBackground = require("../../assets/home-background.png");

const fakeUfs = ["Rondônia", "Acre", "Amazonas", "Roraima"];

interface UfResponse {
    nome: string;
}

const Home: React.FC = () => {
    const navigation = useNavigation();
    const [ufs, setUfs] = useState<string[]>([]);
    const [filteredUfs, setFilteredUfs] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState<string>("");

    useEffect(() => {
        Axios.get<UfResponse[]>(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        ).then((response) => {
            const ufsResponse = response.data.map((uf) => uf.nome);
            setUfs(ufsResponse);
            // console.log(ufsResponse);
        });
    }, []);

    function handleSelectUf(text: string) {
        console.log(text);
        setSelectedUf(text);
    }
    function handleChangeText(queryTxt: string) {
        console.log(queryTxt);
        const queryUf =
            queryTxt === "" ? [] : ufs.filter((uf) => uf.includes(queryTxt));
        setFilteredUfs(queryUf);
    }

    function handleNavigateToPoint() {
        navigation.navigate("Points");
    }

    function handleOnSelect(value: string) {
        console.log("opa: ", value);
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ImageBackground
                source={homeBackground}
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
            >
                <View
                    style={{
                        ...styles.main,
                    }}
                >
                    <Image source={logo} />
                    <Text style={styles.title}>
                        Seu marketplace de coleta de resíduos
                    </Text>
                    <Text style={styles.description}>
                        Ajudamos pessoas a encontrarem pontos de coleta de forma
                        eficiente.
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Autocomplete
                        data={ufs}
                        inputStyle={styles.input}
                        listStyle={styles.autocompleteList}
                        listItemStyle={styles.autocompleteListItem}
                        onSelect={handleOnSelect}
                    />
                    <RectButton
                        style={styles.button}
                        onPress={handleNavigateToPoint}
                    >
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon
                                    name="arrow-right"
                                    color="#fff"
                                    size={24}
                                />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: "#f0f0f5",
    },

    main: {
        flex: 1,
        justifyContent: "center",
        position: "relative",
    },

    title: {
        color: "#322153",
        fontSize: 32,
        fontFamily: "Ubuntu_700Bold",
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: "#6C6C80",
        fontSize: 16,
        marginTop: 16,
        fontFamily: "Roboto_400Regular",
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    titleText: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
    },
    directorText: {
        color: "grey",
        fontSize: 12,
        marginBottom: 10,
        textAlign: "center",
    },
    openingText: {
        textAlign: "center",
    },

    input: {
        height: 60,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },
    autocompleteListItem: {
        height: 50,
        backgroundColor: "#FFF",
        paddingHorizontal: 14,
        fontSize: 16,
        borderBottomColor: "red",
        borderBottomWidth: 1,
    },
    autocompleteList: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 8,
    },

    button: {
        backgroundColor: "#34CB79",
        height: 60,
        flexDirection: "row",
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        color: "#FFF",
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
    },
});

export default Home;
